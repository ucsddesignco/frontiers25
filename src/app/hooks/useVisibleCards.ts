import { useMemo } from 'react';
import { CardType } from '../components/constants';
import {
  GRID_COLUMNS,
  GRID_ROWS,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_GAP
} from '../components/constants';

type Position = {
  x: number;
  y: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type UseVisibleCardsProps = {
  basePattern: CardType[];
  position: Position;
  zoomLevel: number;
  viewportSize: ViewportSize;
};

// Define the return type for better type inference in the component
export type VisibleCard = CardType & {
  x: number;
  y: number;
  virtualCol: number;
  virtualRow: number;
  patternIndex: number;
  key: string;
};

export const useVisibleCards = ({
  basePattern,
  position,
  zoomLevel,
  viewportSize
}: UseVisibleCardsProps): VisibleCard[] => {
  return useMemo(() => {
    if (!basePattern.length || !viewportSize.width || !viewportSize.height || zoomLevel <= 0)
      return [];

    // Disable buffer when zoomed out significantly to improve performance
    const zoomThreshold = 0.75;
    const renderBuffer = zoomLevel >= zoomThreshold ? 1 : 0; // Buffer is used to reduce pop-in

    const effectiveCardWidth = CARD_WIDTH + CARD_GAP;
    const effectiveCardHeight = CARD_HEIGHT + CARD_GAP;

    const viewLeft = -position.x / zoomLevel;
    const viewTop = -position.y / zoomLevel;
    const viewRight = (-position.x + viewportSize.width) / zoomLevel;
    const viewBottom = (-position.y + viewportSize.height) / zoomLevel;

    // Determine the range of virtual grid cells visible in the viewport
    const startCol = Math.floor(viewLeft / effectiveCardWidth) - renderBuffer;
    const endCol = Math.ceil(viewRight / effectiveCardWidth) + renderBuffer;
    const startRow = Math.floor(viewTop / effectiveCardHeight) - renderBuffer;
    const endRow = Math.ceil(viewBottom / effectiveCardHeight) + renderBuffer;

    const cardsToRender: VisibleCard[] = [];

    // Iterate over the visible virtual grid range
    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col < endCol; col++) {
        // Map the virtual grid coordinates to the base pattern coordinates
        const patternCol = ((col % GRID_COLUMNS) + GRID_COLUMNS) % GRID_COLUMNS;
        const patternRow = ((row % GRID_ROWS) + GRID_ROWS) % GRID_ROWS;
        const patternIndex = patternRow * GRID_COLUMNS + patternCol;

        if (patternIndex >= 0 && patternIndex < basePattern.length) {
          const cardData = basePattern[patternIndex];
          const cardX = col * effectiveCardWidth;
          const cardY = row * effectiveCardHeight;

          cardsToRender.push({
            ...cardData,
            x: cardX,
            y: cardY,
            virtualCol: col,
            virtualRow: row,
            patternIndex: patternIndex,
            key: `${cardData.id}-${col}-${row}`
          });
        }
      }
    }
    return cardsToRender;
  }, [basePattern, position, zoomLevel, viewportSize]);
};
