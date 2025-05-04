'use client';

import { memo, useEffect, useRef } from 'react';
import FAQPage from '../Pages/FAQPage';
import AgendaPage from '../Pages/AgendaPage';
import HeroPage from '../Pages/HeroPage';
import JudgesPage from '../Pages/JudgesPage';
import { useCanvasStore } from '../../stores/canvasStore';
import './ExpandedCard.scss';
import { useShallow } from 'zustand/shallow';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import GlassButton from '../GlassButton/GlassButton';
import SectionsIcon from '@/app/assets/SectionsIcon';
import { getCardLogo } from '@/app/util/getCardLogo';
import ProfileIcon from '@/app/assets/ProfileIcon';
import AgendaIcon from '@/app/assets/AgendaIcon';
import FAQIcon from '@/app/assets/FAQIcon';

export type SectionId = 'faq' | 'agenda' | 'judges';

type ExpandedCardProps = {
  showExpanded: boolean;
};

const ExpandedCardComponent = ({ showExpanded }: ExpandedCardProps) => {
  const { expandedCard, expandedCardRef, showLightFog } = useCanvasStore(
    useShallow(state => ({
      expandedCard: state.expandedCard,
      expandedCardRef: state.expandedCardRef,
      showLightFog: state.showLightFog
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

  const CardLogo = getCardLogo({
    fontFamily: expandedCard?.fontFamily,
    accent: expandedCard?.accent
  });

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
        className={`${showExpanded ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} duration-[0.2s] absolute z-[4] mx-auto flex h-full w-full flex-col items-center gap-[200px] overflow-y-scroll transition-opacity ease-in-out`}
      >
        <HeroPage
          scrollToSection={scrollToSection}
          showExpanded={showExpanded}
          CardLogo={CardLogo}
        />
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
      <div
        className={`${!showLightFog ? '' : 'invisible'} fixed right-9 top-5 z-[4] border-none outline-none`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <GlassButton
              text="Sections"
              color="dark"
              onClick={e => e.stopPropagation()}
              onMouseDown={e => e.stopPropagation()}
            >
              <SectionsIcon />
            </GlassButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg" sideOffset={8} align="center">
            <DropdownMenuItem onClick={() => scrollToSection('faq')}>
              <FAQIcon />
              FAQ
            </DropdownMenuItem>{' '}
            {/* Divider Line*/}
            <div className="my-1 h-0.5 bg-gray-300" />
            <DropdownMenuItem onClick={() => scrollToSection('agenda')}>
              <AgendaIcon />
              Agenda
            </DropdownMenuItem>
            <div className="my-1 h-0.5 bg-gray-300" />
            <DropdownMenuItem onClick={() => scrollToSection('judges')}>
              <ProfileIcon />
              Judges
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default memo(ExpandedCardComponent);
