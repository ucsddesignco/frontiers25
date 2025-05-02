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
import { useContext } from 'react';
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
                  'bg-[#FFFFFFCC] bg-blend-hard-light backdrop-blur-sm': borderStyle === style
                }
              )}
            >
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
