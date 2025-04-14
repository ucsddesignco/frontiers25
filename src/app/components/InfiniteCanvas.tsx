'use client';

import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import { CSSProperties, useRef } from 'react';
import { CARD_WIDTH, CARD_HEIGHT, DOT_BACKGROUND_SIZE, MIDDLE_CARD_INDEX } from './constants';
import { useCanvasActions } from '../hooks/useCanvasActions';
import Card from './Card';
import { useCardInteractions } from '../hooks/useCardInteractions';
import { useInitializeCards } from '../hooks/useInitializeCards';
import ExpandedCard from './ExpandedCard/ExpandedCard';
import { GalleryIcon } from '../assets/GalleryIcon';
import { useVisibleCards } from '@/app/hooks/useVisibleCards';
import { useBackgroundDots } from '@/app/hooks/useBackgroundDots';
import { useViewportSize } from '@/app/hooks/useViewportSize';
import { useShallow } from 'zustand/shallow';
import LightFog from './LightFog';
import ThickFog from './ThickFog';

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
      setSelectedCard: state.setSelectedCard
    }))
  );

  const previousSelectedCards = useRef<Array<number | null>>([MIDDLE_CARD_INDEX]); // Length of 2 [old, current]
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useInitializeCards();

  const { centerToCard } = useCanvasActions();

  const { handleLearnMore, handleGalleryClick } = useCardInteractions();

  const viewportSize = useViewportSize();

  const visibleCards = useVisibleCards({
    basePattern,
    position,
    zoomLevel,
    viewportSize
  });

  useBackgroundDots({ backgroundRef, position, zoomLevel });

  return (
    <>
      <ExpandedCard showExpanded={showExpanded} />
      <div
        ref={containerRef}
        id="canvas-container"
        className="relative h-screen w-screen cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <LightFog />
        <div
          ref={backgroundRef}
          id="background-dots"
          className="absolute inset-0"
          style={{
            backgroundSize: `${DOT_BACKGROUND_SIZE}px ${DOT_BACKGROUND_SIZE}px`
          }}
        ></div>
        <button
          onClick={e => {
            e.stopPropagation();
            handleGalleryClick();
          }}
          onMouseDown={e => {
            e.stopPropagation();
          }}
          className="fixed left-6 top-5 z-[10] flex cursor-pointer select-none items-center gap-1 rounded-full bg-[#2E2437] px-5 py-[0.625rem] text-lg text-white sm:left-12 sm:top-10"
        >
          <span>
            <GalleryIcon />
          </span>
          Gallery
        </button>
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

            const handleCardClick = card.isFading
              ? (e: React.MouseEvent<HTMLDivElement>) => {
                  e.preventDefault();
                }
              : () => {
                  if (!didDrag && selectedCard !== card.patternIndex) {
                    // We keep track of current too in case user pans canvas and selectCard is null
                    previousSelectedCards.current = [selectedCard, card.patternIndex];
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
                {(isSelected || isPrevious) && zoomLevel >= 1 && (
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
