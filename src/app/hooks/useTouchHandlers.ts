import { TouchEvent, useCallback, RefObject, useRef } from 'react';
import { CanvasState } from '../stores/canvasStore';
import { DRAG_THRESHOLD } from '../components/constants';
import { VisibleCard } from './useVisibleCards';
import { useViewportSize } from './useViewportSize';

type Position = { x: number; y: number };

interface UseTouchHandlersProps {
  dragging: boolean;
  isTransitionEnabled: boolean;
  didDrag: boolean;
  selectedCard: CanvasState['selectedCard'];
  position: Position;
  zoomLevel: number;
  expandedCard: VisibleCard | null;
  cardIsExpanding: boolean;
  lastTouchRef: RefObject<Position | null>;
  lastPinchDistanceRef: RefObject<number | null>;
  startPositionRef: RefObject<Position | null>;
  movementAccumulator: RefObject<Position>;
  transitionTimerRef: RefObject<NodeJS.Timeout | null>;
  setDragging: CanvasState['setDragging'];
  setDidDrag: CanvasState['setDidDrag'];
  setSelectedCard: CanvasState['setSelectedCard'];
  setPosition: CanvasState['setPosition'];
  setZoomLevel: CanvasState['setZoomLevel'];
  setTransitionEnabled: CanvasState['setTransitionEnabled'];
  throttledSetPosition: (newPosition: Position) => void;
  calculateZoomUpdate: (
    currentZoom: number,
    currentPosition: Position,
    zoomDelta: number,
    centerX: number,
    centerY: number
  ) => { newZoomLevel: number; newPosition: Position } | null;
  showMobileGallery: boolean;
}

export function useTouchHandlers({
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
  calculateZoomUpdate,
  showMobileGallery
}: UseTouchHandlersProps) {
  const viewportSize = useViewportSize();
  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 768 : viewportSize.width < 768;

  // --- Momentum state ---
  // Store recent Y positions and timestamps for velocity calculation
  const recentYRef = useRef<{ y: number; time: number }[]>([]);
  const momentumAnimRef = useRef<number | null>(null);
  const velocityYRef = useRef<number>(0);
  const isMomentumActiveRef = useRef<boolean>(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
      if (isTransitionEnabled) {
        if (transitionTimerRef.current) {
          clearTimeout(transitionTimerRef.current);
          transitionTimerRef.current = null;
        }
        setTransitionEnabled(false);
        return;
      }

      if (cardIsExpanding || isTransitionEnabled) return;

      setDidDrag(false);

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
        setDragging(false);
        startPositionRef.current = null;
      } else if (e.touches.length === 1) {
        // Pan start
        const touch = e.touches[0];
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        startPositionRef.current = { x: touch.clientX, y: touch.clientY };
        setDragging(true);
        movementAccumulator.current = { x: 0, y: 0 };
        // Reset momentum tracking
        recentYRef.current = [{ y: touch.clientY, time: Date.now() }];
        if (momentumAnimRef.current) {
          cancelAnimationFrame(momentumAnimRef.current);
          momentumAnimRef.current = null;
        }
        isMomentumActiveRef.current = false;
      }
    },
    [
      isTransitionEnabled,
      cardIsExpanding,
      setDidDrag,
      setTransitionEnabled,
      setDragging,
      transitionTimerRef,
      lastPinchDistanceRef,
      lastTouchRef,
      startPositionRef,
      movementAccumulator,
      recentYRef,
      momentumAnimRef,
      isMomentumActiveRef
    ]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (expandedCard !== null || isTransitionEnabled) return;

      if (selectedCard !== null) {
        setSelectedCard(null);
      }

      // Handle pinch-to-zoom
      if (e.touches.length === 2 && lastTouchRef.current && lastPinchDistanceRef.current !== null) {
        if (window.innerWidth < 768 && !showMobileGallery) {
          return;
        }
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        const pinchRatio = currentDistance / lastPinchDistanceRef.current;
        lastPinchDistanceRef.current = currentDistance;

        const midX = (touch1.clientX + touch2.clientX) / 2;
        const midY = (touch1.clientY + touch2.clientY) / 2;

        const zoomDelta = (pinchRatio - 1) * 0.5;

        const zoomUpdate = calculateZoomUpdate(zoomLevel, position, zoomDelta, midX, midY);

        if (zoomUpdate) {
          setPosition(zoomUpdate.newPosition);
          setZoomLevel(zoomUpdate.newZoomLevel);
          lastTouchRef.current = { x: midX, y: midY };
        }
        setDidDrag(true);
        return;
      }

      // Handle panning with single finger
      if (dragging && lastTouchRef.current && e.touches.length === 1) {
        const touch = e.touches[0];
        let movementX = touch.clientX - lastTouchRef.current.x;
        const movementY = touch.clientY - lastTouchRef.current.y;
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };

        // --- Track recent Y positions for velocity ---
        if (isMobile) {
          const now = Date.now();
          recentYRef.current.push({ y: touch.clientY, time: now });
          // Keep only last 5 samples within 100ms
          recentYRef.current = recentYRef.current.filter(pt => now - pt.time < 100);
        }

        if (!didDrag && startPositionRef.current) {
          const dx = touch.clientX - startPositionRef.current.x;
          const dy = touch.clientY - startPositionRef.current.y;
          if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
            setDidDrag(true);
          }
        }

        if (isMobile && !showMobileGallery) {
          movementX = 0;
        }

        movementAccumulator.current.x += movementX;
        movementAccumulator.current.y += movementY;
        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
      }
    },
    [
      expandedCard,
      isTransitionEnabled,
      selectedCard,
      lastTouchRef,
      lastPinchDistanceRef,
      dragging,
      setSelectedCard,
      calculateZoomUpdate,
      zoomLevel,
      position,
      setDidDrag,
      setPosition,
      setZoomLevel,
      isMobile,
      didDrag,
      startPositionRef,
      showMobileGallery,
      movementAccumulator,
      throttledSetPosition
    ]
  );

  const handleTouchEnd = useCallback(
    (_e: TouchEvent<HTMLDivElement>): void => {
      // Handle final position update if panning occurred
      if (dragging) {
        if (movementAccumulator.current.x !== 0 || movementAccumulator.current.y !== 0) {
          setPosition({
            x: position.x + movementAccumulator.current.x,
            y: position.y + movementAccumulator.current.y
          });
        }
        movementAccumulator.current = { x: 0, y: 0 };
        setDragging(false);
      }
      // --- Calculate and apply momentum for mobile vertical pan ---
      if (isMobile && recentYRef.current.length >= 2 && !isMomentumActiveRef.current) {
        const last = recentYRef.current[recentYRef.current.length - 1];
        const first = recentYRef.current[0];
        const dt = last.time - first.time || 1;
        const dy = last.y - first.y;
        const velocityY = dy / dt; // px/ms
        // Only apply if velocity is significant
        if (Math.abs(velocityY) > 0.2) {
          // tune threshold as needed
          velocityYRef.current = velocityY * 16.67; // px/frame (assuming ~60fps)
          isMomentumActiveRef.current = true;
          let currentY = position.y;
          const friction = 0.95; // tune for slower/faster stop
          function animate() {
            velocityYRef.current *= friction;
            currentY += velocityYRef.current;
            setPosition({ x: position.x, y: currentY });
            if (Math.abs(velocityYRef.current) > 0.5) {
              momentumAnimRef.current = requestAnimationFrame(animate);
            } else {
              isMomentumActiveRef.current = false;
              momentumAnimRef.current = null;
            }
          }
          momentumAnimRef.current = requestAnimationFrame(animate);
        }
      }
      recentYRef.current = [];
      lastPinchDistanceRef.current = null;
      lastTouchRef.current = null;
      startPositionRef.current = null;
    },
    [
      dragging,
      position,
      setPosition,
      setDragging,
      movementAccumulator,
      lastPinchDistanceRef,
      lastTouchRef,
      startPositionRef,
      isMobile,
      recentYRef,
      isMomentumActiveRef,
      velocityYRef,
      momentumAnimRef
    ]
  );

  const handleTouchCancel = useCallback(
    (_e: TouchEvent<HTMLDivElement>): void => {
      lastTouchRef.current = null;
      lastPinchDistanceRef.current = null;
      startPositionRef.current = null;
      movementAccumulator.current = { x: 0, y: 0 };
      setDragging(false);
      setDidDrag(false);
    },
    [
      setDragging,
      setDidDrag,
      movementAccumulator,
      lastPinchDistanceRef,
      lastTouchRef,
      startPositionRef
    ]
  );

  return { handleTouchStart, handleTouchMove, handleTouchEnd, handleTouchCancel };
}
