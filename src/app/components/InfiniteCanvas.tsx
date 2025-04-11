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
    learnMoreRef
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      containerRef: state.containerRef,
      isExpanded: state.isExpanded,
      basePattern: state.basePattern,
      position: state.position,
      zoomLevel: state.zoomLevel,
      userHasInteracted: state.userHasInteracted,
      learnMoreRef: state.learnMoreRef
    }))
  );

  const backgroundRef = useRef<HTMLDivElement>(null);

  useInitializeCards();

  useCanvasActions();

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
          className="absolute inset-0 z-[-1]"
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
          id="canvas-grid"
          className="relative select-none will-change-transform"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
            transformOrigin: 'top left' // Align with coordinate system
          }}
        >
          {visibleCards.map(card => {
            const isMiddleCard = card.patternIndex === MIDDLE_CARD_INDEX;
            const scaleClass = isMiddleCard && !userHasInteracted ? `scale-[1.1] z-[1]` : '';

            return (
              <div
                key={card.key}
                style={{
                  position: 'absolute',
                  left: `${card.x}px`,
                  top: `${card.y}px`,
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`
                }}
              >
                <Card
                  card={card}
                  onLearnMore={handleLearnMore}
                  userHasInteracted={userHasInteracted}
                  className={`${scaleClass}`}
                  learnMoreRef={isMiddleCard ? learnMoreRef : undefined}
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
