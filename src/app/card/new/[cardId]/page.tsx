import CustomizationContainer from '@/app/components/customization/CustomizationContainer';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getCardByID } from '@/app/api/cardFunctions';

export default async function NewCardPage({ params }: { params: Promise<{ cardId: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const param = await params;
  const cardId = param.cardId as string;

  let newCard = null;

  if (cardId.substring(0, 10) !== 'local-card') {
    const card = await getCardByID(cardId);

    newCard = {
      _id: card._id,
      primary: card.primary,
      accent: card.accent,
      fontFamily: card.fontFamily,
      borderStyle: card.borderStyle,
      user: session?.user.id || 'Guest',
      author: session?.user.name || 'Guest',
      lastUpdated: new Date().toISOString()
    };
  }

  return <CustomizationContainer card={newCard} cardId={cardId} session={session} type="new" />;
}
