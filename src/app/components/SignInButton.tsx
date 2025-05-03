import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import LoginIcon from '../assets/LoginIcon';
import GlassButton from './GlassButton/GlassButton';
import LoginModal from './LoginModal/LoginModal';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import ProfileIcon from '../assets/ProfileIcon';
import { Session } from '@/lib/auth';
import Modal from './Modal';

function SignInButton({ session }: { session: Session | null }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  if (!session) {
    return (
      <>
        <GlassButton
          onClick={() => setOpenLoginModal(true)}
          onMouseDown={e => e.stopPropagation()}
          text="Sign In"
        >
          <LoginIcon />
        </GlassButton>

        <LoginModal open={openLoginModal} onOpenChange={setOpenLoginModal} />
      </>
    );
  }

  return (
    <>
      <Modal
        open={openSignOutModal}
        onOpenChange={setOpenSignOutModal}
        buttonOnClick={handleSignOut}
        button1Text="Nevermind"
        button2Text="Sign Out"
        Icon={<LoginIcon />}
        title="Leaving So Soon?"
        description="Any cards you make while signed out might disappear later."
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <GlassButton
            text="Profile"
            onClick={e => e.stopPropagation()}
            onMouseDown={e => e.stopPropagation()}
          >
            <ProfileIcon />
          </GlassButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem>My Cards</DropdownMenuItem> {/* Placeholder for now */}
          <DropdownMenuItem onClick={() => setOpenSignOutModal(true)}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default memo(SignInButton);
