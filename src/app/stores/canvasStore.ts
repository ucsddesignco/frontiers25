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
  didDrag: boolean;

  // Refs
  containerRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  expandedCardRef: RefObject<HTMLDivElement | null>;

  selectedCard: number | null; // pattern index of the selected card
  expandedCard: VisibleCard | null;
  basePattern: CardType[];
  showExpanded: boolean;
  cardIsExpanding: boolean;
  showMiddleFog: boolean;
  showLightFog: boolean;
  isTransitionEnabled: boolean;

  // Canvas actions
  setPosition: (position: { x: number; y: number }) => void;
  setZoomLevel: (level: number) => void;
  setDragging: (dragging: boolean) => void;
  setDidDrag: (didDrag: boolean) => void;
  setShowMiddleFog: (show: boolean) => void;
  setShowLightFog: (show: boolean) => void;
  setTransitionEnabled: (enabled: boolean) => void;

  // Card actions
  setSelectedCard: (cardKey: number | null) => void;
  setExpandedCard: (card: VisibleCard | null) => void;
  setBasePattern: (pattern: CardType[]) => void;
  setShowExpanded: (show: boolean) => void;
  setCardIsExpanding: (transitioning: boolean) => void;
}

export const useCanvasStore = create<CanvasState>((set, _get) => ({
  // Initial state
  position: { x: 0, y: 0 },
  zoomLevel: 1,
  dragging: false,
  didDrag: false,
  showMiddleFog: true,
  showLightFog: true,
  isTransitionEnabled: false,

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
  setPosition: position => set({ position }),
  setShowMiddleFog: showMiddleFog => set({ showMiddleFog }),
  setShowLightFog: showLightFog => set({ showLightFog }),
  setZoomLevel: zoomLevel => set({ zoomLevel }),
  setDragging: dragging => set({ dragging }),
  setDidDrag: didDrag => set({ didDrag }),

  setBasePattern: basePattern => set({ basePattern }),
  setSelectedCard: selectedCard => set({ selectedCard }),
  setExpandedCard: expandedCard => set({ expandedCard }),
  setCardIsExpanding: cardIsExpanding => set({ cardIsExpanding }),
  setShowExpanded: showExpanded => set({ showExpanded }),
  setTransitionEnabled: enabled => set({ isTransitionEnabled: enabled })
}));
