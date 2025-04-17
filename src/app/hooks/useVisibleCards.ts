import { useMemo, useRef } from 'react';
import { CardType } from '../components/constants';
import { GRID_COLUMNS, GRID_ROWS } from '../components/constants';
import { CanvasState } from '../stores/canvasStore';

type Position = {
  x: number;
  y: number;
};

type ViewportSize = {
  width: number;
  height: number;
};

type UseVisibleCardsProps = {
  cardSize: CanvasState['cardSize'];
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
  isFading?: boolean;
  fadeStartTime?: number;
};

// The duration cards will linger after they leave the viewport
const FADE_DURATION_MS = 250;

export const useVisibleCards = ({
  cardSize,
  basePattern,
  position,
  zoomLevel,
  viewportSize
}: UseVisibleCardsProps): VisibleCard[] => {
  const prevVisibleCardsRef = useRef<Record<string, VisibleCard>>({});
  // Ref to track the current timestamp for cleanup calculations
  const nowRef = useRef<number>(Date.now());

  return useMemo(() => {
    if (!basePattern.length || !viewportSize.width || !viewportSize.height || zoomLevel <= 0)
      return [];

    nowRef.current = Date.now();

    const renderBuffer = zoomLevel <= 1 ? 0 : 1;

    const effectiveCardWidth = cardSize.width + cardSize.gap;
    const effectiveCardHeight = cardSize.height + cardSize.gap;

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
    const currentlyVisibleKeys = new Set<string>();

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
          const cardKey = `${cardData.id}-${col}-${row}`;

          cardsToRender.push({
            ...cardData,
            x: cardX,
            y: cardY,
            virtualCol: col,
            virtualRow: row,
            patternIndex: patternIndex,
            key: cardKey
          });

          currentlyVisibleKeys.add(cardKey);
        }
      }
    }

    // Create a new map of previous cards
    // This is used to fade out cards which is important to make centerToCard look smooth
    const newPrevVisibleCards: Record<string, VisibleCard> = {};

    // Add fading cards that were previously visible but not currently visible
    Object.values(prevVisibleCardsRef.current).forEach(prevCard => {
      if (!currentlyVisibleKeys.has(prevCard.key)) {
        if (!prevCard.isFading) {
          prevCard.isFading = true;
          prevCard.fadeStartTime = nowRef.current;
        }

        const fadeTime = nowRef.current - (prevCard.fadeStartTime || 0);
        if (fadeTime < FADE_DURATION_MS) {
          cardsToRender.push(prevCard);
          newPrevVisibleCards[prevCard.key] = prevCard;
        }
      }
    });

    cardsToRender
      .filter(card => !card.isFading)
      .forEach(card => {
        newPrevVisibleCards[card.key] = card;
      });

    prevVisibleCardsRef.current = newPrevVisibleCards;

    return cardsToRender;
  }, [basePattern, position, zoomLevel, viewportSize]);
};
