import { CanvasState, useCanvasStore } from '@/app/stores/canvasStore';
import { useShallow } from 'zustand/shallow';
import GlassButton from '../GlassButton/GlassButton';
import { useRouter } from 'next/navigation';
import './SelectedIsland.scss';
import { memo } from 'react';

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
      className={`${selectedCard && showLightFog ? 'translate-y-0' : 'translate-y-[200%]'} fixed bottom-8 left-0 right-0 z-[2] mx-auto flex w-fit items-center justify-center gap-6 rounded-[32px] py-2 pl-8 pr-[12px] transition-transform duration-300`}
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
          router.push(`/${cardId}`);
        }}
      >
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6613 0.852398L16.5566 3.85057L19.5548 3.95527L19.5024 5.45436L16.5043 5.34966L16.3996 8.34783L14.9005 8.29548L15.0052 5.29731L12.007 5.19261L12.0594 3.69352L15.0575 3.79822L15.1622 0.800049L16.6613 0.852398Z"
            fill="white"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.57577 5.98935L6.71484 2.00492L10.363 2.13232L10.3107 3.6314L8.1616 3.55636L7.72627 16.0287H16.2312L16.4452 9.90107L17.9443 9.95342L17.6798 17.5287L6.173 17.5287L6.17309 17.5261H0.89778L0.4375 6.20316L6.57577 5.98935ZM6.22544 16.0261L2.33804 16.0261L1.99754 7.64973L6.52332 7.49209L6.22544 16.0261Z"
            fill="white"
          />
        </svg>
      </GlassButton>
    </div>
  );
};

export default memo(SelectedIsland);
