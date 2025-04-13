'use client';

import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import { useRef } from 'react';
import { CARD_WIDTH, CARD_HEIGHT, DOT_BACKGROUND_SIZE, GRID_COLUMNS, GRID_ROWS } from './constants';
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
import Fog from './Fog/Fog';

const MIDDLE_CARD_INDEX = Math.floor((GRID_COLUMNS * GRID_ROWS) / 2);

const InfiniteCanvas = () => {
  const {
    containerRef,
    isExpanded,
    basePattern,
    position,
    zoomLevel,
    userHasInteracted,
    cardIsExpanding,
    gridRef,
    isTransitionEnabled
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      containerRef: state.containerRef,
      isExpanded: state.isExpanded,
      basePattern: state.basePattern,
      position: state.position,
      zoomLevel: state.zoomLevel,
      userHasInteracted: state.userHasInteracted,
      cardIsExpanding: state.cardIsExpanding,
      gridRef: state.gridRef,
      isTransitionEnabled: state.isTransitionEnabled
    }))
  );

  const backgroundRef = useRef<HTMLDivElement>(null);

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
      <Fog />
      <ExpandedCard isExpanded={isExpanded} />
      <div
        ref={containerRef}
        id="canvas-container"
        className="relative h-screen w-screen cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <div
          ref={backgroundRef}
          id="background-dots"
          className="absolute inset-0"
          style={{
            backgroundSize: `${DOT_BACKGROUND_SIZE}px ${DOT_BACKGROUND_SIZE}px`
          }}
        ></div>
        <button
          onClick={handleGalleryClick}
          className="fixed left-6 top-5 z-[10] flex select-none items-center gap-1 rounded-full bg-[#2E2437] px-5 py-[0.625rem] text-lg text-white sm:left-12 sm:top-10"
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
            const isMiddleCard = card.patternIndex === MIDDLE_CARD_INDEX;
            const scaleClass = isMiddleCard && !userHasInteracted ? `scale-[1.1] z-[1]` : '';

            const handleCardClick = card.isFading
              ? (e: React.MouseEvent<HTMLDivElement>) => {
                  e.preventDefault();
                }
              : () => {
                  centerToCard(card.x, card.y);
                };

            return (
              <div
                key={card.key}
                style={{
                  position: 'absolute',
                  left: `${card.x}px`,
                  top: `${card.y}px`,
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                  zIndex: card.isFading ? -1 : ''
                }}
              >
                <Card
                  card={card}
                  onClick={handleCardClick}
                  onLearnMore={handleLearnMore}
                  userHasInteracted={userHasInteracted}
                  className={`${scaleClass} ${cardIsExpanding ? '' : 'hover:scale-[1.1]'}`}
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
