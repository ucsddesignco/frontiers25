'use client';
import SimplifiedCard from '../components/customization/SimplifiedCard';

import { fakeCardData } from '../fake-data/data';
import { parseColor } from 'react-stately';
import { useCustomizationStore } from '../stores/customizationStore';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useEffect } from 'react';
import { CustomizationPanel } from '../components/customization/CustomizationPanel';
import { CustomizationDrawer } from '../components/customization/CustomizationDrawer';

export default function Page() {
  const params = useParams();
  const cardId = params.cardId as string;

  const card = fakeCardData.find(c => c.id === cardId);

  const { setPrimary, setAccent, setFontFamily, setBorderStyle } = useCustomizationStore(
    useShallow(state => ({
      setPrimary: state.setPrimary,
      setAccent: state.setAccent,
      setFontFamily: state.setFontFamily,
      setBorderStyle: state.setBorderStyle
    }))
  );

  useEffect(() => {
    if (card) {
      setPrimary(parseColor(card.primary).toString('hsl'));
      setAccent(parseColor(card.accent).toString('hsl'));
      setFontFamily(card.fontFamily);
      setBorderStyle(card.borderStyle);
    }
  }, [card, setPrimary, setAccent, setFontFamily, setBorderStyle]);

  if (!card) {
    return <h1>Card not found</h1>;
  }

  setPrimary(parseColor(card.primary).toString('hsl'));
  setAccent(parseColor(card.accent).toString('hsl'));
  setFontFamily(card.fontFamily);
  setBorderStyle(card.borderStyle);

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-16 bg-[#eaeaea]">
      <div style={{ width: 300, height: 400 }}>
        <SimplifiedCard id={card.id} />
      </div>

      <div className="flex h-[380px] w-[500px] items-center justify-center rounded-[45px] bg-[#f5f5f5] p-8">
        <CustomizationPanel />
      </div>

      {/* <CustomizationDrawer /> */}
    </div>
  );
}
