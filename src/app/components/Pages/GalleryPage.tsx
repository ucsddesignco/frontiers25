'use client';

import GlassButton from '../GlassButton/GlassButton';
import SignInButton from '../SignInButton';
import { Session } from '@/lib/auth';
import { useCardInteractions } from '@/app/hooks/useCardInteractions';
import MyCardsPage from './MyCardsPage';
import { VisibleCard } from '@/app/hooks/useVisibleCards';
import { BackIcon } from '@/app/assets/BackIcon';

type GalleryPageProps = {
  cards: VisibleCard[];
  session: Session | null;
};
const GalleryPage = ({ cards, session }: GalleryPageProps) => {
  const { handleLearnMore } = useCardInteractions();
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
      <MyCardsPage cards={cards} handleLearnMore={handleLearnMore} />
    </main>
  );
};

export default GalleryPage;
