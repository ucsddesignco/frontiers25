import { cookies, headers } from 'next/headers';
import { getRandomCards } from './api/cardFunctions';
import InfiniteCanvas from './components/InfiniteCanvas';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const cardData = await getRandomCards(50, session?.user?.id);

  const cookieStore = await cookies();
  let newCardToast = null;
  if (cookieStore.has('new_card_status')) {
    newCardToast = JSON.parse(cookieStore.get('new_card_status')?.value || 'null');
  }

  return (
    <main>
      <InfiniteCanvas data={cardData || []} session={session} newCardToast={newCardToast} />
    </main>
  );
}
