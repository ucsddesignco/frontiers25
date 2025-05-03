import CustomizationContainer from '@/app/components/customization/CustomizationContainer';
import { BorderStyle, FontFamily } from '@/app/stores/customizationStore';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function NewCardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const card = {
    _id: 'new',
    primary: '#FFCDD2',
    accent: '#530B67',
    fontFamily: 'Jaro' as FontFamily,
    borderStyle: 'rectangular' as BorderStyle,
    user: session?.user.id || 'Guest',
    author: session?.user.name || 'Guest',
    lastUpdated: new Date().toISOString()
  };

  return <CustomizationContainer card={card} session={session} type="new" />;
}
