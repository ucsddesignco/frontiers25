import { useState, memo } from 'react';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import GlassButton from './GlassButton/GlassButton';
import LoginModal from './LoginModal/LoginModal';

function SignInButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <GlassButton
        onClick={() => setModalOpen(true)}
        onMouseDown={e => e.stopPropagation()}
        text="Sign In"
        className="fixed right-9 top-5 z-[4]"
      >
        <ResetZoomIcon />
      </GlassButton>

      <LoginModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}

export default memo(SignInButton);
