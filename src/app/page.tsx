import { cookies, headers } from 'next/headers';
import { auth } from '@/lib/auth';
import CardDataProvider from './components/CardDataProvider';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const cookieStore = await cookies();
  let newCardToast = null;
  if (cookieStore.has('new_card_status')) {
    newCardToast = JSON.parse(cookieStore.get('new_card_status')?.value || 'null');
  }

  return (
    <main>
      <CardDataProvider session={session} newCardToast={newCardToast} />
    </main>
  );
}
