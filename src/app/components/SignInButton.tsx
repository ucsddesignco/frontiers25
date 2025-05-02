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
import { useCanvasStore } from '../stores/canvasStore';

function SignInButton({ session }: { session: Session | null }) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const showLightFog = useCanvasStore(state => state.showLightFog);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

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
    <div
      className={`${!showLightFog ? 'invisible' : ''} fixed right-9 top-5 z-[3] border-none outline-none`}
    >
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
