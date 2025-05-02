import CreateCardIcon from '../assets/CreateCardIcon';
import GlassButton from './GlassButton/GlassButton';

export default function CreateCard() {
  return (
    <GlassButton
      onMouseDown={e => e.stopPropagation()}
      text="Create A Card"
      color="dark"
      href="/card/new"
    >
      <CreateCardIcon />
    </GlassButton>
  );
}
