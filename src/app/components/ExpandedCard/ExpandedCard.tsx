'use client';

import { memo, useEffect, useRef } from 'react';
import FAQPage from '../Pages/FAQPage';
import AgendaPage from '../Pages/AgendaPage';
import HeroPage from '../Pages/HeroPage';
import JudgesPage from '../Pages/JudgesPage';
import { useCanvasStore } from '../../stores/canvasStore';
import './ExpandedCard.scss';
import { useShallow } from 'zustand/shallow';

export type SectionId = 'faq' | 'agenda' | 'judges';

type ExpandedCardProps = {
  showExpanded: boolean;
};

const ExpandedCardComponent = ({ showExpanded }: ExpandedCardProps) => {
  const { expandedCard, expandedCardRef } = useCanvasStore(
    useShallow(state => ({
      expandedCard: state.expandedCard,
      expandedCardRef: state.expandedCardRef
    }))
  );

  const faqRef = useRef<HTMLDivElement>(null);
  const agendaRef = useRef<HTMLDivElement>(null);
  const judgesRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: SectionId) => {
    switch (id) {
      case 'faq':
        scrollTo(faqRef);
        break;
      case 'agenda':
        scrollTo(agendaRef);
        break;
      case 'judges':
        scrollTo(judgesRef);
        break;
      default:
        console.warn('Unknown section ID:', id);
    }
  };

  useEffect(() => {
    const expandedCard = expandedCardRef.current;
    if (!expandedCard) return;

    if (!showExpanded) {
      expandedCard.style.transitionProperty = 'opacity';
      if (expandedCard.scrollTop > 0) {
        setTimeout(() => {
          expandedCard.scrollTo({ top: 0 });
        }, 100);
      }
      return;
    }

    const handleScroll = () => {
      // This is so the backgroundColor is immediately applied to block the transitioning card content
      expandedCard.style.transitionProperty = 'none';
      expandedCard.removeEventListener('scroll', handleScroll);
    };

    if (expandedCard) {
      expandedCard.style.transitionProperty = 'opacity';

      expandedCard.addEventListener('scroll', handleScroll);
      return () => expandedCard.removeEventListener('scroll', handleScroll);
    }
  }, [showExpanded, expandedCardRef]);

  return (
    <>
      <div
        ref={expandedCardRef}
        id="card-content-expanded"
        style={
          {
            '--card-primary-color': expandedCard?.primary,
            '--card-accent-color': expandedCard?.accent,
            '--card-button-color': expandedCard?.buttonColor,
            '--card-border-color': expandedCard?.borderColor,
            '--card-scrollbar-color': expandedCard?.scrollbarColor,
            color: expandedCard?.accent,
            backgroundColor: !showExpanded ? 'transparent' : expandedCard?.primary
          } as React.CSSProperties
        }
        className={`${showExpanded ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} duration-[0.2s] absolute z-[3] mx-auto h-full w-full overflow-y-scroll transition-opacity ease-in-out`}
      >
        <HeroPage scrollToSection={scrollToSection} showExpanded={showExpanded} />
        {/* It is necessary for these pages to have showExpanded so that they continue to fade even when scrolling */}
        <FAQPage ref={faqRef} showExpanded={showExpanded} borderStyle={expandedCard?.borderStyle} />
        <AgendaPage
          ref={agendaRef}
          showExpanded={showExpanded}
          borderStyle={expandedCard?.borderStyle}
        />
        <JudgesPage
          ref={judgesRef}
          showExpanded={showExpanded}
          borderStyle={expandedCard?.borderStyle}
        />
      </div>
    </>
  );
};

export default memo(ExpandedCardComponent);
