import { memo } from 'react';
import { BackIcon } from '../assets/BackIcon';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import { useCanvasStore } from '../stores/canvasStore';
import GlassButton from './GlassButton/GlassButton';

type ResetButtonProps = {
  handleGalleryClick: () => void;
  handleResetZoom: () => void;
};

function ResetButton({ handleGalleryClick, handleResetZoom }: ResetButtonProps) {
  const showLightFog = useCanvasStore(state => state.showLightFog);
  const showReset = showLightFog;
  return (
    <GlassButton
      onClick={e => {
        e.stopPropagation();
        if (showReset) {
          handleResetZoom();
        } else {
          handleGalleryClick();
        }
      }}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      text={showReset ? 'Reset Zoom' : 'Go Back'}
      className="fixed left-6 top-5 z-[4] hidden lg:block"
    >
      {showReset ? <ResetZoomIcon /> : <BackIcon />}
    </GlassButton>
  );
}

export default memo(ResetButton);
