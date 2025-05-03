import { authClient } from '@/lib/auth-client';

export interface HandleGoogleSignInProps {
  onRequest?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
  onFinally?: () => void;
}

export async function handleGoogleSignIn({
  onRequest,
  onSuccess,
  onError,
  onFinally
}: HandleGoogleSignInProps) {
  try {
    const { error } = await authClient.signIn.social(
      {
        provider: 'google',
        callbackURL: '/'
      },
      {
        onRequest: () => {
          onRequest?.();
        },
        onSuccess: () => {
          onSuccess?.();
        },
        onError: ctx => {
          onError?.();
          console.error('Error during sign-in:', ctx.error);
        }
      }
    );

    if (error) {
      console.error('An unexpected error occurred', error);
    }
  } catch (error) {
    console.error('An unexpected error occurred', error);
  } finally {
    onFinally?.();
  }
}
