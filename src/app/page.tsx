import { headers } from 'next/headers';
import { getAllCards } from './api/cardFunctions';
import InfiniteCanvas from './components/InfiniteCanvas';
import { auth } from '@/lib/auth';

export default async function Home() {
  const cardData = await getAllCards();
  const data = JSON.parse(cardData);
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <InfiniteCanvas data={data} session={session} />
    </main>
  );
}
