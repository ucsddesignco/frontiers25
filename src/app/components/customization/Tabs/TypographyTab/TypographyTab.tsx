'use client';
import './TypographyTab.scss';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCustomizationStore } from '@/app/stores/customizationStore';
import { useShallow } from 'zustand/shallow';
import type { fontFamily } from '@/app/stores/customizationStore';

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

export function TypographyTab() {
  const { fontFamily, setFontFamily } = useCustomizationStore(
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
    <div className="flex h-full flex-col">
      {/* Selected font stays fixed */}
      <div className="cursor-pointer items-center rounded-md border-t-2 py-2 hover:bg-muted">
        <div className="flex flex-1 cursor-pointer justify-between rounded-md p-2">
          <span className="text-lg">{fontFamily}</span>
          <span className="block h-8">{AllCardLogos[fontFamily]}</span>
        </div>
      </div>

      {/* Scrollable container for all other fonts */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        <RadioGroup value={fontFamily} onValueChange={value => setFontFamily(value as fontFamily)}>
          {Object.entries(AllCardLogos)
            .filter(([fontName]) => fontName !== fontFamily)
            .map(([fontName, logo]) => (
              <div
                key={fontName}
                className="flex cursor-pointer items-center rounded-md py-2 hover:bg-muted"
              >
                <RadioGroupItem value={fontName} id={`font-${fontName}`} className="hidden" />
                <Label
                  htmlFor={`font-${fontName}`}
                  className="flex flex-1 cursor-pointer justify-between rounded-md p-2"
                >
                  <span className="text-lg">{fontName}</span>
                  <span className="block h-8">{logo}</span>
                </Label>
              </div>
            ))}
        </RadioGroup>
      </div>
    </div>
  );
}
