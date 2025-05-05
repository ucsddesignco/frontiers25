import CustomizationContainer from '@/app/components/customization/CustomizationContainer';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getCardByID } from '@/app/api/cardFunctions';
import { BackIcon } from '@/app/assets/BackIcon';
import GlassButton from '@/app/components/GlassButton/GlassButton';

export default async function NewCardPage({ params }: { params: Promise<{ cardId: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const param = await params;
  const cardId = param.cardId as string;

  const card = await getCardByID(cardId);

  if (!card) {
    return (
      <>
        <GlassButton href="/" text="Back" className="fixed left-5 top-5">
          <BackIcon />
        </GlassButton>
        <div className="flex h-screen w-screen items-center justify-center bg-[#eaeaea]">
          <h1 className="text-xl font-bold">Card Not Found.</h1>
        </div>
      </>
    );
  }

  const newCard = {
    _id: 'new',
    primary: card.primary,
    accent: card.accent,
    fontFamily: card.fontFamily,
    borderStyle: card.borderStyle,
    user: session?.user.id || 'Guest',
    author: session?.user.name || 'Guest',
    lastUpdated: new Date().toISOString()
  };

  return <CustomizationContainer card={newCard} session={session} type="new" />;
}
