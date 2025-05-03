'use client';

import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import SimplifiedCard from './SimplifiedCard';
import { createCustomizationStore } from '@/app/stores/customizationStore';
import { useRef, useState } from 'react';
import { parseColor } from '@react-stately/color';
import { CustomizationPanel } from './CustomizationPanel';
import { CustomizationDrawer } from './CustomizationDrawer';
import GlassButton from '../GlassButton/GlassButton';
import { BackIcon } from '@/app/assets/BackIcon';
import { DoneIcon } from '@/app/assets/DoneIcon';
import { DatabaseCard } from '../InfiniteCanvas';
import { customToast } from '@/app/util/CustomToast/CustomToast';
import createCard, { updateCardByID } from '@/app/api/cardFunctions';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { Session } from '@/lib/auth';
import Modal from '../Modal';
import LoginIcon from '@/app/assets/LoginIcon';
import { handleGoogleSignIn } from '@/app/util/handleGoogleSignin';
import { useRouter } from 'next/navigation';

interface CustomizationContainerProps {
  card: DatabaseCard | null;
  session: Session | null;
  type: 'edit' | 'new';
}

export default function CustomizationContainer({
  card,
  session,
  type
}: CustomizationContainerProps) {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openContrastErrorModal, setOpenContrastErrorModal] = useState(false);
  const [openExitPageModal, setOpenExitPageModal] = useState(false);
  const router = useRouter();
  const store = useRef(
    createCustomizationStore({
      primary: card ? parseColor(card.primary).toString('hsl') : undefined,
      accent: card ? parseColor(card.accent).toString('hsl') : undefined,
      fontFamily: card?.fontFamily,
      borderStyle: card?.borderStyle
    })
  ).current;

  if (!store) throw new Error('Missing CustomizationContext');

  const { primary, accent, fontFamily, borderStyle, validContrast } = useStore(
    store,
    useShallow(state => ({
      primary: state.primary,
      accent: state.accent,
      fontFamily: state.fontFamily,
      borderStyle: state.borderStyle,
      validContrast: state.validContrast
    }))
  );

  const handleCreateCard = async () => {
    const hexPrimary = parseColor(primary).toString('hex');
    const hexAccent = parseColor(accent).toString('hex');

    if (!validContrast) {
      setOpenContrastErrorModal(true);
      return;
    } else if (!session) {
      setOpenAuthModal(true);
      return;
    }

    if (!card) {
      return;
    }

    if (type === 'edit') {
      const updatedCard = await updateCardByID({
        id: card._id,
        fontFamily,
        primary: hexPrimary,
        accent: hexAccent,
        borderStyle
      });

      if (updatedCard?.error) {
        customToast({
          description: updatedCard.error,
          type: 'error'
        });
      } else if (updatedCard) {
        customToast({
          description: 'Card Updated Successfully.',
          type: 'success'
        });
      } else {
        customToast({
          description: 'Failed to update card.',
          type: 'error'
        });
      }
    }

    if (type === 'new') {
      const newCard = await createCard({
        fontFamily,
        primary: hexPrimary,
        accent: hexAccent,
        borderStyle
      });

      if (newCard?.error) {
        customToast({
          description: newCard.error,
          type: 'error'
        });
      } else if (newCard) {
        customToast({
          description: 'Card Created Successfully.',
          type: 'success'
        });
      } else {
        customToast({
          description: 'Failed to create card.',
          type: 'error'
        });
      }
    }
  };

  return (
    <CustomizationContext.Provider value={store}>
      <GlassButton
        text="Back"
        className="fixed left-5 top-5"
        onClick={() => setOpenExitPageModal(true)}
      >
        <BackIcon />
      </GlassButton>

      <Modal
        open={openAuthModal}
        onOpenChange={setOpenAuthModal}
        buttonOnClick={() => {
          handleGoogleSignIn({ onSuccess: () => setOpenAuthModal(false) });
        }}
        primaryText="Sign In Via UCSD"
        secondaryText="No Thanks"
        Icon={<LoginIcon />}
        title="Keep Your Cards Safe."
        description="You're not signed in — your cards might disappear later."
      />

      <Modal
        open={openContrastErrorModal}
        onOpenChange={setOpenContrastErrorModal}
        buttonOnClick={() => setOpenContrastErrorModal(false)}
        primaryText="Okay"
        Icon={null}
        onlyPrimary={true}
        title="Oops, No Contrast!"
        description="To save your card, it must pass the contrast checker."
      />

      <Modal
        open={openExitPageModal}
        onOpenChange={setOpenExitPageModal}
        buttonOnClick={() => {
          router.back();
        }}
        primaryText="Back To Gallery"
        secondaryText="Nevermind"
        Icon={<BackIcon color="#fff" />}
        title="Unsaved Changes"
        description="Are you sure you want to leave? Your changes will be lost."
      />

      {card ? (
        card.user === session?.user.id || card.user === 'Guest' ? (
          <>
            <GlassButton
              onClick={handleCreateCard}
              text="Done"
              className="fixed right-5 top-5"
              color="dark"
            >
              <DoneIcon />
            </GlassButton>

            <div className="flex h-screen w-screen flex-col items-center justify-center gap-16 bg-[#eaeaea] px-5 md:flex-row">
              <div style={{ width: 300, height: 400 }}>
                <SimplifiedCard id={card._id} />
              </div>

              <div className="gradient-border relative hidden h-[380px] w-[500px] items-center justify-center rounded-[45px] bg-[#f5f5f5] p-8 md:flex">
                <CustomizationPanel />
              </div>

              <div className="md:hidden">
                <CustomizationDrawer />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-screen w-screen flex-col items-center justify-center gap-16 bg-[#eaeaea] px-5 md:flex-row">
            <div style={{ width: 300, height: 400 }}>
              <SimplifiedCard id={card._id} />
            </div>
          </div>
        )
      ) : (
        <div className="flex h-screen w-screen items-center justify-center bg-[#eaeaea]">
          <h1 className="text-xl font-bold">Card Not Found.</h1>
        </div>
      )}
    </CustomizationContext.Provider>
  );
}
