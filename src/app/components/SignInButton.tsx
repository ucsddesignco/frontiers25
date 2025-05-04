import { memo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import MyCardsIcon from '../assets/MyCardsIcon';
import GalleryIcon from '../assets/GalleryIcon';

interface SignInButtonProps {
  session: Session | null;
  className?: string;
}

function SignInButton({ session, className }: SignInButtonProps) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const pathname = usePathname();
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
          className={className}
        >
          <LoginIcon />
        </GlassButton>

        <LoginModal open={openLoginModal} onOpenChange={setOpenLoginModal} />
      </>
    );
  }

  return (
    <div className={className}>
      <Modal
        open={openSignOutModal}
        onOpenChange={setOpenSignOutModal}
        buttonOnClick={handleSignOut}
        primaryText="Sign Out"
        secondaryText="Nevermind"
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
        <DropdownMenuContent className="rounded-md" sideOffset={8} align="center">
          <DropdownMenuItem
            onClick={() => router.push(pathname === '/my-cards' ? '/' : '/my-cards')}
          >
            {pathname === '/my-cards' ? <GalleryIcon /> : <MyCardsIcon />}
            {pathname === '/my-cards' ? 'Gallery' : 'My Cards'}
          </DropdownMenuItem>
          {/* Divider Line*/}
          <div className="my-1 h-0.5 bg-gray-300" />
          <DropdownMenuItem onClick={() => setOpenSignOutModal(true)}>
            <LoginIcon />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default memo(SignInButton);
