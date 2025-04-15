'use client';

import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import { CSSProperties, useCallback, useRef, useState } from 'react';
import { CARD_WIDTH, CARD_HEIGHT, DOT_BACKGROUND_SIZE, MIDDLE_CARD_INDEX } from './constants';
import { useCanvasActions } from '../hooks/useCanvasActions';
import Card from './Card';
import { useCardInteractions } from '../hooks/useCardInteractions';
import { useInitializeCards } from '../hooks/useInitializeCards';
import ExpandedCard from './ExpandedCard/ExpandedCard';
import { useVisibleCards } from '@/app/hooks/useVisibleCards';
import { useBackgroundDots } from '@/app/hooks/useBackgroundDots';
import { useViewportSize } from '@/app/hooks/useViewportSize';
import { useShallow } from 'zustand/shallow';
import LightFog from './LightFog';
import ThickFog from './ThickFog';
import SelectedIsland from './SelectedIsland/SelectedIsland';
import ResetButton from './ResetButton';
import BackgroundDots from './BackgroundDots';

const InfiniteCanvas = () => {
  const {
    containerRef,
    showExpanded,
    basePattern,
    position,
    zoomLevel,
    cardIsExpanding,
    gridRef,
    isTransitionEnabled,
    didDrag,
    selectedCard,
    setSelectedCard
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      containerRef: state.containerRef,
      showExpanded: state.showExpanded,
      basePattern: state.basePattern,
      position: state.position,
      zoomLevel: state.zoomLevel,
      cardIsExpanding: state.cardIsExpanding,
      gridRef: state.gridRef,
      isTransitionEnabled: state.isTransitionEnabled,
      didDrag: state.didDrag,
      selectedCard: state.selectedCard,
      setSelectedCard: state.setSelectedCard,
      setZoomLevel: state.setZoomLevel
    }))
  );

  const [wasZoomed, setWasZoomed] = useState(false);
  const previousSelectedCards = useRef<Array<number | null>>([MIDDLE_CARD_INDEX]); // Length of 2 [old, current]
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useInitializeCards();

  const { centerToCard, centerViewOnScreen } = useCanvasActions();

  const { handleLearnMore, handleGalleryClick } = useCardInteractions();

  const viewportSize = useViewportSize();

  const visibleCards = useVisibleCards({
    basePattern,
    position,
    zoomLevel,
    viewportSize
  });

  useBackgroundDots({ backgroundRef, position, zoomLevel });

  const handleResetZoom = useCallback(() => {
    if (zoomLevel !== 1) {
      centerViewOnScreen();
      setWasZoomed(true);
    }
  }, [setWasZoomed, centerViewOnScreen, zoomLevel]);

  return (
    <>
      <ExpandedCard showExpanded={showExpanded} />
      <div
        ref={containerRef}
        id="canvas-container"
        className="relative h-screen w-screen cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <LightFog />

        <BackgroundDots position={position} zoomLevel={zoomLevel} />

        <ResetButton handleGalleryClick={handleGalleryClick} handleResetZoom={handleResetZoom} />

        <SelectedIsland selectedCard={selectedCard} />
        <div
          ref={gridRef}
          id="canvas-grid"
          className={`${isTransitionEnabled ? 'transition-transform duration-[0.35s] ease-in-out' : ''} relative select-none will-change-transform`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            transformOrigin: 'top left' // Align with coordinate system
          }}
        >
          {visibleCards.map(card => {
            const isSelected = selectedCard === card.patternIndex;
            const isPrevious = previousSelectedCards.current.includes(card.patternIndex);
            const selectedClass = isSelected ? 'scale-[1.1] z-[2] selected' : '';

            const previousClass = isPrevious && !isSelected ? 'z-[1]' : '';
            const showThickFog = (isSelected || isPrevious) && zoomLevel === 1 && !wasZoomed;

            const handleCardClick = card.isFading
              ? (e: React.MouseEvent<HTMLDivElement>) => {
                  e.preventDefault();
                }
              : () => {
                  if (!didDrag && selectedCard !== card.patternIndex) {
                    // We keep track of current too in case user pans canvas and selectCard is null
                    previousSelectedCards.current = [selectedCard, card.patternIndex];
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
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
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
                  className={`${selectedClass} ${previousClass} ${cardIsExpanding ? '' : 'hover:scale-[1.1]'}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default InfiniteCanvas;
