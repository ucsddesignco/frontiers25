'use client';

import {
  BorderRectangular,
  BorderRounded,
  BorderBeveled,
  BorderSquircle
} from '@/app/assets/BorderIcons';
import { BorderStyle } from '@/app/stores/customizationStore';

import { useShallow } from 'zustand/shallow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { CSSProperties, useContext } from 'react';
import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import { useStore } from 'zustand';

export function BorderTab() {
  const store = useContext(CustomizationContext);
  if (!store) throw new Error('Missing CustomizationContext');
  const { borderStyle, setBorderStyle } = useStore(
    store,
    useShallow(state => ({
      borderStyle: state.borderStyle,
      setBorderStyle: state.setBorderStyle
    }))
  );

  const borderStyles = ['rectangular', 'rounded', 'beveled', 'squircle'];

  const icons = {
    rectangular: <BorderRectangular />,
    rounded: <BorderRounded />,
    beveled: <BorderBeveled />,
    squircle: <BorderSquircle />
  };

  return (
    <div className="h-full w-full">
      <RadioGroup
        value={borderStyle}
        onValueChange={value => setBorderStyle(value as BorderStyle)}
        className="grid h-full w-full grid-cols-2 grid-rows-2"
      >
        {borderStyles.map(style => (
          <div key={style} className="flex h-full w-full">
            <RadioGroupItem value={style} id={`style-${style}`} className="hidden" />
            <Label
              htmlFor={`style-${style}`}
              className={clsx(
                'flex h-full w-full cursor-pointer items-center justify-center rounded-xl transition-colors',
                {
                  'glass-button bg-[#1A1622]/3 z-0': borderStyle === style
                }
              )}
              style={
                borderStyle === style
                  ? ({
                      '--border-radius': '12px',
                      '--gradient-color': '#D8D7D9'
                    } as CSSProperties)
                  : {}
              }
            >
              {borderStyle === style && (
                <>
                  <div className="color-overlay pointer-events-none"></div>
                  <div
                    className={`blur-background pointer-events-none bg-[rgba(255,255,255,0.80)]`}
                  ></div>
                  <div className="top-highlight pointer-events-none"></div>
                </>
              )}
              <div className="flex h-3/4 w-3/4 items-center justify-center">
                {icons[style as BorderStyle]}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
