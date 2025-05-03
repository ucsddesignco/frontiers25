import { headers } from 'next/headers';
import { getCardByUser } from '../api/cardFunctions';
import GalleryPage from '../components/Pages/GalleryPage';
import { auth } from '@/lib/auth';
import { VisibleCard } from '../hooks/useVisibleCards';
import { processCardData } from '../util/processCardData';

export default async function UserGalleryPage() {
  const databaseCards = await getCardByUser();
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const processedData = processCardData(databaseCards);

  const cardData: VisibleCard[] = processedData.map(card => ({
    ...card,
    x: 0,
    y: 0,
    virtualCol: 0,
    virtualRow: 0,
    patternIndex: 0,
    key: card._id,
    isFading: false,
    fadeStartTime: 0
  }));

  return <GalleryPage cards={cardData} session={session} />;
}
