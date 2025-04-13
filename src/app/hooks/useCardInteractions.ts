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
    openedCard,
    cardIsExpanding,
    userHasInteracted,
    setOpenedCard,
    setCardIsExpanding,
    isExpanded,
    setIsExpanded,
    setDisableDragging,
    setUserHasInteracted,
    setShowMiddleFog,
    showGalleryFog,
    setShowGalleryFog,
    expandedCardRef
  } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      zoomLevel: state.zoomLevel,
      openedCard: state.openedCard,
      setOpenedCard: state.setOpenedCard,
      cardIsExpanding: state.cardIsExpanding,
      userHasInteracted: state.userHasInteracted,
      setCardIsExpanding: state.setCardIsExpanding,
      isExpanded: state.isExpanded,
      setIsExpanded: state.setIsExpanded,
      setDisableDragging: state.setDisableDragging,
      setUserHasInteracted: state.setUserHasInteracted,
      setShowMiddleFog: state.setShowMiddleFog,
      showGalleryFog: state.showGalleryFog,
      setShowGalleryFog: state.setShowGalleryFog,
      expandedCardRef: state.expandedCardRef
    }))
  );

  const handleLearnMore = useCallback(
    (card: VisibleCard) => {
      if (card.isFading || openedCard !== null || cardIsExpanding) return;
      if (!userHasInteracted) setShowMiddleFog(false);
      if (showGalleryFog) setShowGalleryFog(false);
      setOpenedCard(card);
      setDisableDragging(true);

      const clickedCard = document.getElementById(`card-container-${card.key}`);
      const cardContent = document.getElementById(`card-content-${card.key}`);
      const cardBg = document.getElementById(`card-bg-${card.key}`);
      const canvasGrid = document.getElementById('canvas-grid');

      if (!canvasGrid || !clickedCard || !cardBg || !cardContent) return;

      clickedCard.style.zIndex = '1';
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
          setIsExpanded(true);
          setCardIsExpanding(false);
        },
        expandedCard: expandedCardRef.current
      });
    },
    [
      openedCard,
      cardIsExpanding,
      userHasInteracted,
      setShowMiddleFog,
      showGalleryFog,
      setShowGalleryFog,
      setOpenedCard,
      setDisableDragging,
      zoomLevel,
      setCardIsExpanding,
      expandedCardRef,
      setIsExpanded
    ]
  );

  const handleGalleryClick = useCallback(() => {
    if (!userHasInteracted) setUserHasInteracted(true);
    if (openedCard === null || cardIsExpanding || !isExpanded) return;

    const clickedCard = document.getElementById(`card-container-${openedCard.key}`);
    const cardContent = document.getElementById(`card-content-${openedCard.key}`);
    const cardBg = document.getElementById(`card-bg-${openedCard.key}`);

    if (!clickedCard || !cardBg || !cardContent) return;

    if (!showGalleryFog) setShowGalleryFog(true);

    cardContent.style.transition = 'none';
    cardContent.style.opacity = '1';
    cardBg.style.transform = 'scale(1)';
    clickedCard.style.transform = '';

    setIsExpanded(false);

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
            clickedCard.style.zIndex = '0';
            setDisableDragging(false);
            setCardIsExpanding(false);
            setOpenedCard(null);
          },
          expandedCard: expandedCardRef.current
        });
      },
      expandedCard: expandedCardRef.current
    });
  }, [
    userHasInteracted,
    setUserHasInteracted,
    openedCard,
    cardIsExpanding,
    isExpanded,
    showGalleryFog,
    setShowGalleryFog,
    setIsExpanded,
    zoomLevel,
    setCardIsExpanding,
    expandedCardRef,
    setDisableDragging,
    setOpenedCard
  ]);

  return {
    handleLearnMore,
    handleGalleryClick
  };
}
