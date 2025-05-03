import React from 'react';
import { VisibleCard } from '../hooks/useVisibleCards';
import { APPLY_LINK } from './constants';
import { getCardLogo } from '../util/getCardLogo';
import { getCardBorders } from '../util/getCardBorders';

interface CardProps {
  card: VisibleCard;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLearnMore: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const NAV_BUTTONS = [
  { id: 'faq', label: 'FAQ' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'judges', label: 'Judges' }
];

const Card: React.FC<CardProps> = ({ card, onClick, onMouseDown, onLearnMore, className = '' }) => {
  // Calculate opacity for fading cards
  const opacity = card.isFading
    ? Math.max(0, 1 - (Date.now() - (card.fadeStartTime || 0)) / 300)
    : 1;

  const CardLogo = getCardLogo({
    fontFamily: card.fontFamily,
    accent: card.accent
  });

  const CardBorderSVG = getCardBorders({
    bgColor: card.primary,
    borderColor: card.borderColor,
    borderStyle: card.borderStyle
  });

  return (
    <>
      <div
        id={`card-container-${card.key}`}
        onClick={onClick}
        onMouseDown={onMouseDown}
        className={`${className} duration-[0.2s] relative z-[0] h-full cursor-pointer transition-[transform,opacity] ease-out`}
        style={{ opacity }}
      >
        <div className="relative h-full">
          <div
            id={`card-bg-${card.key}`}
            className="absolute transition-transform duration-card ease-in-out"
          >
            {CardBorderSVG}
          </div>
          <div
            id={`card-content-${card.key}`}
            style={{ color: card.accent }}
            className={`relative flex h-full flex-col items-center justify-between p-[36px] transition-transform duration-card ease-in-out`}
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
                  onClick={onLearnMore}
                  style={{ backgroundColor: card.buttonColor, transitionDuration: '300ms,200ms' }}
                  className="learn-more w-full cursor-pointer rounded-full p-2 transition-[transform,opacity] ease-in-out"
                >
                  Learn More
                </button>

                {NAV_BUTTONS.map(({ id, label }) => (
                  <button
                    key={'card-button-' + id}
                    className="pointer-events-none absolute cursor-pointer rounded-full px-6 py-2 opacity-0 md:opacity-100"
                  >
                    <span
                      style={{ backgroundColor: card.buttonColor, outlineColor: card.accent }}
                      className={`${id}-bg absolute inset-0 z-[0] inline-block h-full w-full rounded-full opacity-0 outline-dashed outline-[2px]`}
                    ></span>
                    <span
                      className={`${id}-text inline-block opacity-0 transition-[transform,opacity] duration-card-half ease-in-out`}
                    >
                      {label}
                    </span>
                  </button>
                ))}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  window.open(APPLY_LINK, '_blank');
                }}
                style={{ color: card.buttonColor }}
                className="apply relative cursor-pointer rounded-full p-2 transition-transform duration-card ease-in-out"
              >
                <span
                  style={{ backgroundColor: card.accent }}
                  className={`apply-bg absolute inset-0 z-[0] inline-block h-full w-full rounded-full transition-[transform,width,height] duration-card ease-in-out`}
                ></span>
                <p
                  style={{ color: card.primary }}
                  className="apply-text relative z-[1] mx-auto block w-fit transition-transform duration-card ease-in-out"
                >
                  Apply
                </p>
              </button>
            </div>
          </div>
        </div>
        <p className="pt-2 text-center text-sm text-[#666666]">
          Made By {card.author}
          <span className="ml-3">{card.lastUpdated}</span>
        </p>
      </div>
    </>
  );
};

export default Card;
