import InfiniteCanvas from './components/InfiniteCanvas';
import { fakeCardData } from './fake-data/data';

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <InfiniteCanvas data={fakeCardData} />
    </main>
  );
}
