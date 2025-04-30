'use client';
import './TypographyTab.scss';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import { useCustomizationStore } from '@/app/stores/customizationStore';
import { useShallow } from 'zustand/shallow';
import type { fontFamily } from '@/app/stores/customizationStore';

export function TypographyTab() {
  const { fontFamily, setFontFamily } = useCustomizationStore(
    useShallow(state => ({
      fontFamily: state.fontFamily,
      setFontFamily: state.setFontFamily
    }))
  );

  const fonts = [
    'Jaro',
    'Bungee',
    'SF Pro',
    'Jersey 15',
    'Gotham Ultra',
    'Porkys',
    'Erica',
    'Calistoga',
    'Keania',
    'Adversal',
    'Rozha',
    'Aventena',
    'Ga Maamli',
    'Poetsen',
    'Silkscreen',
    'Hanalei',
    'Racing Sans',
    'Bonbon',
    'Workbench',
    'Nico Moji'
  ];

  return (
    <div className="space-y-6 overflow-y-auto">
      <RadioGroup
        value={fontFamily}
        onValueChange={value => setFontFamily(value as fontFamily)}
        className="mt-3"
      >
        {fonts.map(font => (
          <div
            key={font}
            className="glass-button flex cursor-pointer items-center rounded-md border-t-2 py-2 hover:bg-muted"
          >
            <div className="color-overlay" />
            <div className="blur-background bg-[rgba(255,255,255,0.80)]" />
            <div className="top-highlight" />
            <RadioGroupItem value={font} id={`font-${font}`} className="hidden" />
            <Label
              htmlFor={`font-${font}`}
              className="flex flex-1 cursor-pointer justify-between rounded-md p-2"
              style={{ fontFamily: font }}
            >
              <span className="text-lg">DF 25</span>
              {fontFamily === font && <Check />}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
