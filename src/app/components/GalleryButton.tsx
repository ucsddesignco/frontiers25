import { memo } from 'react';
import { BackIcon } from '../assets/BackIcon';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import GlassButton from './GlassButton/GlassButton';

type GalleryButtonProps = {
  handleShowGallery: () => void;
  handleHideGallery: () => void;
  handleGoBack: () => void;
  showMobileGallery: boolean;
  showExpanded: boolean;
};

function GalleryButton({
  handleShowGallery,
  handleHideGallery,
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
          handleShowGallery();
        } else {
          handleHideGallery();
        }
      }}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      text={!showMobileGallery && !showExpanded ? 'Gallery' : 'Go Back'}
      className="fixed left-6 top-5 z-[4] lg:hidden"
    >
      {!showMobileGallery ? <ResetZoomIcon /> : <BackIcon />}
    </GlassButton>
  );
}

export default memo(GalleryButton);
