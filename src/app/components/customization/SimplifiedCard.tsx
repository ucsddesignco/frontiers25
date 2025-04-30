import type { borderStyle } from '@/app/stores/customizationStore';
import { parseColor } from 'react-stately';
import { useCustomizationStore } from '@/app/stores/customizationStore';
import { useShallow } from 'zustand/shallow';
import type { fontFamily } from '@/app/stores/customizationStore';
import { Rectangular, Rounded, Beveled, Squircle } from '@/app/assets/CardSvgs';
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

export interface SimplifiedCard {
  id: string;
  primary: string;
  accent: string;
  fontFamily: fontFamily;
  borderStyle: borderStyle;
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
  const { primary, accent, fontFamily, borderStyle } = useCustomizationStore(
    useShallow(state => ({
      primary: state.primary,
      accent: state.accent,
      fontFamily: state.fontFamily,
      borderStyle: state.borderStyle
    }))
  );
  const primaryColorParsed = parseColor(primary);
  const primaryColorLightAccent = primaryColorParsed
    .withChannelValue(
      'lightness',
      Math.min(primaryColorParsed.getChannelValue('lightness') + 5, 100)
    )
    .toString('hsl');
  const primaryColorDarkAccent = primaryColorParsed
    .withChannelValue('lightness', Math.max(primaryColorParsed.getChannelValue('lightness') - 5, 0))
    .toString('hsl');

  const CardSvgs = {
    rectangular: <Rectangular bgColor={primary} borderColor={primaryColorDarkAccent} />,
    rounded: <Rounded bgColor={primary} borderColor={primaryColorDarkAccent} />,
    beveled: <Beveled bgColor={primary} borderColor={primaryColorDarkAccent} />,
    squircle: <Squircle bgColor={primary} borderColor={primaryColorDarkAccent} />
  };

  const CardLogos = {
    Jaro: <Jaro accent={accent} />,
    Bungee: <Bungee accent={accent} />,
    'SF Pro': <SFPro accent={accent} />,
    'Jersey 15': <Jersey15 accent={accent} />,
    'Gotham Ultra': <GothamUltra accent={accent} />,
    Porkys: <Porkys accent={accent} />,
    Erica: <Erica accent={accent} />,
    Calistoga: <Calistoga accent={accent} />,
    Keania: <Keania accent={accent} />,
    Adversal: <Adversal accent={accent} />,
    Rozha: <Rozha accent={accent} />,
    Aventena: <Aventena accent={accent} />,
    'Ga Maamli': <GaMaamli accent={accent} />,
    Poetsen: <Poetsen accent={accent} />,
    Silkscreen: <Silkscreen accent={accent} />,
    Hanalei: <Hanalei accent={accent} />,
    'Racing Sans': <RacingSans accent={accent} />,
    Bonbon: <Bonbon accent={accent} />,
    Workbench: <Workbench accent={accent} />,
    'Nico Moji': <NicoMoji accent={accent} />
  };

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
            {CardSvgs[borderStyle as borderStyle]}
          </div>

          <div
            id={`card-content-${id}`}
            style={{ color: accent }}
            className={`relative flex h-full flex-col items-center justify-between p-[36px] text-[#530B67] transition-transform duration-card ease-in-out`}
          >
            <div className="w-full">
              <div className="h-[80px] w-[220px]">{CardLogos[fontFamily as fontFamily]}</div>
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
                <p className="time hidden h-fit w-fit transition-transform duration-card ease-in-out lg:block">
                  9am-5pm
                </p>
                <p className="mobile-time h-fit w-fit transition-transform duration-card ease-in-out lg:hidden">
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
                  style={{ backgroundColor: primaryColorLightAccent }}
                  className="learn-more duration-[300ms,200ms] w-full cursor-pointer rounded-full p-2 transition-[transform,opacity] ease-in-out"
                >
                  Learn More
                </button>
              </div>
              <button
                style={{ color: primaryColorLightAccent }}
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
