import { MouseEvent, WheelEvent, useCallback, RefObject } from 'react';
import { CanvasState } from '../stores/canvasStore';
import { DRAG_THRESHOLD } from '../components/constants';
import { VisibleCard } from './useVisibleCards';

type Position = { x: number; y: number };

interface UseMouseHandlersProps {
  dragging: boolean;
  isTransitionEnabled: boolean;
  didDrag: boolean;
  selectedCard: CanvasState['selectedCard'];
  position: Position;
  zoomLevel: number;
  expandedCard: VisibleCard | null;
  cardIsExpanding: boolean;
  startPositionRef: RefObject<Position | null>;
  movementAccumulator: RefObject<Position>;
  setDragging: CanvasState['setDragging'];
  setDidDrag: CanvasState['setDidDrag'];
  setSelectedCard: CanvasState['setSelectedCard'];
  setPosition: CanvasState['setPosition'];
  setZoomLevel: CanvasState['setZoomLevel'];
  throttledSetPosition: (newPosition: Position) => void;
  calculateZoomUpdate: (
    currentZoom: number,
    currentPosition: Position,
    zoomDelta: number,
    centerX: number,
    centerY: number
  ) => { newZoomLevel: number; newPosition: Position } | null;
}

export function useMouseHandlers({
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
  calculateZoomUpdate
}: UseMouseHandlersProps) {
  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      e.preventDefault(); // Prevent text selection and default drag behavior

      if ((e.button !== 0 && e.button !== 1) || cardIsExpanding) return;

      setDragging(true);
      setDidDrag(false);
      startPositionRef.current = { x: e.clientX, y: e.clientY };
      movementAccumulator.current = { x: 0, y: 0 };
    },
    [cardIsExpanding, setDragging, setDidDrag, startPositionRef, movementAccumulator]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      if (dragging && !isTransitionEnabled) {
        movementAccumulator.current.x += e.movementX;
        movementAccumulator.current.y += e.movementY;

        if (!didDrag && startPositionRef.current) {
          const dx = e.clientX - startPositionRef.current.x;
          const dy = e.clientY - startPositionRef.current.y;
          if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
            setDidDrag(true);
          }
        }

        if (selectedCard !== null) {
          setSelectedCard(null);
        }

        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
      }
    },
    [
      dragging,
      isTransitionEnabled,
      didDrag,
      selectedCard,
      throttledSetPosition,
      position.x,
      position.y,
      setDidDrag,
      setSelectedCard,
      startPositionRef,
      movementAccumulator
    ]
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
    startPositionRef.current = null;
  }, [dragging, position, setPosition, setDragging, startPositionRef, movementAccumulator]);

  const handleWheel = useCallback(
    (e: WheelEvent): void => {
      e.preventDefault(); // Prevent default browser scroll/zoom

      if (expandedCard !== null || isTransitionEnabled) return;

      if (selectedCard !== null) {
        setSelectedCard(null);
      }

      // Handle Ctrl + Wheel for zooming
      if (e.ctrlKey) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const zoomFactor = 0.15;
        const zoomDelta = e.deltaY < 0 ? zoomFactor : -zoomFactor;

        const zoomUpdate = calculateZoomUpdate(zoomLevel, position, zoomDelta, mouseX, mouseY);

        if (zoomUpdate) {
          setPosition(zoomUpdate.newPosition);
          setZoomLevel(zoomUpdate.newZoomLevel);
          setDidDrag(true);
        }
      }
      // Pan horizontally
      else if (e.shiftKey) {
        movementAccumulator.current.x -= e.deltaY;
        setDidDrag(true);

        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y
        });
      }
      // Handle trackpad scroll/pan (no Ctrl key)
      else {
        const sensitivity = 1.0; // Pan sensitivity
        movementAccumulator.current.x -= e.deltaX * sensitivity;
        movementAccumulator.current.y -= e.deltaY * sensitivity;
        setDidDrag(true);

        throttledSetPosition({
          x: position.x + movementAccumulator.current.x,
          y: position.y + movementAccumulator.current.y
        });
      }
    },
    [
      expandedCard,
      isTransitionEnabled,
      calculateZoomUpdate,
      zoomLevel,
      position,
      setPosition,
      setZoomLevel,
      setDidDrag,
      selectedCard,
      setSelectedCard,
      throttledSetPosition,
      movementAccumulator
    ]
  );

  return { handleMouseDown, handleMouseMove, handleMouseUpOrLeave, handleWheel };
}
