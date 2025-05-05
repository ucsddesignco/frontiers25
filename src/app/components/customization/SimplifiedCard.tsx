import { useShallow } from 'zustand/shallow';
import type { FontFamily, BorderStyle } from '@/app/stores/customizationStore';
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
        className="duration-[0.2s] relative z-[0] h-[400px] w-[300px] transition-[transform,opacity] ease-out"
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
              {CardLogo}
              <div className="flex w-full justify-between pt-3">
                <div>
                  <p className="date w-fit transition-transform duration-card ease-in-out">
                    May 9-10
                  </p>
                  <p className="location w-fit transition-transform duration-card ease-in-out">
                    DIB 208
                  </p>
                </div>
                <p className="time hidden flex-col items-end md:flex">
                  <span className="time-1 block w-fit transition-transform duration-card ease-in-out">
                    by UCSD
                  </span>
                  <span className="time-2 block w-fit transition-transform duration-card ease-in-out">
                    Design Co
                  </span>
                </p>
                <p className="mobile-time flex h-fit w-fit flex-col items-end md:hidden">
                  <span className="mobile-time-1 block w-fit transition-transform duration-card ease-in-out md:flex">
                    by UCSD
                  </span>
                  <span className="mobile-time-2 block w-fit transition-transform duration-card ease-in-out md:flex">
                    Design Co
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="flex flex-col items-center">
                <span className="description-1 block w-fit transition-transform duration-card ease-in-out">
                  Create, test, & iterate on ideas
                </span>
                <span className="description-2 block w-fit transition-transform duration-card ease-in-out">
                  at our annual design-a-thon.
                </span>
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
