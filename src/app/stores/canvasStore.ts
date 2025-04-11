import { createRef } from 'react';
import { create } from 'zustand';
import { CardType } from '../components/constants';
import { RefObject } from 'react';
import { VisibleCard } from '../hooks/useVisibleCards';

export interface CanvasState {
  // Canvas state
  position: { x: number; y: number };
  zoomLevel: number;
  dragging: boolean;
  disableDragging: boolean;
  userHasInteracted: boolean;

  // Refs
  containerRef: RefObject<HTMLDivElement | null>;
  learnMoreRef: RefObject<HTMLButtonElement | null>;
  expandedCardRef: RefObject<HTMLDivElement | null>;

  openedCard: VisibleCard | null;
  basePattern: CardType[];
  isExpanded: boolean;
  cardIsTransitioning: boolean;
  showMiddleFog: boolean;
  showGalleryFog: boolean;

  // Canvas actions
  setPosition: (position: { x: number; y: number }) => void;
  setZoomLevel: (level: number) => void;
  setDragging: (dragging: boolean) => void;
  setDisableDragging: (disable: boolean) => void;
  setUserHasInteracted: (interacted: boolean) => void;
  setShowMiddleFog: (show: boolean) => void;
  setShowGalleryFog: (show: boolean) => void;

  // Card actions
  setOpenedCard: (card: VisibleCard | null) => void;
  setBasePattern: (pattern: CardType[]) => void;
  setIsExpanded: (show: boolean) => void;
  setCardIsTransitioning: (transitioning: boolean) => void;
  setExpandedCardRef: (ref: RefObject<HTMLDivElement>) => void;
}

export const useCanvasStore = create<CanvasState>((set, _get) => ({
  // Initial state
  position: { x: 0, y: 0 },
  zoomLevel: 1,
  dragging: false,
  disableDragging: false,
  userHasInteracted: false,
  showMiddleFog: true,
  showGalleryFog: true,

  // Refs
  containerRef: createRef<HTMLDivElement>(),
  learnMoreRef: createRef<HTMLButtonElement>(),
  expandedCardRef: createRef<HTMLDivElement>(),

  basePattern: [],
  openedCard: null,
  isExpanded: false,
  cardIsTransitioning: false,

  // Actions to update state
  setPosition: position => set({ position }),
  setShowMiddleFog: showMiddleFog => set({ showMiddleFog }),
  setShowGalleryFog: showGalleryFog => set({ showGalleryFog }),
  setZoomLevel: zoomLevel => set({ zoomLevel }),
  setDragging: dragging => set({ dragging }),
  setDisableDragging: disableDragging => set({ disableDragging }),
  setUserHasInteracted: userHasInteracted => set({ userHasInteracted }),

  setBasePattern: basePattern => set({ basePattern }),
  setOpenedCard: openedCard => set({ openedCard }),
  setCardIsTransitioning: cardIsTransitioning => set({ cardIsTransitioning }),
  setIsExpanded: isExpanded => set({ isExpanded }),
  setExpandedCardRef: expandedCardRef => set({ expandedCardRef })
}));
