import { memo } from 'react';
import ResetZoomIcon from '../assets/ResetZoomIcon';
import GlassButton from './GlassButton/GlassButton';

function SignInButton() {
  return (
    <GlassButton
      onClick={e => {}}
      onMouseDown={e => {
        e.stopPropagation();
      }}
      text="Sign In"
      className="fixed right-9 top-5 z-[4]"
    >
      {<ResetZoomIcon />}
    </GlassButton>
  );
}

export default memo(SignInButton);
