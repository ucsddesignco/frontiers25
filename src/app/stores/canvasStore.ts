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
  didDrag: boolean;

  // Refs
  containerRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  expandedCardRef: RefObject<HTMLDivElement | null>;

  openedCard: VisibleCard | null;
  basePattern: CardType[];
  isExpanded: boolean;
  cardIsExpanding: boolean;
  showMiddleFog: boolean;
  showGalleryFog: boolean;
  isTransitionEnabled: boolean;

  // Canvas actions
  setPosition: (position: { x: number; y: number }) => void;
  setZoomLevel: (level: number) => void;
  setDragging: (dragging: boolean) => void;
  setDisableDragging: (disable: boolean) => void;
  setUserHasInteracted: (interacted: boolean) => void;
  setDidDrag: (didDrag: boolean) => void;
  setShowMiddleFog: (show: boolean) => void;
  setShowGalleryFog: (show: boolean) => void;
  setTransitionEnabled: (enabled: boolean) => void;

  // Card actions
  setOpenedCard: (card: VisibleCard | null) => void;
  setBasePattern: (pattern: CardType[]) => void;
  setIsExpanded: (show: boolean) => void;
  setCardIsExpanding: (transitioning: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set, _get) => ({
  // Initial state
  position: { x: 0, y: 0 },
  zoomLevel: 1,
  dragging: false,
  disableDragging: false,
  userHasInteracted: false,
  didDrag: false,
  showMiddleFog: true,
  showGalleryFog: true,
  isTransitionEnabled: false,

  // Refs
  containerRef: createRef<HTMLDivElement>(),
  gridRef: createRef<HTMLDivElement>(),
  expandedCardRef: createRef<HTMLDivElement>(),

  basePattern: [],
  openedCard: null,
  isExpanded: false,
  cardIsExpanding: false,

  // Actions to update state
  setPosition: position => set({ position }),
  setShowMiddleFog: showMiddleFog => set({ showMiddleFog }),
  setShowGalleryFog: showGalleryFog => set({ showGalleryFog }),
  setZoomLevel: zoomLevel => set({ zoomLevel }),
  setDragging: dragging => set({ dragging }),
  setDisableDragging: disableDragging => set({ disableDragging }),
  setUserHasInteracted: userHasInteracted => set({ userHasInteracted }),
  setDidDrag: didDrag => set({ didDrag }),

  setBasePattern: basePattern => set({ basePattern }),
  setOpenedCard: openedCard => set({ openedCard }),
  setCardIsExpanding: cardIsExpanding => set({ cardIsExpanding }),
  setIsExpanded: isExpanded => set({ isExpanded }),
  setTransitionEnabled: enabled => set({ isTransitionEnabled: enabled })
}));
