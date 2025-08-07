'use client';

import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import SimplifiedCard from './SimplifiedCard';
import { createCustomizationStore } from '@/app/stores/customizationStore';
import { useEffect, useRef, useState } from 'react';
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
import { generateColorVariations } from '@/app/util/colorUtils';
import LoadingIcon from '@/app/assets/LoadingIcon';
import { v4 as uuidv4 } from 'uuid';
import {
  updateCardInCache,
  addCardToCache,
  updateLocalCardInCache,
  addLocalCardToCache
} from '@/app/util/cacheInvalidation';

interface CustomizationContainerProps {
  card: DatabaseCard | null;
  cardId: string;
  session: Session | null;
  type: 'edit' | 'new';
}

export default function CustomizationContainer({
  card,
  cardId,
  session,
  type
}: CustomizationContainerProps) {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openContrastErrorModal, setOpenContrastErrorModal] = useState(false);
  const [openExitPageModal, setOpenExitPageModal] = useState(false);
  const [loadedLocalCards, setLoadedLocalCards] = useState(session !== null || card);
  const [newCard, setNewCard] = useState<DatabaseCard | null>(card);

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

  const {
    primary,
    accent,
    fontFamily,
    borderStyle,
    validContrast,
    setPrimary,
    setAccent,
    setFontFamily,
    setBorderStyle
  } = useStore(
    store,
    useShallow(state => ({
      primary: state.primary,
      accent: state.accent,
      fontFamily: state.fontFamily,
      borderStyle: state.borderStyle,
      validContrast: state.validContrast,
      setPrimary: state.setPrimary,
      setAccent: state.setAccent,
      setFontFamily: state.setFontFamily,
      setBorderStyle: state.setBorderStyle
    }))
  );

  useEffect(() => {
    // If card is not found in DB and user is guest, check local storage
    if (!card && !session) {
      const localCards = JSON.parse(localStorage.getItem('localCards') || '[]');
      const foundCard = localCards.find((card: DatabaseCard) => cardId === card._id);
      if (foundCard) {
        setNewCard(foundCard);
        setPrimary(parseColor(foundCard.primary).toString('hsl'));
        setAccent(parseColor(foundCard.accent).toString('hsl'));
        setFontFamily(foundCard.fontFamily);
        setBorderStyle(foundCard.borderStyle);
      }
      setLoadedLocalCards(true);
    }
  }, [card, session, cardId, setPrimary, setAccent, setFontFamily, setBorderStyle]);

  const handleCreateCard = async () => {
    const hexPrimary = parseColor(primary).toString('hex');
    const hexAccent = parseColor(accent).toString('hex');

    if (!validContrast) {
      setOpenContrastErrorModal(true);
      return;
    }

    // Handle local card editing (for unauthenticated users)
    if (!session && type === 'edit' && newCard && newCard._id.startsWith('local-card-')) {
      const { borderColor, buttonColor, scrollbarColor } = generateColorVariations(
        hexPrimary,
        hexAccent
      );

      const updatedLocalCard = {
        ...newCard,
        primary: hexPrimary,
        accent: hexAccent,
        fontFamily,
        borderStyle,
        borderColor,
        buttonColor,
        scrollbarColor,
        lastUpdated: new Date().toISOString()
      };

      // Update both cache and localStorage instantly
      updateLocalCardInCache(newCard._id, updatedLocalCard);

      customToast({
        description: 'Card Updated Successfully.',
        type: 'success'
      });
      router.push('/');
      return;
    }

    // Require authentication for database operations
    if (!session) {
      setOpenAuthModal(true);
      return;
    }

    // Handle new local card creation (for unauthenticated users)
    if (!session && type === 'new') {
      const { borderColor, buttonColor, scrollbarColor } = generateColorVariations(
        hexPrimary,
        hexAccent
      );
      const localCards = JSON.parse(localStorage.getItem('localCards') || '[]');

      if (localCards.length >= 3) {
        customToast({
          description: 'You can only create up to 3 cards.',
          type: 'error'
        });
        return;
      }

      const newLocalCard = {
        _id: `local-card-${uuidv4()}`,
        primary: hexPrimary,
        accent: hexAccent,
        fontFamily,
        borderStyle,
        borderColor,
        buttonColor,
        scrollbarColor,
        lastUpdated: new Date().toISOString(),
        author: 'Guest',
        user: 'Guest'
      };

      // Add to both cache and localStorage instantly
      addLocalCardToCache(newLocalCard);

      customToast({
        description: 'Card Created Successfully.',
        type: 'success'
      });
      router.push('/');
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
        // Update cache instantly with the returned data (no refetch needed!)
        updateCardInCache(card._id, updatedCard);

        customToast({
          description: 'Card Updated Successfully.',
          type: 'success'
        });
        router.push('/');
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
        // Add new card to cache instantly (no refetch needed!)
        addCardToCache(newCard);

        router.push('/');
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

  const handleExitPage = () => {
    if (type === 'edit' && card) {
      const isDifferent =
        primary !== parseColor(card.primary).toString('hsl') ||
        accent !== parseColor(card.accent).toString('hsl') ||
        fontFamily !== card.fontFamily ||
        borderStyle !== card.borderStyle;
      if (isDifferent) {
        setOpenExitPageModal(true);
      } else {
        router.push('/');
      }
    } else if (type === 'new') {
      setOpenExitPageModal(true);
    } else {
      router.push('/');
    }
  };

  const handleSaveLocally = () => {
    if (session) return;
    if (!validContrast) {
      setOpenContrastErrorModal(true);
      return;
    }

    const { borderColor, buttonColor, scrollbarColor } = generateColorVariations(primary, accent);
    const localCards = JSON.parse(localStorage.getItem('localCards') || '[]');

    setOpenAuthModal(false);

    if (localCards.length >= 3) {
      customToast({
        description: 'You can only create up to 3 cards.',
        type: 'error'
      });
      return;
    }

    const newLocalCard = {
      _id: `local-card-${uuidv4()}`,
      primary,
      accent,
      fontFamily,
      borderStyle,
      borderColor,
      buttonColor,
      scrollbarColor,
      lastUpdated: new Date().toISOString(),
      author: 'Guest',
      user: 'Guest'
    };

    // Add to both cache and localStorage instantly
    addLocalCardToCache(newLocalCard);

    customToast({
      description: 'Card saved locally.',
      type: 'success'
    });

    router.push('/');
  };

  let mainContent;

  if (!loadedLocalCards) {
    mainContent = (
      <div className="flex items-center gap-4">
        <LoadingIcon className="animate-spin-slow" />
        <p>Loading card...</p>
      </div>
    );
  } else if (!newCard) {
    mainContent = <h1 className="text-3xl font-bold">No cards found.</h1>;
  } else if (newCard.user === session?.user.id || newCard.user === 'Guest') {
    mainContent = (
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
            <SimplifiedCard id={newCard._id} />
          </div>

          <div className="gradient-border relative hidden h-[380px] w-[500px] items-center justify-center rounded-[45px] bg-[#f5f5f5] p-8 md:flex">
            <CustomizationPanel />
          </div>

          <div className="md:hidden">
            <CustomizationDrawer />
          </div>
        </div>
      </>
    );
  } else {
    mainContent = (
      <div style={{ width: 300, height: 400 }}>
        <SimplifiedCard id={newCard._id} />
      </div>
    );
  }

  return (
    <CustomizationContext.Provider value={store}>
      <GlassButton text="Back" className="fixed left-5 top-5" onClick={handleExitPage}>
        <BackIcon />
      </GlassButton>

      <Modal
        open={openAuthModal}
        onOpenChange={setOpenAuthModal}
        onPrimaryClick={() => {
          handleGoogleSignIn({
            cardData: {
              primary,
              accent,
              fontFamily,
              borderStyle
            }
          });
        }}
        onSecondaryClick={handleSaveLocally}
        primaryText="Sign In Via UCSD"
        secondaryText="Save Locally"
        Icon={<LoginIcon />}
        title="Keep Your Cards Safe."
        description="You're not signed in — your cards might disappear later."
      />

      <Modal
        open={openContrastErrorModal}
        onOpenChange={setOpenContrastErrorModal}
        onPrimaryClick={() => setOpenContrastErrorModal(false)}
        primaryText="Okay"
        Icon={null}
        onlyPrimary={true}
        title="Oops, No Contrast!"
        description="To save your card, it must pass the contrast checker."
      />

      <Modal
        open={openExitPageModal}
        onOpenChange={setOpenExitPageModal}
        onPrimaryClick={() => {
          router.back();
        }}
        primaryText="Back To Gallery"
        secondaryText="Nevermind"
        Icon={<BackIcon color="#fff" />}
        title="Unsaved Changes"
        description="Are you sure you want to leave? Your changes will be lost."
      />
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-16 bg-[#eaeaea] px-5 md:flex-row">
        {mainContent}
      </div>
    </CustomizationContext.Provider>
  );
}
