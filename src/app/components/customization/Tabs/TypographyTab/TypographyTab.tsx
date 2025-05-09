'use client';
import './TypographyTab.scss';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useShallow } from 'zustand/shallow';
import type { FontFamily } from '@/app/stores/customizationStore';

import {
  Jaro,
  Bungee,
  SFPro,
  Jersey15,
  GothamUltra,
  Porkys,
  Erica,
  Calistoga,
  Keania,
  Adversal,
  Rozha,
  Aventena,
  GaMaamli,
  Poetsen,
  Silkscreen,
  Hanalei,
  RacingSans,
  Bonbon,
  Workbench,
  NicoMoji
} from '@/app/assets/DF25Logos';
import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import { CSSProperties, useContext } from 'react';
import { useStore } from 'zustand';

export function TypographyTab() {
  const store = useContext(CustomizationContext);
  if (!store) throw new Error('Missing CustomizationContext');
  const { fontFamily, setFontFamily } = useStore(
    store,
    useShallow(state => ({
      fontFamily: state.fontFamily,
      setFontFamily: state.setFontFamily
    }))
  );

  const AllCardLogos = {
    Jaro: <Jaro />,
    Bungee: <Bungee />,
    'SF Pro': <SFPro />,
    'Jersey 15': <Jersey15 />,
    'Gotham Ultra': <GothamUltra />,
    Porkys: <Porkys />,
    Erica: <Erica />,
    Calistoga: <Calistoga />,
    Keania: <Keania />,
    Adversal: <Adversal />,
    Rozha: <Rozha />,
    Aventena: <Aventena />,
    'Ga Maamli': <GaMaamli />,
    Poetsen: <Poetsen />,
    Silkscreen: <Silkscreen />,
    Hanalei: <Hanalei />,
    'Racing Sans': <RacingSans />,
    Bonbon: <Bonbon />,
    Workbench: <Workbench />,
    'Nico Moji': <NicoMoji />
  };

  return (
    <div className="flex h-full flex-col px-4">
      {/* Selected font stays fixed */}
      <div
        style={
          {
            '--border-radius': '12px',
            '--gradient-color': '#D8D7D9',
            '--text-shadow-color': '#FFFF'
          } as CSSProperties
        }
        className="glass-button z-0 cursor-pointer items-center px-4 py-2"
      >
        <div className="color-overlay pointer-events-none"></div>
        <div className={`blur-background pointer-events-none bg-[rgba(255,255,255,0.80)]`}></div>
        <div className="top-highlight pointer-events-none"></div>
        <div className="0 flex flex-1 cursor-pointer justify-between rounded-md p-2">
          <span className="text-lg">{fontFamily}</span>
          <span className="block w-[88px]">{AllCardLogos[fontFamily]}</span>
        </div>
      </div>

      {/* Scrollable container for all other fonts */}
      <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto">
        <RadioGroup value={fontFamily} onValueChange={value => setFontFamily(value as FontFamily)}>
          {Object.entries(AllCardLogos)
            .filter(([fontName]) => fontName !== fontFamily)
            .map(([fontName, logo]) => (
              <div
                key={fontName}
                className="flex cursor-pointer items-center rounded-md px-4 py-2 hover:bg-muted"
              >
                <RadioGroupItem value={fontName} id={`font-${fontName}`} className="hidden" />
                <Label
                  htmlFor={`font-${fontName}`}
                  className="flex flex-1 cursor-pointer justify-between rounded-md p-2"
                >
                  <span className="text-lg">{fontName}</span>
                  <span className="block w-[88px]">{logo}</span>
                </Label>
              </div>
            ))}
        </RadioGroup>
      </div>
    </div>
  );
}
