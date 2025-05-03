'use client';
import { MyColorSlider } from './MyColorSlider/MyColorSlider';
import { parseColor } from '@react-stately/color';
import { useContext, useState } from 'react';
import { Check, X } from 'lucide-react';
import { contrastRatio } from 'wcag-contrast-utils';

type selectedColor = 'primary' | 'accent';

import { useShallow } from 'zustand/shallow';
import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import { useStore } from 'zustand';

export function ColorTab() {
  const [selectedColor, setSelectedColor] = useState<selectedColor>('primary');

  const store = useContext(CustomizationContext);
  if (!store) throw new Error('Missing CustomizationContext');
  const { primary, accent, setPrimary, setAccent } = useStore(
    store,
    useShallow(state => ({
      primary: state.primary,
      accent: state.accent,
      setPrimary: state.setPrimary,
      setAccent: state.setAccent
    }))
  );

  const primaryHex = parseColor(primary).toString('hex');
  const accentHex = parseColor(accent).toString('hex');
  const contrast = contrastRatio(primaryHex, accentHex);

  const contrastIsGood = contrast >= 4.5;
  const primaryContrast = contrastRatio(primaryHex, '#000');
  const accentContrast = contrastRatio(accentHex, '#000');

  const primaryText = primaryContrast <= 7 ? 'white' : 'black';
  const accentText = accentContrast <= 7 ? 'white' : 'black';
  return (
    <div className="flex flex-col items-center space-y-8">
      <span className="flex w-full justify-between gap-3">
        <span
          onClick={() => {
            setSelectedColor('primary');
          }}
          className={`flex h-9 rounded-xl p-2 text-sm text-black transition-all duration-300 ${
            selectedColor === 'primary' ? 'w-[67.5%] justify-around' : 'w-[27.5%] justify-center'
          }`}
          style={{
            backgroundColor: primary,
            boxShadow: '0px -1px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px #FFF',
            color: primaryText
          }}
        >
          <p>Primary</p>

          <p
            className={`overflow-hidden transition-all duration-300 ${
              selectedColor === 'primary' ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            {parseColor(primary).toString('hex')}
          </p>
        </span>
        <span
          onClick={() => {
            setSelectedColor('accent');
          }}
          className={`flex h-9 rounded-xl p-2 text-sm text-black transition-all duration-300 ${
            selectedColor === 'accent' ? 'w-[67.5%] justify-around' : 'w-[27.5%] justify-center'
          }`}
          style={{
            backgroundColor: accent,
            boxShadow: '0px -1px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px #FFF',
            color: accentText
          }}
        >
          <p>Accent</p>
          <p
            className={`overflow-hidden transition-all duration-300 ${
              selectedColor === 'accent' ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
            }`}
          >
            {parseColor(accent).toString('hex')}
          </p>
        </span>
      </span>
      {selectedColor === 'primary' ? (
        <div className="flex w-full flex-col gap-8">
          <MyColorSlider
            className="w-full"
            channel="hue"
            label="hue"
            value={primary}
            onChange={value => setPrimary(value.toString('hsl'))}
          />
          <MyColorSlider
            className="w-full"
            channel="saturation"
            label="saturation"
            value={primary}
            onChange={value => setPrimary(value.toString('hsl'))}
          />
          <MyColorSlider
            className="w-full"
            channel="lightness"
            label="lightness"
            value={primary}
            onChange={value => setPrimary(value.toString('hsl'))}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-8">
          <MyColorSlider
            className="w-full"
            channel="hue"
            label="hue"
            value={accent}
            onChange={value => setAccent(value.toString('hsl'))}
          />
          <MyColorSlider
            className="w-full"
            channel="saturation"
            label="saturation"
            value={accent}
            onChange={value => setAccent(value.toString('hsl'))}
          />
          <MyColorSlider
            className="w-full"
            channel="lightness"
            label="lightness"
            value={accent}
            onChange={value => setAccent(value.toString('hsl'))}
          />
        </div>
      )}
      <span className="flex w-full items-center justify-between">
        <p className="text-2xl">Contrast</p>
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5 uppercase"
          style={{
            backgroundColor: contrastIsGood ? '#BEFCB6' : '#FFB6B6',
            color: contrastIsGood ? '#078D00' : '#CF1414',
            boxShadow: '0px -1px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px #FFF'
          }}
        >
          {contrastIsGood ? (
            <>
              <Check className="h-5 w-5 stroke-[2px]" />
              PASS
            </>
          ) : (
            <>
              <X className="h-5 w-5 stroke-[2px]" />
              FAIL
            </>
          )}
        </span>
      </span>
    </div>
  );
}
