'use client';

import { CanvasState, useCanvasStore } from '../stores/canvasStore';
import { useCallback, useEffect, useRef, useState } from 'react';
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
import { CardType, MOBILE_BREAKPOINT } from './constants';
import GalleryButton from './GalleryButton';
import MobileGalleryFog from './MobileGalleryFog';

export type DatabaseCard = Omit<CardType, 'borderColor' | 'buttonColor' | 'scrollbarColor'>;

type InfiniteCanvasProps = {
  data: DatabaseCard[];
};

const InfiniteCanvas = ({ data }: InfiniteCanvasProps) => {
  const {
    containerRef,
    showExpanded,
    basePattern,
    position,
    zoomLevel,
    selectedCard,
    cardSize,
    showMobileGallery,
    setShowMobileGallery,
    showMobileGalleryFog,
    setShowMobileGalleryFog,
    setCardSize
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      containerRef: state.containerRef,
      showExpanded: state.showExpanded,
      basePattern: state.basePattern,
      position: state.position,
      zoomLevel: state.zoomLevel,
      isTransitionEnabled: state.isTransitionEnabled,
      selectedCard: state.selectedCard,
      cardSize: state.cardSize,
      showMobileGallery: state.showMobileGallery,
      setShowMobileGallery: state.setShowMobileGallery,
      showMobileGalleryFog: state.showMobileGalleryFog,
      setShowMobileGalleryFog: state.setShowMobileGalleryFog,
      setCardSize: state.setCardSize
    }))
  );

  const [wasZoomed, setWasZoomed] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);
  const centeredCardIndex = useCanvasStore(state => state.centeredCardIndex);

  useInitializeCards({ data });

  const { centerToCard, centerViewOnScreen } = useCanvasActions();

  const { handleLearnMore, handleGalleryClick } = useCardInteractions();

  const viewportSize = useViewportSize();

  const visibleCards = useVisibleCards({
    cardSize,
    basePattern,
    position,
    zoomLevel,
    viewportSize,
    showMobileGallery
  });

  useBackgroundDots({ backgroundRef, position, zoomLevel });

  const handleResetZoom = useCallback(() => {
    if (zoomLevel !== 1) {
      centerViewOnScreen();
      setWasZoomed(true);
    }
  }, [setWasZoomed, centerViewOnScreen, zoomLevel]);

  const { checkPrevious } = usePreviousCards(selectedCard);

  // Sync scroll/center position when switching modes
  useEffect(() => {
    if (window.innerWidth > MOBILE_BREAKPOINT || centeredCardIndex == null || cardSize.width === 0)
      return;
    if (showMobileGallery) {
      // Gallery mode: zoom out, no transition
      const col =
        centeredCardIndex % (basePattern.length > 0 ? Math.min(basePattern.length, 7) : 1);
      const row = Math.floor(
        centeredCardIndex / (basePattern.length > 0 ? Math.min(basePattern.length, 7) : 1)
      );
      const x = col * (cardSize.width + cardSize.gap);
      const y = row * (cardSize.height + cardSize.gap);
      centerToCard(x, y, 0.6, false);
    } else {
      // Single-column: zoom in, no transition
      const y = centeredCardIndex * (cardSize.height + cardSize.gap);
      centerToCard(0, y, 1, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMobileGallery]);

  const handleMobileGalleryFog = (show: boolean) => {
    setShowMobileGalleryFog(true);
    setTimeout(() => {
      setShowMobileGallery(show);
      setTimeout(() => {
        setShowMobileGalleryFog(false);
      }, 250);
    }, 250);
  };

  useEffect(() => {
    const descriptionElement = document.querySelector('[data-expanded-description]') as HTMLElement;
    const PADDING = 36;
    if (!descriptionElement) return;
    let width = 300;
    let height = 400;
    let gap = 100;

    if (window.innerWidth < 768) {
      width = Math.min(window.innerWidth * 0.8, 320);
      height = width * (4 / 3);
      gap = 65;
    }
    setCardSize({ width, height, gap });
    descriptionElement.style.width = `${width - 2 * PADDING}px`;
  }, [setCardSize]);

  return (
    <>
      <ExpandedCard showExpanded={showExpanded} />
      <div
        ref={containerRef}
        id="canvas-container"
        className="relative h-screen w-screen cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <LightFog />

        <MobileGalleryFog showFog={showMobileGalleryFog} />

        <BackgroundDots position={position} zoomLevel={zoomLevel} />

        {/* Desktop */}
        <ResetButton handleGalleryClick={handleGalleryClick} handleResetZoom={handleResetZoom} />

        {/* Mobile */}
        <GalleryButton
          handleShowGallery={() => {
            handleMobileGalleryFog(true);
          }}
          handleHideGallery={() => {
            handleMobileGalleryFog(false);
          }}
          handleGoBack={handleGalleryClick}
          showMobileGallery={showMobileGallery}
          showExpanded={showExpanded}
        />

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
