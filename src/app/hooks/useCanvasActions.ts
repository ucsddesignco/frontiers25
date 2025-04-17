import { useEffect, useRef, useCallback } from 'react';
import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  MIN_ZOOM,
  MAX_ZOOM,
  MIDDLE_CARD_INDEX
} from '../components/constants';
import { throttle } from '../util/throttle';
import { useShallow } from 'zustand/shallow';
import { useTouchHandlers } from './useTouchHandlers';
import { useMouseHandlers } from './useMouseHandlers';

// ---- UTILITY FUNCTIONS ----

// Helper to calculate the new zoom level and position based on a zoom event
const calculateZoomUpdate = (
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
};

// Hook for canvas navigation (panning & zooming)
export function useCanvasActions() {
  const {
    containerRef,
    position,
    zoomLevel,
    dragging,
    didDrag,
    setPosition,
    setZoomLevel,
    expandedCard,
    setDragging,
    setDidDrag,
    gridRef,
    isTransitionEnabled,
    setTransitionEnabled,
    cardIsExpanding,
    setSelectedCard,
    selectedCard,
    cardSize
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      containerRef: state.containerRef,
      position: state.position,
      zoomLevel: state.zoomLevel,
      dragging: state.dragging,
      didDrag: state.didDrag,
      setPosition: state.setPosition,
      setZoomLevel: state.setZoomLevel,
      expandedCard: state.expandedCard,
      setDragging: state.setDragging,
      setDidDrag: state.setDidDrag,
      gridRef: state.gridRef,
      isTransitionEnabled: state.isTransitionEnabled,
      setTransitionEnabled: state.setTransitionEnabled,
      cardIsExpanding: state.cardIsExpanding,
      setSelectedCard: state.setSelectedCard,
      selectedCard: state.selectedCard,
      cardSize: state.cardSize
    }))
  );
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const movementAccumulator = useRef({ x: 0, y: 0 });
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null);
  const lastPinchDistanceRef = useRef<number | null>(null);

  const throttledSetPosition = useCallback(
    (newPosition: { x: number; y: number }) => {
      throttle(() => {
        setPosition(newPosition);
        movementAccumulator.current = { x: 0, y: 0 };
      }, 16)(); // ~60fps throttle
    },
    [setPosition]
  );

  // Function to center the view either on a specific card or the grid center
  const centerToCard = useCallback(
    (cardX?: number, cardY?: number) => {
      const gridElement = gridRef.current;
      if (!gridElement || !containerRef.current || cardIsExpanding) return;

      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
        transitionTimerRef.current = null;
      }

      setZoomLevel(1);

      const viewportWidth = containerRef.current.clientWidth;
      const viewportHeight = containerRef.current.clientHeight;

      let focusPointX: number;
      let focusPointY: number;

      if (cardX !== undefined && cardY !== undefined) {
        focusPointX = cardX + cardSize.width / 2;
        focusPointY = cardY + cardSize.height / 2;
        setTransitionEnabled(true);
      } else {
        const totalWidth = GRID_COLUMNS * cardSize.width + (GRID_COLUMNS - 1) * cardSize.gap;
        const totalHeight = GRID_ROWS * cardSize.height + (GRID_ROWS - 1) * cardSize.gap;
        focusPointX = totalWidth / 2;
        focusPointY = totalHeight / 2;
      }

      const targetX = viewportWidth / 2 - focusPointX * 1;
      const targetY = viewportHeight / 2 - focusPointY * 1;
      setPosition({ x: targetX, y: targetY });

      if (cardX !== undefined && cardY !== undefined) {
        transitionTimerRef.current = setTimeout(() => {
          setTransitionEnabled(false);
          transitionTimerRef.current = null;
        }, 350);
      }
    },
    [
      gridRef,
      containerRef,
      cardIsExpanding,
      setZoomLevel,
      setPosition,
      cardSize.width,
      cardSize.height,
      cardSize.gap,
      setTransitionEnabled
    ]
  );

  const centerViewOnScreen = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (!containerRef.current || cardIsExpanding || isTransitionEnabled) return;

    setTransitionEnabled(true);

    const currentZoom = zoomLevel;
    const currentPosition = position;
    const newZoomLevel = 1;

    setZoomLevel(1);

    const viewportWidth = containerRef.current.clientWidth;
    const viewportHeight = containerRef.current.clientHeight;

    const viewportCenterX = viewportWidth / 2;
    const viewportCenterY = viewportHeight / 2;

    const worldX = (viewportCenterX - currentPosition.x) / currentZoom;
    const worldY = (viewportCenterY - currentPosition.y) / currentZoom;

    const newPositionX = viewportCenterX - worldX * newZoomLevel;
    const newPositionY = viewportCenterY - worldY * newZoomLevel;

    setPosition({ x: newPositionX, y: newPositionY });

    transitionTimerRef.current = setTimeout(() => {
      setTransitionEnabled(false);
      transitionTimerRef.current = null;
    }, 350);
  }, [
    containerRef,
    cardIsExpanding,
    isTransitionEnabled,
    zoomLevel,
    position,
    setZoomLevel,
    setPosition,
    setTransitionEnabled
  ]);

  // ---- MOUSE HANDLERS ----
  const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave, handleWheel } = useMouseHandlers({
    dragging,
    isTransitionEnabled,
    didDrag,
    selectedCard,
    position,
    zoomLevel,
    expandedCard,
    cardIsExpanding,
    startPositionRef,
    movementAccumulator,
    setDragging,
    setDidDrag,
    setSelectedCard,
    setPosition,
    setZoomLevel,
    throttledSetPosition,
    calculateZoomUpdate // Pass the utility function
  });

  // ---- TOUCH HANDLERS ----
  const { handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel } = useTouchHandlers(
    {
      dragging,
      isTransitionEnabled,
      didDrag,
      selectedCard,
      position,
      zoomLevel,
      expandedCard,
      cardIsExpanding,
      lastTouchRef,
      lastPinchDistanceRef,
      startPositionRef,
      movementAccumulator,
      transitionTimerRef,
      setDragging,
      setDidDrag,
      setSelectedCard,
      setPosition,
      setZoomLevel,
      setTransitionEnabled,
      throttledSetPosition,
      calculateZoomUpdate // Pass the utility function
    }
  );

  // ---- EFFECTS & INITIALIZATION ----

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Mouse Listeners
      container.addEventListener('mousedown', handleMouseDown as unknown as EventListener);
      window.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
      window.addEventListener('mouseup', handleMouseUpOrLeave as unknown as EventListener);
      container.addEventListener('mouseleave', handleMouseUpOrLeave as unknown as EventListener);
      container.addEventListener('wheel', handleWheel as unknown as EventListener, {
        passive: false
      });

      // Touch Listeners
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
        // Mouse Cleanup
        container.removeEventListener('mousedown', handleMouseDown as unknown as EventListener);
        window.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        window.removeEventListener('mouseup', handleMouseUpOrLeave as unknown as EventListener);
        container.removeEventListener(
          'mouseleave',
          handleMouseUpOrLeave as unknown as EventListener
        );
        container.removeEventListener('wheel', handleWheel as unknown as EventListener);

        // Touch Cleanup
        container.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
        container.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
        container.removeEventListener('touchend', handleTouchEnd as unknown as EventListener);
        container.removeEventListener('touchcancel', handleTouchCancel as unknown as EventListener);
      };
    }
  }, [
    containerRef,
    handleMouseDown,
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
    if (cardSize.width === 0) return;
    centerToCard();
    setSelectedCard(MIDDLE_CARD_INDEX);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardSize]);

  // Recenter the canvas on window resize
  useEffect(() => {
    const handleResize = () => {
      centerToCard();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [centerToCard]);

  return {
    centerToCard,
    centerViewOnScreen
  };
}
