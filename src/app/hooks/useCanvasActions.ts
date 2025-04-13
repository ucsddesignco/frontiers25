import { useEffect, MouseEvent, WheelEvent, TouchEvent, useRef, useCallback } from 'react';
import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_GAP,
  MIN_ZOOM,
  MAX_ZOOM
} from '../components/constants';
import { throttle } from '../util/throttle';
import { useShallow } from 'zustand/shallow';

// Hook for canvas navigation (panning & zooming)
export function useCanvasActions() {
  const {
    containerRef,
    position,
    zoomLevel,
    dragging,
    disableDragging,
    userHasInteracted,
    setPosition,
    setZoomLevel,
    openedCard,
    setDragging,
    setUserHasInteracted,
    gridRef,
    isTransitionEnabled,
    setTransitionEnabled,
    cardIsExpanding
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      containerRef: state.containerRef,
      position: state.position,
      zoomLevel: state.zoomLevel,
      dragging: state.dragging,
      disableDragging: state.disableDragging,
      userHasInteracted: state.userHasInteracted,
      setPosition: state.setPosition,
      setZoomLevel: state.setZoomLevel,
      openedCard: state.openedCard,
      setDragging: state.setDragging,
      setUserHasInteracted: state.setUserHasInteracted,
      gridRef: state.gridRef,
      isTransitionEnabled: state.isTransitionEnabled,
      setTransitionEnabled: state.setTransitionEnabled,
      cardIsExpanding: state.cardIsExpanding
    }))
  );
  const transitionTimerRef = useRef<NodeJS.Timeout>(null);
  const movementAccumulator = useRef({ x: 0, y: 0 });
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistanceRef = useRef<number | null>(null);

  // ---- UTILITY FUNCTIONS ----

  const throttledSetPosition = useCallback(
    (newPosition: { x: number; y: number }) => {
      throttle(() => {
        setPosition(newPosition);
        movementAccumulator.current = { x: 0, y: 0 };
      }, 16)(); // ~60fps throttle
    },
    [setPosition]
  );

  // Helper to calculate the new zoom level and position based on a zoom event
  const calculateZoomUpdate = useCallback(
    (
      currentZoom: number,
      currentPosition: { x: number; y: number },
      zoomDelta: number,
      centerX: number,
      centerY: number
    ): { newZoomLevel: number; newPosition: { x: number; y: number } } | null => {
      const newZoomLevel = Math.max(
        MIN_ZOOM,
        Math.min(MAX_ZOOM, currentZoom + zoomDelta * currentZoom)
      );

      if (currentZoom === newZoomLevel) return null; // No change

      // Calculate the world coordinates under the zoom center point before zooming
      const worldX = (centerX - currentPosition.x) / currentZoom;
      const worldY = (centerY - currentPosition.y) / currentZoom;

      // Calculate the new canvas position to keep the world point under the zoom center point
      const newPosition = {
        x: centerX - worldX * newZoomLevel,
        y: centerY - worldY * newZoomLevel
      };

      return { newZoomLevel, newPosition };
    },
    [] // No dependencies needed for this pure calculation function
  );

  // Function to center the view either on a specific card or the grid center
  // Updated centerToCard function
  const centerToCard = useCallback(
    (cardX?: number, cardY?: number) => {
      const gridElement = gridRef.current;
      if (!gridElement || !containerRef.current || cardIsExpanding) return;

      // Clear any pending transition timer
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      // Reset zoom level to 1
      setZoomLevel(1);

      const viewportWidth = containerRef.current.clientWidth;
      const viewportHeight = containerRef.current.clientHeight;

      let focusPointX: number;
      let focusPointY: number;

      if (cardX !== undefined && cardY !== undefined) {
        focusPointX = cardX + CARD_WIDTH / 2;
        focusPointY = cardY + CARD_HEIGHT / 2;
        setTransitionEnabled(true);
      } else {
        // Center on the middle of the entire grid
        const totalWidth = GRID_COLUMNS * CARD_WIDTH + (GRID_COLUMNS - 1) * CARD_GAP;
        const totalHeight = GRID_ROWS * CARD_HEIGHT + (GRID_ROWS - 1) * CARD_GAP;
        focusPointX = totalWidth / 2;
        focusPointY = totalHeight / 2;
      }

      // Calculate target position using zoom level 1
      const targetX = viewportWidth / 2 - focusPointX * 1;
      const targetY = viewportHeight / 2 - focusPointY * 1;
      setPosition({ x: targetX, y: targetY });

      // Set a timer to disable the transition after it completes
      if (cardX !== undefined && cardY !== undefined) {
        transitionTimerRef.current = setTimeout(() => {
          setTransitionEnabled(false);
          transitionTimerRef.current = null;
        }, 350);
      }
    },
    [gridRef, containerRef, cardIsExpanding, setZoomLevel, setPosition, setTransitionEnabled]
  );

  // ---- PANNING HANDLERS ----
  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      e.preventDefault(); // Prevent text selection and default drag behavior
      if (disableDragging || e.button !== 0 || cardIsExpanding) return; // Only allow left click for drag
      if (!userHasInteracted) setUserHasInteracted(true);
      setDragging(true);
      movementAccumulator.current = { x: 0, y: 0 };
    },
    [disableDragging, cardIsExpanding, userHasInteracted, setUserHasInteracted, setDragging]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      if (dragging && !isTransitionEnabled) {
        movementAccumulator.current.x += e.movementX;
        movementAccumulator.current.y += e.movementY;
        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
      }
    },
    [dragging, isTransitionEnabled, position.x, position.y, throttledSetPosition]
  );

  const handleMouseUpOrLeave = useCallback((): void => {
    if (dragging) {
      setPosition({
        x: position.x + movementAccumulator.current.x,
        y: position.y + movementAccumulator.current.y
      });
      movementAccumulator.current = { x: 0, y: 0 };
      setDragging(false);
    }
  }, [dragging, position, setPosition, setDragging]);

  // ---- TOUCH HANDLERS ----

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (isTransitionEnabled) {
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
          transitionTimerRef.current = null;
        }
        setTransitionEnabled(false);
        return;
      }

      if (disableDragging || isTransitionEnabled) return;
      if (!userHasInteracted) setUserHasInteracted(true);

      if (e.touches.length === 2) {
        // Pinch start
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        lastPinchDistanceRef.current = Math.sqrt(dx * dx + dy * dy);
        lastTouchRef.current = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        setDragging(false); // Ensure dragging stops if pinch starts
      } else if (e.touches.length === 1) {
        // Pan start
        const touch = e.touches[0];
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        setDragging(true);
        movementAccumulator.current = { x: 0, y: 0 };
      }
    },
    [
      isTransitionEnabled,
      disableDragging,
      userHasInteracted,
      setUserHasInteracted,
      setTransitionEnabled,
      setDragging
    ]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (openedCard !== null || isTransitionEnabled) return;

      // Handle pinch-to-zoom
      if (e.touches.length === 2 && lastTouchRef.current && lastPinchDistanceRef.current !== null) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        const pinchRatio = currentDistance / lastPinchDistanceRef.current;
        lastPinchDistanceRef.current = currentDistance; // Update for next move

        const midX = (touch1.clientX + touch2.clientX) / 2;
        const midY = (touch1.clientY + touch2.clientY) / 2;

        // Use a sensitivity factor for pinch zoom
        const zoomDelta = (pinchRatio - 1) * 0.5; // Adjust sensitivity as needed

        const zoomUpdate = calculateZoomUpdate(zoomLevel, position, zoomDelta, midX, midY);

        if (zoomUpdate) {
          setPosition(zoomUpdate.newPosition);
          setZoomLevel(zoomUpdate.newZoomLevel);
          lastTouchRef.current = { x: midX, y: midY }; // Update midpoint ref
        }
        return; // Don't pan while pinching
      }

      // Handle panning with single finger
      if (dragging && lastTouchRef.current && e.touches.length === 1) {
        const touch = e.touches[0];
        const movementX = touch.clientX - lastTouchRef.current.x;
        const movementY = touch.clientY - lastTouchRef.current.y;
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };

        movementAccumulator.current.x += movementX;
        movementAccumulator.current.y += movementY;
        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
      }
    },
    [
      openedCard,
      isTransitionEnabled,
      dragging,
      calculateZoomUpdate,
      zoomLevel,
      position,
      setPosition,
      setZoomLevel,
      throttledSetPosition
    ]
  );

  const handleTouchEnd = useCallback(
    (_e: TouchEvent<HTMLDivElement>): void => {
      if (lastPinchDistanceRef.current !== null) {
        lastPinchDistanceRef.current = null; // Clear pinch zoom tracking
      }

      if (dragging) {
        // Finalize panning
        setPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
        movementAccumulator.current = { x: 0, y: 0 };
        setDragging(false);
      }
      lastTouchRef.current = null; // Reset touch tracking
    },
    [dragging, position, setPosition, setDragging]
  );

  const handleTouchCancel = useCallback(
    (_e: TouchEvent<HTMLDivElement>): void => {
      lastTouchRef.current = null;
      lastPinchDistanceRef.current = null;
      movementAccumulator.current = { x: 0, y: 0 };
      setDragging(false);
    },
    [setDragging]
  );

  // ---- ZOOMING HANDLERS (MOUSE WHEEL) ----

  const handleWheel = useCallback(
    (e: WheelEvent): void => {
      e.preventDefault(); // Prevent default browser scroll/zoom

      if (openedCard !== null || isTransitionEnabled) return;

      if (!userHasInteracted) setUserHasInteracted(true);

      // Handle Ctrl + Wheel for zooming
      if (e.ctrlKey) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const zoomFactor = 0.15; // Zoom sensitivity
        const zoomDelta = e.deltaY < 0 ? zoomFactor : -zoomFactor;

        const zoomUpdate = calculateZoomUpdate(zoomLevel, position, zoomDelta, mouseX, mouseY);

        if (zoomUpdate) {
          setPosition(zoomUpdate.newPosition);
          setZoomLevel(zoomUpdate.newZoomLevel);
        }
      }
      // Handle trackpad scroll/pan (no Ctrl key)
      else if (!disableDragging) {
        const sensitivity = 1.0; // Pan sensitivity
        movementAccumulator.current.x -= e.deltaX * sensitivity;
        movementAccumulator.current.y -= e.deltaY * sensitivity;
        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
      }
    },
    [
      openedCard,
      isTransitionEnabled,
      userHasInteracted,
      setUserHasInteracted,
      disableDragging,
      calculateZoomUpdate,
      zoomLevel,
      position,
      setPosition,
      setZoomLevel,
      throttledSetPosition
    ]
  );

  // ---- EFFECTS & INITIALIZATION ----

  // Attach/detach event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown as unknown as EventListener);
      window.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
      window.addEventListener('mouseup', handleMouseUpOrLeave as unknown as EventListener);
      container.addEventListener('mouseleave', handleMouseUpOrLeave as unknown as EventListener);

      container.addEventListener('wheel', handleWheel as unknown as EventListener, {
        passive: false
      });
      container.addEventListener('touchstart', handleTouchStart as unknown as EventListener, {
        passive: false
      });
      container.addEventListener('touchmove', handleTouchMove as unknown as EventListener, {
        passive: false
      });
      container.addEventListener('touchend', handleTouchEnd as unknown as EventListener, {
        passive: true
      });
      container.addEventListener('touchcancel', handleTouchCancel as unknown as EventListener, {
        passive: true
      });

      return () => {
        container.removeEventListener('mousedown', handleMouseDown as unknown as EventListener);
        window.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        window.removeEventListener('mouseup', handleMouseUpOrLeave as unknown as EventListener);
        container.removeEventListener(
          'mouseleave',
          handleMouseUpOrLeave as unknown as EventListener
        );

        container.removeEventListener('wheel', handleWheel as unknown as EventListener);
        container.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
        container.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
        container.removeEventListener('touchend', handleTouchEnd as unknown as EventListener);
        container.removeEventListener('touchcancel', handleTouchCancel as unknown as EventListener);
      };
    }
  }, [
    containerRef,
    handleMouseDown, // Add mouse handlers to dependencies
    handleMouseMove,
    handleMouseUpOrLeave,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel
  ]);

  // Center the canvas initially
  useEffect(() => {
    centerToCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Recenter the canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      centerToCard();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [centerToCard]);

  return {
    centerToCard
  };
}
