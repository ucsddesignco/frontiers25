'use client';
import SimplifiedCard from '../components/customization/SimplifiedCard';

import { parseColor } from 'react-stately';
import { useCustomizationStore } from '../stores/customizationStore';
import { useCanvasStore, CanvasState } from '../stores/canvasStore';
import { useParams } from 'next/navigation';
import { useShallow } from 'zustand/shallow';

import { useEffect } from 'react';
import { CustomizationPanel } from '../components/customization/CustomizationPanel';
import { CustomizationDrawer } from '../components/customization/CustomizationDrawer';
import GlassButton from '../components/GlassButton/GlassButton';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const cardId = params.cardId as string;

  const router = useRouter();

  const { basePattern } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      basePattern: state.basePattern
    }))
  );
  const card = basePattern.find(c => c._id === cardId);
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
    <div className="relative flex h-screen w-screen flex-col items-center justify-center gap-16 bg-[#eaeaea] px-5 md:flex-row">
      <GlassButton
        text="<-- Back"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        onClick={() => router.push('/')}
      ></GlassButton>

      <GlassButton
        text="Done"
        color="dark"
        className="absolute right-4 top-4 md:right-8 md:top-8"
        onClick={() => alert('done')}
      >
        <CheckIcon className="mr-2 h-5 w-5" />
      </GlassButton>
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
  );
}
