import { memo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import LoginIcon from '../assets/LoginIcon';
import GlassButton from './GlassButton/GlassButton';
import LoginModal from './LoginModal/LoginModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import ProfileIcon from '../assets/ProfileIcon';

function SignInButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  if (isPending) return null;

  if (!session) {
    return (
      <>
        <GlassButton
          onClick={() => setModalOpen(true)}
          onMouseDown={e => e.stopPropagation()}
          text="Sign In"
          className="fixed right-9 top-5 z-[4]"
        >
          <LoginIcon />
        </GlassButton>

        <LoginModal open={modalOpen} onOpenChange={setModalOpen} />
      </>
    );
  }

  return (
    <div className="fixed right-9 top-5 z-[4] border-none outline-none">
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
          <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default memo(SignInButton);
