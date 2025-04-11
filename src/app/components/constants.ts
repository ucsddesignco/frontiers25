export const GRID_COLUMNS = 5;
export const GRID_ROWS = 5;
export const CARD_WIDTH = 300; // px
export const CARD_HEIGHT = 400; // px
export const MIN_ZOOM = 0.45;
export const MAX_ZOOM = 2.4;
export const CARD_GAP = 100; // px
export const DOT_BACKGROUND_SIZE = 122; // px
export const APPLY_LINK = 'https://ucsddesign.co/';

export type CardType = {
  id: string;
  primary: string;
  accent: string;
  author: string;
  lastUpdated: string;
  borderColor: string;
  buttonColor: string;
  scrollbarColor: string;
};

export type TransformProperties = {
  translateX: number;
  translateY: number;
  scaleX: number;
  scaleY: number;
  width: number;
  height: number;
  initialDim?: DOMRect;
};
