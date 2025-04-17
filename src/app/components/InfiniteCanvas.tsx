'use client';

import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import { useCallback, useRef, useState } from 'react';
import { useCanvasActions } from '../hooks/useCanvasActions';
import { useCardInteractions } from '../hooks/useCardInteractions';
import { useInitializeCards } from '../hooks/useInitializeCards';
import ExpandedCard from './ExpandedCard/ExpandedCard';
import { useVisibleCards } from '@/app/hooks/useVisibleCards';
import { useBackgroundDots } from '@/app/hooks/useBackgroundDots';
import { useViewportSize } from '@/app/hooks/useViewportSize';
import { useShallow } from 'zustand/shallow';
import LightFog from './LightFog';
import SelectedIsland from './SelectedIsland/SelectedIsland';
import ResetButton from './ResetButton';
import BackgroundDots from './BackgroundDots';
import CardGrid from './CardGrid';
import { usePreviousCards } from '../hooks/usePreviousCards';

const InfiniteCanvas = () => {
  const { containerRef, showExpanded, basePattern, position, zoomLevel, selectedCard, cardSize } =
    useCanvasStore(
      useShallow((state: CanvasState) => ({
        containerRef: state.containerRef,
        showExpanded: state.showExpanded,
        basePattern: state.basePattern,
        position: state.position,
        zoomLevel: state.zoomLevel,
        isTransitionEnabled: state.isTransitionEnabled,
        selectedCard: state.selectedCard,
        cardSize: state.cardSize
      }))
    );

  const [wasZoomed, setWasZoomed] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useInitializeCards();

  const { centerToCard, centerViewOnScreen } = useCanvasActions();

  const { handleLearnMore, handleGalleryClick } = useCardInteractions();

  const viewportSize = useViewportSize();

  const visibleCards = useVisibleCards({
    cardSize,
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

  const { checkPrevious } = usePreviousCards(selectedCard);

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

        <CardGrid
          cardSize={cardSize}
          centerToCard={centerToCard}
          checkPrevious={checkPrevious}
          handleLearnMore={handleLearnMore}
          isInitialLoad={isInitialLoad}
          setWasZoomed={setWasZoomed}
          visibleCards={visibleCards}
          wasZoomed={wasZoomed}
        />
      </div>
    </>
  );
};

export default InfiniteCanvas;
