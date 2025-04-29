import { useShallow } from 'zustand/shallow';
import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import { CSSProperties, memo, RefObject } from 'react';
import ThickFog from './ThickFog';
import Card from './Card';
import { VisibleCard } from '../hooks/useVisibleCards';

type CardGridProps = {
  wasZoomed: boolean;
  setWasZoomed: (wasZoomed: boolean) => void;
  visibleCards: VisibleCard[];
  isInitialLoad: RefObject<boolean>;
  handleLearnMore: (card: VisibleCard) => void;
  centerToCard: (x: number, y: number) => void;
  checkPrevious: (index: number) => boolean | undefined;
  cardSize: CanvasState['cardSize'];
};

function CardGrid({
  wasZoomed,
  setWasZoomed,
  visibleCards,
  isInitialLoad,
  handleLearnMore,
  centerToCard,
  checkPrevious,
  cardSize
}: CardGridProps) {
  const {
    position,
    zoomLevel,
    selectedCard,
    setSelectedCard,
    didDrag,
    cardIsExpanding,
    isTransitionEnabled,
    gridRef
  } = useCanvasStore(
    useShallow(state => ({
      position: state.position,
      zoomLevel: state.zoomLevel,
      selectedCard: state.selectedCard,
      setSelectedCard: state.setSelectedCard,
      didDrag: state.didDrag,
      cardIsExpanding: state.cardIsExpanding,
      isTransitionEnabled: state.isTransitionEnabled,
      gridRef: state.gridRef
    }))
  );

  return (
    <div
      ref={gridRef}
      id="canvas-grid"
      className={`${isTransitionEnabled ? 'duration-[0.35s] transition-transform ease-in-out' : ''} relative select-none will-change-transform`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
        transformOrigin: 'top left' // Align with coordinate system
      }}
    >
      {visibleCards.map(card => {
        const isSelected = selectedCard === card.patternIndex;
        const isPrevious = checkPrevious(card.patternIndex);
        const selectedClass = isSelected ? 'scale-[1.1] z-[3] selected' : '';

        const previousClass = isPrevious && !isSelected ? 'z-[1]' : '';
        const showThickFog = (isSelected || isPrevious) && zoomLevel === 1 && !wasZoomed;

        const handleCardClick = card.isFading
          ? (e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
            }
          : () => {
              if (!didDrag && selectedCard !== card.patternIndex) {
                if (wasZoomed) {
                  setWasZoomed(false);
                }
                centerToCard(card.x, card.y);
                setSelectedCard(card.patternIndex);
              }
            };

        return (
          <div
            key={card.key}
            style={
              {
                position: 'absolute',
                left: `${card.x}px`,
                top: `${card.y}px`,
                width: `${cardSize.width}px`,
                height: `${cardSize.height}px`,
                zIndex: card.isFading ? -1 : ''
              } as CSSProperties
            }
          >
            {showThickFog && (
              <ThickFog
                status={isSelected ? 'selected' : 'previous'}
                isInitialLoad={isInitialLoad}
              />
            )}
            <Card
              card={card}
              onClick={handleCardClick}
              onLearnMore={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                if (!didDrag) {
                  handleLearnMore(card);
                  if (selectedCard !== card.patternIndex) {
                    setSelectedCard(null);
                  }
                }
              }}
              className={`${selectedClass} ${previousClass} ${cardIsExpanding ? '' : 'lg:hover:scale-[1.1]'}`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default memo(CardGrid);
