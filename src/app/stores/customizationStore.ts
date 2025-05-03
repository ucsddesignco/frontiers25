import { create } from 'zustand';

export type BorderStyle = 'rectangular' | 'rounded' | 'beveled' | 'squircle';

export type FontFamily =
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

interface CustomizationProps {
  primary: string;
  accent: string;
  fontFamily: FontFamily;
  borderStyle: BorderStyle;
  validContrast: boolean;
}

export type CustomizationStore = ReturnType<typeof createCustomizationStore>;

export interface CustomizationState {
  // Card state
  primary: string;
  accent: string;
  fontFamily: FontFamily;
  borderStyle: BorderStyle;
  validContrast: boolean;

  // Card actions
  setPrimary: (primary: string) => void;
  setAccent: (accent: string) => void;
  setFontFamily: (fontFamily: FontFamily) => void;
  setBorderStyle: (borderStyle: BorderStyle) => void;
  setValidContrast: (validContrast: boolean) => void;
  initialize: (initialState: Partial<CustomizationProps>) => void;
}

export const createCustomizationStore = (initProps?: Partial<CustomizationProps>) => {
  const DEFAULT_PROPS: CustomizationProps = {
    primary: '',
    accent: '',
    fontFamily: 'Jaro',
    borderStyle: 'rounded',
    validContrast: false
  };

  return create<CustomizationState>((set, _get) => ({
    ...DEFAULT_PROPS,
    ...initProps,

    // Actions to update state
    setPrimary: primary => set({ primary }),
    setAccent: accent => set({ accent }),
    setFontFamily: fontFamily => set({ fontFamily }),
    setBorderStyle: borderStyle => set({ borderStyle }),
    setValidContrast: validContrast => set({ validContrast }),
    initialize: initialState => set(initialState)
  }));
};
