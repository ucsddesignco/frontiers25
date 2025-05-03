import { useShallow } from 'zustand/shallow';
import type { FontFamily, BorderStyle } from '@/app/stores/customizationStore';
import { Rectangular, Rounded, Beveled, Squircle } from '@/app/assets/CardSvgs';
import { useContext } from 'react';
import { useStore } from 'zustand';
import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import { getCardLogo } from '@/app/util/getCardLogo';
import { generateColorVariations } from '@/app/util/colorUtils';
import { getCardBorders } from '@/app/util/getCardBorders';

export interface SimplifiedCard {
  id: string;
  primary: string;
  accent: string;
  fontFamily: FontFamily;
  borderStyle: BorderStyle;
}

export interface CardSvgProps {
  bgColor: string;
  borderColor: string;
}

export interface CardLogoProps {
  accent?: string;
}

interface SimplifiedCardProps {
  id: string;
}

const SimplifiedCard: React.FC<SimplifiedCardProps> = ({ id }) => {
  const store = useContext(CustomizationContext);
  if (!store) throw new Error('Missing CustomizationContext');

  const { primary, accent, fontFamily, borderStyle } = useStore(
    store,
    useShallow(state => ({
      primary: state.primary,
      accent: state.accent,
      fontFamily: state.fontFamily,
      borderStyle: state.borderStyle
    }))
  );

  const { borderColor, buttonColor } = generateColorVariations(primary, accent);

  const CardBorderSVG = getCardBorders({
    bgColor: primary,
    borderColor,
    borderStyle
  });

  const CardLogo = getCardLogo({
    fontFamily,
    accent
  });

  return (
    <>
      <div
        id={`card-container-${id}`}
        className="duration-[0.2s] relative z-[0] h-full transition-[transform,opacity] ease-out"
      >
        <div className="relative h-full">
          <div
            id={`card-bg-${id}`}
            className={`absolute transition-transform duration-card ease-in-out`}
          >
            {CardBorderSVG}
          </div>

          <div
            id={`card-content-${id}`}
            style={{ color: accent }}
            className={`relative flex h-full flex-col items-center justify-between p-[36px] text-[#530B67] transition-transform duration-card ease-in-out`}
          >
            <div className="w-full">
              <div>{CardLogo}</div>
              <p
                style={{ color: primary }}
                className="title relative z-[1] block w-fit transition-transform duration-card ease-in-out"
              >
                Design Sprint
              </p>
              <div className="flex w-full justify-between pt-3">
                <div>
                  <p className="date w-fit transition-transform duration-card ease-in-out">
                    Wed May 8
                  </p>
                  <p className="location w-fit transition-transform duration-card ease-in-out">
                    DIB Room 208
                  </p>
                </div>
                <p className="time hidden h-fit w-fit transition-transform duration-card ease-in-out md:block">
                  9am-5pm
                </p>
                <p className="mobile-time h-fit w-fit transition-transform duration-card ease-in-out md:hidden">
                  9am-5pm
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="description transition-transform duration-card ease-in-out">
                A 2-day sprint where UCSD designers ideate and iterate.
              </p>
              <div className="relative flex w-full justify-center">
                <button
                  style={{
                    backgroundColor: buttonColor,
                    transitionDuration: '300ms,200ms'
                  }}
                  className="learn-more w-full cursor-pointer rounded-full p-2 transition-[transform,opacity] ease-in-out"
                >
                  Learn More
                </button>
              </div>
              <button
                style={{ color: buttonColor }}
                className="apply relative cursor-pointer rounded-full p-2 transition-transform duration-card ease-in-out"
              >
                <span
                  style={{ backgroundColor: accent }}
                  className={`apply-bg absolute inset-0 z-[0] inline-block h-full w-full rounded-full transition-[transform,width,height] duration-card ease-in-out`}
                ></span>
                <p
                  style={{ color: primary }}
                  className="apply-text relative z-[1] mx-auto block w-fit transition-transform duration-card ease-in-out"
                >
                  Apply
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimplifiedCard;
