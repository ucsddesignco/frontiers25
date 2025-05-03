import { memo } from 'react';
import { BackIcon } from '../assets/BackIcon';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import GlassButton from './GlassButton/GlassButton';

type GalleryButtonProps = {
  handleMobileGalleryFog: (show: boolean) => void;
  handleGoBack: () => void;
  showMobileGallery: boolean;
  showExpanded: boolean;
};

function GalleryButton({
  handleMobileGalleryFog,
  handleGoBack,
  showMobileGallery,
  showExpanded
}: GalleryButtonProps) {
  return (
    <GlassButton
      onClick={e => {
        e.stopPropagation();
        if (showExpanded) {
          handleGoBack();
        } else if (!showMobileGallery) {
          handleMobileGalleryFog(true);
        } else {
          handleMobileGalleryFog(false);
        }
      }}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      text={!showMobileGallery && !showExpanded ? 'Gallery' : 'Go Back'}
      className="fixed left-6 top-5 z-[4] md:hidden"
    >
      {!showMobileGallery && !showExpanded ? <ResetZoomIcon /> : <BackIcon />}
    </GlassButton>
  );
}

export default memo(GalleryButton);
