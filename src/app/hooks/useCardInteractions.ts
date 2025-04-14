import { useCallback } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { handleCardElementTransition } from '../util/handleCardElementTransition';
import { CanvasState } from '../stores/canvasStore';
import { useShallow } from 'zustand/shallow';
import { VisibleCard } from './useVisibleCards';

// Hook for card interactions
export function useCardInteractions() {
  const {
    zoomLevel,
    expandedCard,
    cardIsExpanding,
    setExpandedCard,
    setCardIsExpanding,
    showExpanded,
    setShowExpanded,
    showLightFog,
    setShowLightFog,
    expandedCardRef
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      zoomLevel: state.zoomLevel,
      expandedCard: state.expandedCard,
      setExpandedCard: state.setExpandedCard,
      cardIsExpanding: state.cardIsExpanding,
      setCardIsExpanding: state.setCardIsExpanding,
      showExpanded: state.showExpanded,
      setShowExpanded: state.setShowExpanded,
      showLightFog: state.showLightFog,
      setShowLightFog: state.setShowLightFog,
      expandedCardRef: state.expandedCardRef
    }))
  );

  const handleLearnMore = useCallback(
    (card: VisibleCard) => {
      if (card.isFading || expandedCard !== null || cardIsExpanding) return;
      if (showLightFog) setShowLightFog(false);

      const clickedCard = document.getElementById(`card-container-${card.key}`);
      const cardContent = document.getElementById(`card-content-${card.key}`);
      const cardBg = document.getElementById(`card-bg-${card.key}`);
      const canvasGrid = document.getElementById('canvas-grid');

      if (!canvasGrid || !clickedCard || !cardBg || !cardContent) return;

      setExpandedCard(card);

      clickedCard.style.zIndex = '3';
      const hoverScale = 1.1;
      // Maintain hover scale while transitioning
      clickedCard.style.transform = `scale(${hoverScale})`;
      clickedCard.style.transformOrigin = 'center center';
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const cardRect = cardBg.getBoundingClientRect();

      let parentScale =
        parseFloat(window.getComputedStyle(clickedCard).transform.split(',')[3]) || 1;

      const initialScale = parentScale;

      if (zoomLevel !== 1) {
        parentScale = zoomLevel * hoverScale;
      }

      // Calculate the scale needed to fill the screen while maintaining aspect ratio
      const scaleX = (viewportWidth * initialScale) / cardRect.width;
      const scaleY = (viewportHeight * initialScale) / cardRect.height;
      const scale = Math.max(scaleX, scaleY);

      // Calculate the translation needed to center the element
      const viewportCenterX = viewportWidth / 2;
      const viewportCenterY = viewportHeight / 2;
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const translateX = (viewportCenterX - cardCenterX) / zoomLevel;
      const translateY = (viewportCenterY - cardCenterY) / zoomLevel;

      cardBg.style.transition = `transform var(--card-duration) ease-in-out`;

      // Add 0.2 to account for border and apply translation
      cardBg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale + 0.2})`;
      cardBg.style.transformOrigin = 'center center';

      handleCardElementTransition({
        type: 'open',
        clickedCard,
        parentScale,
        setCardIsExpanding,
        onTransitionEnd: () => {
          setShowExpanded(true);
          setCardIsExpanding(false);
        },
        expandedCard: expandedCardRef.current
      });
    },
    [
      expandedCard,
      cardIsExpanding,
      showLightFog,
      setShowLightFog,
      setExpandedCard,
      zoomLevel,
      setCardIsExpanding,
      expandedCardRef,
      setShowExpanded
    ]
  );

  const handleGalleryClick = useCallback(() => {
    if (expandedCard === null || cardIsExpanding || !showExpanded) return;

    const clickedCard = document.getElementById(`card-container-${expandedCard.key}`);
    const cardContent = document.getElementById(`card-content-${expandedCard.key}`);
    const cardBg = document.getElementById(`card-bg-${expandedCard.key}`);

    if (!clickedCard || !cardBg || !cardContent) return;

    if (!showLightFog) setShowLightFog(true);

    cardContent.style.transition = 'none';
    cardContent.style.opacity = '1';
    cardBg.style.transform = 'scale(1)';
    clickedCard.style.transform = '';

    setShowExpanded(false);

    let parentScale = parseFloat(window.getComputedStyle(clickedCard).transform.split(',')[3]) || 1;

    if (zoomLevel !== 1) {
      parentScale = zoomLevel;
    }

    // Reposition cardContent to be same as expandedCard in case user scrolled
    handleCardElementTransition({
      type: 'reposition',
      clickedCard,
      parentScale: parentScale,
      setCardIsExpanding,
      onTransitionEnd: () => {
        handleCardElementTransition({
          type: 'close',
          clickedCard,
          parentScale: parentScale,
          setCardIsExpanding,
          onTransitionEnd: () => {
            clickedCard.style.zIndex = '';
            setCardIsExpanding(false);
            setExpandedCard(null);
          },
          expandedCard: expandedCardRef.current
        });
      },
      expandedCard: expandedCardRef.current
    });
  }, [
    expandedCard,
    cardIsExpanding,
    showExpanded,
    showLightFog,
    setShowLightFog,
    setShowExpanded,
    zoomLevel,
    setCardIsExpanding,
    expandedCardRef,
    setExpandedCard
  ]);

  return {
    handleLearnMore,
    handleGalleryClick
  };
}
