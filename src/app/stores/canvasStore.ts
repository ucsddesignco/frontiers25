import { createRef } from 'react';
import { create } from 'zustand';
import { CardType } from '../components/constants';
import { RefObject } from 'react';
import { VisibleCard } from '../hooks/useVisibleCards';

export interface CanvasState {
  // Card state
  cardSize: { width: number; height: number; gap: number };

  // Canvas state
  position: { x: number; y: number };
  zoomLevel: number;
  dragging: boolean;
  didDrag: boolean;

  // Refs
  containerRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  expandedCardRef: RefObject<HTMLDivElement | null>;

  selectedCard: string | null; // pattern index of the selected card
  expandedCard: VisibleCard | null;
  basePattern: CardType[];
  showExpanded: boolean;
  showMobileGallery: boolean;
  cardIsExpanding: boolean;
  isTransitionEnabled: boolean;

  showLightFog: boolean;
  showMiddleFog: boolean;
  showMobileGalleryFog: boolean;

  centeredCardIndex: number | null;
  setCenteredCardIndex: (index: number | null) => void;

  // Canvas actions
  setPosition: (position: { x: number; y: number }) => void;
  setZoomLevel: (level: number) => void;
  setDragging: (dragging: boolean) => void;
  setDidDrag: (didDrag: boolean) => void;
  setTransitionEnabled: (enabled: boolean) => void;

  setShowLightFog: (show: boolean) => void;
  setShowMiddleFog: (show: boolean) => void;
  setShowMobileGalleryFog: (show: boolean) => void;

  // Card actions
  setShowMobileGallery: (show: boolean) => void;
  setCardSize: (size: { width: number; height: number; gap: number }) => void;
  setSelectedCard: (cardKey: string | null) => void;
  setExpandedCard: (card: VisibleCard | null) => void;
  setBasePattern: (pattern: CardType[]) => void;
  setShowExpanded: (show: boolean) => void;
  setCardIsExpanding: (transitioning: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set, _get) => ({
  // Initial state
  cardSize: { width: 0, height: 0, gap: 0 },
  position: { x: 0, y: 0 },
  zoomLevel: 1,
  dragging: false,
  didDrag: false,
  showMobileGallery: false,
  isTransitionEnabled: false,
  centeredCardIndex: null,

  showLightFog: true,
  showMiddleFog: true,
  showMobileGalleryFog: false,

  // Refs
  containerRef: createRef<HTMLDivElement>(),
  gridRef: createRef<HTMLDivElement>(),
  expandedCardRef: createRef<HTMLDivElement>(),

  basePattern: [],
  selectedCard: null,
  expandedCard: null,
  showExpanded: false,
  cardIsExpanding: false,

  // Actions to update state
  setCenteredCardIndex: (index: number | null) => set({ centeredCardIndex: index }),
  setCardSize: cardSize => set({ cardSize }),
  setPosition: position => set({ position }),
  setZoomLevel: zoomLevel => set({ zoomLevel }),
  setDragging: dragging => set({ dragging }),
  setDidDrag: didDrag => set({ didDrag }),
  setShowLightFog: showLightFog => set({ showLightFog }),
  setShowMiddleFog: showMiddleFog => set({ showMiddleFog }),
  setShowMobileGalleryFog: showMobileGalleryFog => set({ showMobileGalleryFog }),

  setShowMobileGallery: showMobileGallery => set({ showMobileGallery }),
  setBasePattern: basePattern => set({ basePattern }),
  setSelectedCard: selectedCard => set({ selectedCard }),
  setExpandedCard: expandedCard => set({ expandedCard }),
  setCardIsExpanding: cardIsExpanding => set({ cardIsExpanding }),
  setShowExpanded: showExpanded => set({ showExpanded }),
  setTransitionEnabled: enabled => set({ isTransitionEnabled: enabled })
}));
