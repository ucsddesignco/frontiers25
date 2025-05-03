import { headers } from 'next/headers';
import { getRandomCards } from './api/cardFunctions';
import InfiniteCanvas from './components/InfiniteCanvas';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const cardData = await getRandomCards(50, session?.user?.id);

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <InfiniteCanvas data={cardData} session={session} />
    </main>
  );
}
