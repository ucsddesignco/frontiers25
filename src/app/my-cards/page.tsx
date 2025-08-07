export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';
import { getCardByUser } from '../api/cardFunctions';
import GalleryPage from '../components/Pages/GalleryPage';
import { auth } from '@/lib/auth';
import { VisibleCard } from '../hooks/useVisibleCards';
import { processCardData } from '../util/processCardData';

export default async function MyCards() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const cardData: VisibleCard[] = [];

  if (session) {
    const databaseCards = await getCardByUser();

    const processedData = processCardData(databaseCards || []);

    const tempCardData = processedData
      .map(card => ({
        ...card,
        x: 0,
        y: 0,
        virtualCol: 0,
        virtualRow: 0,
        patternIndex: 0,
        key: card._id,
        fadeStartTime: 0
      }))
      .sort((a, b) => new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime());

    switch (tempCardData.length) {
      case 3:
        cardData[1] = tempCardData[0];
        cardData[0] = tempCardData[2];
        cardData[2] = tempCardData[1];
        break;
      case 2:
        cardData[1] = tempCardData[0];
        cardData[0] = tempCardData[1];
        break;
      case 1:
        cardData[0] = tempCardData[0];
        break;
      default:
    }
  }

  return <GalleryPage cards={cardData} session={session} />;
}
