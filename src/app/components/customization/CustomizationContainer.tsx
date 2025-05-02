'use client';

import { CustomizationContext } from '@/app/contexts/CustomizationContext';
import { CardType } from '../constants';
import SimplifiedCard from './SimplifiedCard';
import { createCustomizationStore } from '@/app/stores/customizationStore';
import { useRef } from 'react';
import { parseColor } from 'react-stately';
import { CustomizationPanel } from './CustomizationPanel';
import { CustomizationDrawer } from './CustomizationDrawer';
import GlassButton from '../GlassButton/GlassButton';
import { BackIcon } from '@/app/assets/BackIcon';
import { DoneIcon } from '@/app/assets/DoneIcon';

export default function CustomizationContainer({ card }: { card: CardType | null }) {
  const store = useRef(
    createCustomizationStore({
      primary: card ? parseColor(card.primary).toString('hsl') : undefined,
      accent: card ? parseColor(card.accent).toString('hsl') : undefined,
      fontFamily: card?.fontFamily,
      borderStyle: card?.borderStyle
    })
  ).current;

  return (
    <CustomizationContext.Provider value={store}>
      <GlassButton href="/" text="Back" className="fixed left-5 top-5">
        <BackIcon />
      </GlassButton>

      {card ? (
        <>
          <GlassButton href="/" text="Done" className="fixed right-5 top-5" color="dark">
            <DoneIcon />
          </GlassButton>
          <div className="flex h-screen w-screen flex-col items-center justify-center gap-16 bg-[#eaeaea] px-5 md:flex-row">
            <div style={{ width: 300, height: 400 }}>
              <SimplifiedCard id={card._id} />
            </div>

            <div className="hidden h-[380px] w-[500px] items-center justify-center rounded-[45px] bg-[#f5f5f5] p-8 md:flex">
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
