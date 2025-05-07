import { authClient } from '@/lib/auth-client';
import { setCookie } from './cookieFunctions';

interface CreateCard {
  primary: string;
  accent: string;
  fontFamily: string;
  borderStyle: string;
}

export interface HandleGoogleSignInProps {
  onError?: () => void;
  cardData?: CreateCard;
}

export async function handleGoogleSignIn({
  onError,
  cardData = undefined
}: HandleGoogleSignInProps) {
  try {
    // Set cookie with card data
    if (cardData) {
      // document.cookie = `cardData=${encodeURIComponent(JSON.stringify({ cardData }))}; path=/; secure`;
      setCookie('cardData', JSON.stringify({ cardData }), {
        secure: true,
        maxAge: 30
      });
    }

    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
      fetchOptions: {
        onResponse: async () => {},
        onError: err => {
          console.error('Sign-in error:', err);
          onError?.();
        }
      }
    });

    if (error) {
      console.error('An unexpected error occurred', error);
      onError?.();
    }
  } catch (error) {
    console.error('An unexpected error occurred', error);
    onError?.();
  } finally {
  }
}
