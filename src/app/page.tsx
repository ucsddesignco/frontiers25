import { getAllCards } from './api/cardFunctions';
import InfiniteCanvas from './components/InfiniteCanvas';

export default async function Home() {
  const cardData = await getAllCards();
  const data = JSON.parse(cardData);

  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <InfiniteCanvas data={data} />
    </main>
  );
}
