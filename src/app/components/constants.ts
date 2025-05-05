import type { FontFamily, BorderStyle } from '../stores/customizationStore';

export const GRID_COLUMNS = 7;
export const GRID_ROWS = 7;
export const CARD_WIDTH = 300; // px
export const CARD_HEIGHT = 400; // px
export const MIN_ZOOM = 0.55;
export const MAX_ZOOM = 1;
export const CARD_GAP = 100; // px
export const DOT_BACKGROUND_SIZE = 100; // px
export const APPLY_LINK = 'https://forms.gle/Pmzs6gtQGgcrv5nX7';
export const DRAG_THRESHOLD = 8; // px
export const MIDDLE_CARD_INDEX = Math.floor((GRID_COLUMNS * GRID_ROWS) / 2);
export const MOBILE_BREAKPOINT = 768; // px

export type CardType = {
  _id: string;
  user: string;
  primary: string;
  accent: string;
  author: string;
  lastUpdated: string;
  borderColor: string;
  buttonColor: string;
  fontFamily: FontFamily;
  borderStyle: BorderStyle;
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

export const BUTTON_STYLES: { [key in BorderStyle]: string } = {
  squircle: 'rounded-full',
  rounded: 'rounded-[4px]',
  rectangular: 'rounded-0',
  beveled: ''
};
