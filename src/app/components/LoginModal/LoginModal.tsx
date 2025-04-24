import './LoginModal.scss';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

//import { authClient } from '../../../lib/auth-client';
import { Dispatch, SetStateAction } from 'react';
//import { useRouter } from 'next/navigation';
import GlassButton from '../GlassButton/GlassButton';

interface LoginModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState('');
  //   const router = useRouter();

  //   const handleGoogleSignIn = async () => {
  //     setLoading(true);
  //     setError('');

  //     try {
  //       const { error } = await authClient.signIn.social(
  //         {
  //           provider: 'google',
  //           callbackURL: '/dashboard'
  //         },
  //         {
  //           onRequest: () => setLoading(true),
  //           onSuccess: () => router.push('/dashboard'),
  //           onError: ctx => setError(ctx.error.message || 'Sign in failed')
  //         }
  //       );

  //       if (error) {
  //         setError(error.message || 'Sign in failed');
  //       }
  //     } catch {
  //       setError('An unexpected error occurred');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="dialog-title">Want to save your creation?</DialogTitle>
          <DialogDescription className="dialog-description">You need to log in</DialogDescription>
        </DialogHeader>
        <DialogFooter className="modal-footer">
          <DialogClose asChild>
            <GlassButton
              onClick={() => {}}
              onMouseDown={e => e.stopPropagation()}
              text="I Just Want to Mess Around"
              className="modal-button justify-center"
            ></GlassButton>
          </DialogClose>
          <GlassButton
            onClick={() => {}}
            onMouseDown={e => e.stopPropagation()}
            text="Log In Via Email"
            className="modal-button justify-center"
            color="dark"
          ></GlassButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
