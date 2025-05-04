import { CanvasState, useCanvasStore } from '@/app/stores/canvasStore';
import { useShallow } from 'zustand/shallow';
import GlassButton from '../GlassButton/GlassButton';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import DuplicateCardIcon from '@/app/assets/DuplicateCardIcon';
import { Session } from '@/lib/auth';
import GlassIsland from '../GlassIsland/GlassIsland';

type SelectedIslandProps = {
  selectedCard: CanvasState['selectedCard'];
  session: Session | null;
};

const SelectedIsland = ({ selectedCard, session }: SelectedIslandProps) => {
  const router = useRouter();
  const { showLightFog, basePattern } = useCanvasStore(
    useShallow((state: CanvasState) => ({
      basePattern: state.basePattern,
      showLightFog: state.showLightFog
    }))
  );

  const selectedCardIndex = selectedCard ? parseInt(selectedCard) : 0;

  const isUsersCard = selectedCard && session?.user.id === basePattern[selectedCardIndex].user;

  const cardId = selectedCard ? basePattern[selectedCardIndex]._id : '';

  return (
    <GlassIsland className={selectedCard && showLightFog ? 'translate-y-0' : 'translate-y-[200%]'}>
      {!isUsersCard && <p className="pl-2">Selected</p>}
      {isUsersCard && (
        <>
          <GlassButton
            text="Edit Card"
            size="skinny"
            color="light"
            onClick={() => {
              router.push(`/card/${cardId}`);
            }}
          />
        </>
      )}
      <GlassButton
        text="Duplicate as New"
        size="skinny"
        color="dark"
        onClick={() => {
          router.push(`/card/new/${cardId}`);
        }}
      >
        <DuplicateCardIcon />
      </GlassButton>
    </GlassIsland>
  );
};

export default memo(SelectedIsland);
