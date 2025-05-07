import { Dispatch, SetStateAction } from 'react';
import Modal from '../Modal';
import LoginIcon from '@/app/assets/LoginIcon';
import { handleGoogleSignIn } from '@/app/util/handleGoogleSignin';

interface LoginModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export default function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      Icon={<LoginIcon />}
      onPrimaryClick={() => {
        handleGoogleSignIn({});
      }}
      primaryText="Sign In Via UCSD"
      title="UCSD Email Needed."
      description="Keep your cards safe by signing in."
    />
  );
}
