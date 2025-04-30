'use client';

import { BorderBeveled } from '@/app/assets/BorderIcons/BorderBeveled';
import { BorderRounded } from '@/app/assets/BorderIcons/BorderRounded';
import { BorderRectangular } from '@/app/assets/BorderIcons/BorderRectangular';
import { BorderSquircle } from '@/app/assets/BorderIcons/BorderSquircle';
import { borderStyle, useCustomizationStore } from '@/app/stores/customizationStore';

import { useShallow } from 'zustand/shallow';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';

export function BorderTab() {
  const { borderStyle, setBorderStyle } = useCustomizationStore(
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
    <div className="h-full w-full p-2">
      <RadioGroup
        value={borderStyle}
        onValueChange={value => setBorderStyle(value as borderStyle)}
        className="grid h-full w-full grid-cols-2 grid-rows-2"
      >
        {borderStyles.map(style => (
          <div key={style} className="flex h-full w-full">
            <RadioGroupItem value={style} id={`style-${style}`} className="hidden" />
            <Label
              htmlFor={`style-${style}`}
              className={clsx(
                'flex h-full w-full items-center justify-center rounded-lg border-2 transition-colors',
                {
                  'border-blue-600 bg-blue-100': borderStyle === style,
                  'border-gray-300 hover:border-blue-400': borderStyle !== style
                }
              )}
            >
              <div className="flex h-3/4 w-3/4 items-center justify-center">
                {icons[style as borderStyle]}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
