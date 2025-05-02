'use client';

import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import SimplifiedCard from './SimplifiedCard';
import { createCustomizationStore } from '@/app/stores/customizationStore';
import { useRef } from 'react';
import { parseColor } from 'react-stately';
import { CustomizationPanel } from './CustomizationPanel';
import { CustomizationDrawer } from './CustomizationDrawer';
import GlassButton from '../GlassButton/GlassButton';
import { BackIcon } from '@/app/assets/BackIcon';
import { DoneIcon } from '@/app/assets/DoneIcon';
import { DatabaseCard } from '../InfiniteCanvas';
import { customToast } from '@/app/util/CustomToast/CustomToast';
import createCard from '@/app/api/cardFunctions';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';

interface CustomizationContainerProps {
  card: DatabaseCard | null;
  newCard?: boolean;
}

export default function CustomizationContainer({ card }: CustomizationContainerProps) {
  const store = useRef(
    createCustomizationStore({
      primary: card ? parseColor(card.primary).toString('hsl') : undefined,
      accent: card ? parseColor(card.accent).toString('hsl') : undefined,
      fontFamily: card?.fontFamily,
      borderStyle: card?.borderStyle
    })
  ).current;

  if (!store) throw new Error('Missing CustomizationContext');

  const { primary, accent, fontFamily, borderStyle } = useStore(
    store,
    useShallow(state => ({
      primary: state.primary,
      accent: state.accent,
      fontFamily: state.fontFamily,
      borderStyle: state.borderStyle
    }))
  );

  const handleCreateCard = async () => {
    const hexPrimary = parseColor(primary).toString('hex');
    const hexAccent = parseColor(accent).toString('hex');
    const newCard = await createCard({
      fontFamily,
      primary: hexPrimary,
      accent: hexAccent,
      borderStyle
    });

    if (newCard) {
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
  };

  return (
    <CustomizationContext.Provider value={store}>
      <GlassButton href="/" text="Back" className="fixed left-5 top-5">
        <BackIcon />
      </GlassButton>

      {card ? (
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
        <div className="flex h-screen w-screen items-center justify-center bg-[#eaeaea]">
          <h1 className="text-xl font-bold">Card Not Found.</h1>
        </div>
      )}
    </CustomizationContext.Provider>
  );
}
