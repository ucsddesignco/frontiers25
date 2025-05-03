import { auth } from '@/lib/auth';
import { getCardByID } from '../../api/cardFunctions';
import CustomizationContainer from '../../components/customization/CustomizationContainer';
import { headers } from 'next/headers';

export default async function Page({ params }: { params: Promise<{ cardId: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const param = await params;
  const cardId = param.cardId as string;

  const card = await getCardByID(cardId);

  return <CustomizationContainer card={card} session={session} type="edit" />;
}
