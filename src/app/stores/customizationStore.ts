import { create } from 'zustand';

export type borderStyle = 'rectangular' | 'rounded' | 'beveled' | 'squircle';

export type fontFamily =
  | 'Jaro'
  | 'Bungee'
  | 'SF Pro'
  | 'Jersey 15'
  | 'Gotham Ultra'
  | 'Porkys'
  | 'Erica'
  | 'Calistoga'
  | 'Keania'
  | 'Adversal'
  | 'Rozha'
  | 'Aventena'
  | 'Ga Maamli'
  | 'Poetsen'
  | 'Silkscreen'
  | 'Hanalei'
  | 'Racing Sans'
  | 'Bonbon'
  | 'Workbench'
  | 'Nico Moji';

export interface CustomizationState {
  // Card state
  primary: string;
  accent: string;
  fontFamily: fontFamily;
  borderStyle: borderStyle;

  // Card actions
  setPrimary: (primary: string) => void;
  setAccent: (accent: string) => void;
  setFontFamily: (fontFamily: fontFamily) => void;
  setBorderStyle: (borderStyle: borderStyle) => void;
}

export const useCustomizationStore = create<CustomizationState>((set, _get) => ({
  // Initial state
  primary: '',
  accent: '',
  fontFamily: 'Jaro',
  borderStyle: 'rounded',

  // Actions to update state
  setPrimary: primary => set({ primary }),
  setAccent: accent => set({ accent }),
  setFontFamily: fontFamily => set({ fontFamily }),
  setBorderStyle: borderStyle => set({ borderStyle })
}));
