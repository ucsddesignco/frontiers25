'use client';

import GlassButton from '../GlassButton/GlassButton';
import SignInButton from '../SignInButton';
import { Session } from '@/lib/auth';
import { useCardInteractions } from '@/app/hooks/useCardInteractions';
import MyCardsPage from './MyCardsPage';
import { VisibleCard } from '@/app/hooks/useVisibleCards';
import { BackIcon } from '@/app/assets/BackIcon';
import { useEffect, useState } from 'react';
import { formatRelativeTime } from '@/app/util/formatTime';
import { CardType } from '../constants';
import LoadingIcon from '@/app/assets/LoadingIcon';

type GalleryPageProps = {
  cards: VisibleCard[];
  session: Session | null;
};
const GalleryPage = ({ cards, session }: GalleryPageProps) => {
  const { handleLearnMore } = useCardInteractions();
  const [myCards, setMyCards] = useState(cards);
  const [loadedLocalCards, setLoadedLocalCards] = useState(session !== null);

  useEffect(() => {
    if (!session) {
      const localCards = localStorage.getItem('localCards') || '[]';
      const parsedCards = JSON.parse(localCards).map((card: CardType) => {
        card.lastUpdated = formatRelativeTime(card.lastUpdated);
        return card;
      });
      setMyCards(parsedCards);
      setLoadedLocalCards(true);
    }
  }, []);

  let mainContent;

  if (!loadedLocalCards) {
    mainContent = (
      <div className="flex items-center gap-4">
        <LoadingIcon className="animate-spin-slow" />
        <p>Loading cards...</p>
      </div>
    );
  } else if (myCards.length === 0) {
    mainContent = <h1 className="text-3xl font-bold">No cards found.</h1>;
  } else {
    mainContent = (
      <MyCardsPage
        cards={myCards}
        setCards={setMyCards}
        handleLearnMore={handleLearnMore}
        session={session}
      />
    );
  }

  return (
    <main className="h-screen">
      <GlassButton
        href="/"
        onMouseDown={e => e.stopPropagation()}
        text="Back To Gallery"
        className="fixed left-9 top-5 z-[4]"
      >
        <BackIcon />
      </GlassButton>
      <SignInButton session={session} className="fixed right-9 top-5 z-[4]" />
      <div className="flex h-full w-screen flex-wrap items-center justify-center gap-16 overflow-auto bg-[#eaeaea] py-32 md:min-h-screen md:py-0">
        {mainContent}
      </div>
    </main>
  );
};

export default GalleryPage;
