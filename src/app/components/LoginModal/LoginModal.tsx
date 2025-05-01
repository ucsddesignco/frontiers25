import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import { authClient } from '../../../lib/auth-client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import GlassButton from '../GlassButton/GlassButton';

interface LoginModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [_loading, setLoading] = useState(false);
  const [_error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await authClient.signIn.social(
        {
          provider: 'google',
          callbackURL: '/'
        },
        {
          onRequest: () => setLoading(true),
          onSuccess: () => router.push('/'),
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
      <DialogContent className="max-w-[320px] sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Want to Save Your Creation?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogDescription>You’ll have to log in.</DialogDescription>
          <DialogClose asChild>
            <GlassButton
              onClick={() => {}}
              onMouseDown={e => e.stopPropagation()}
              text="No Thanks"
              className="modal-button justify-center"
              width="full"
            />
          </DialogClose>
          <GlassButton
            onClick={handleGoogleSignIn}
            onMouseDown={e => e.stopPropagation()}
            text="Log In Via UCSD"
            className="modal-button justify-center"
            color="dark"
            width="full"
          >
            <svg
              width={14}
              height={18}
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.25 0.25H13.75V17.75H0.25V12H1.75V16.25H12.25V1.75H1.75V6H0.25V0.25Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.53033 4.46967L11.0607 9L6.53033 13.5303L5.46967 12.4697L8.18934 9.75H0.25V8.25H8.18934L5.46967 5.53033L6.53033 4.46967Z"
                fill="white"
              />
            </svg>
          </GlassButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
