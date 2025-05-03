import { CanvasState, useCanvasStore } from '@/app/stores/canvasStore';
import { useShallow } from 'zustand/shallow';
import GlassButton from '../GlassButton/GlassButton';
import { useRouter } from 'next/navigation';
import './SelectedIsland.scss';
import { memo } from 'react';
import DuplicateCardIcon from '@/app/assets/DuplicateCardIcon';

type SelectedIslandProps = {
  selectedCard: CanvasState['selectedCard'];
};

const SelectedIsland = ({ selectedCard }: SelectedIslandProps) => {
  const router = useRouter();
  const { showLightFog, basePattern } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      basePattern: state.basePattern,
      showLightFog: state.showLightFog
    }))
  );

  return (
    <div
      id="selected-island"
      className={`${selectedCard && showLightFog ? 'translate-y-0' : 'translate-y-[200%]'} fixed bottom-6 left-0 right-0 z-[2] mx-auto flex w-fit items-center justify-center gap-6 rounded-[32px] py-2 pl-8 pr-[12px] transition-transform duration-300`}
    >
      <p>Selected</p>
      <GlassButton
        text="Duplicate as New"
        size="skinny"
        color="dark"
        onClick={() => {
          if (!selectedCard) {
            return;
          }
          const selectedCardIndex = parseInt(selectedCard);
          const cardId = basePattern[selectedCardIndex]._id;
          router.push(`/card/${cardId}`);
        }}
      >
        <DuplicateCardIcon />
      </GlassButton>
    </div>
  );
};

export default memo(SelectedIsland);
