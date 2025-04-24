import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { authClient } from '../../../lib/auth-client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: '/dashboard'
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push('/dashboard'),
          onError: ctx => setError(ctx.error.message || 'Sign in failed')
        }
      );

      if (error) {
        setError(error.message || 'Sign in failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
