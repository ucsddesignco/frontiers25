import { memo } from 'react';
import CreateCardIcon from '../assets/CreateCardIcon';
import GlassButton from './GlassButton/GlassButton';

function CreateCard({ className }: { className?: string }) {
  return (
    <GlassButton
      className={className}
      onMouseDown={e => e.stopPropagation()}
      text="Create A Card"
      color="dark"
      href="/card/new"
    >
      <CreateCardIcon />
    </GlassButton>
  );
}

export default memo(CreateCard);
