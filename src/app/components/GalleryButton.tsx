import { memo } from 'react';
import { BackIcon } from '../assets/BackIcon';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import GlassButton from './GlassButton/GlassButton';

type GalleryButtonProps = {
  handleGalleryClick: () => void;
  handleGoBack: () => void;
  showMobileGallery: boolean;
};

function GalleryButton({
  handleGalleryClick,
  handleGoBack,
  showMobileGallery
}: GalleryButtonProps) {
  return (
    <GlassButton
      onClick={e => {
        e.stopPropagation();
        if (!showMobileGallery) {
          handleGalleryClick();
        } else {
          handleGoBack();
        }
      }}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      text={!showMobileGallery ? 'Gallery' : 'Go Back'}
      className="fixed left-6 top-5 z-[4] lg:hidden"
    >
      {!showMobileGallery ? <ResetZoomIcon /> : <BackIcon />}
    </GlassButton>
  );
}

export default memo(GalleryButton);
