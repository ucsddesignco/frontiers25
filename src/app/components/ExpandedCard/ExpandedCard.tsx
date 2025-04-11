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
  isExpanded: boolean;
};

const ExpandedCardComponent = ({ isExpanded }: ExpandedCardProps) => {
  const { openedCard, expandedCardRef } = useCanvasStore(
    useShallow(state => ({
      openedCard: state.openedCard,
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

    if (!isExpanded) {
      expandedCard.style.transitionProperty = 'opacity';
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
  }, [isExpanded, expandedCardRef]);

  return (
    <>
      <div
        ref={expandedCardRef}
        id="card-content-expanded"
        style={
          {
            '--card-primary-color': openedCard?.primary,
            '--card-accent-color': openedCard?.accent,
            '--card-button-color': openedCard?.buttonColor,
            '--card-border-color': openedCard?.borderColor,
            '--card-scrollbar-color': openedCard?.scrollbarColor,
            color: openedCard?.accent,
            backgroundColor: !isExpanded ? 'transparent' : openedCard?.primary
          } as React.CSSProperties
        }
        className={`${isExpanded ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} absolute z-[1] mx-auto h-full w-full overflow-y-scroll transition-opacity duration-[0.4s] ease-in-out`}
      >
        <HeroPage scrollToSection={scrollToSection} isExpanded={isExpanded} />
        {/* It is necessary for these pages to have isExpanded so that they continue to fade even when scrolling */}
        <FAQPage ref={faqRef} isExpanded={isExpanded} />
        <AgendaPage ref={agendaRef} isExpanded={isExpanded} />
        <JudgesPage ref={judgesRef} isExpanded={isExpanded} />
      </div>
    </>
  );
};

export default memo(ExpandedCardComponent);
