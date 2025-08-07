import { useRouter } from 'next/navigation';
import GlassButton from './GlassButton/GlassButton';
import MyCardsIcon from '../assets/MyCardsIcon';

export default function MyCardsButton() {
  const router = useRouter();

  return (
    <GlassButton
      onClick={() => router.push('/my-cards')}
      onMouseDown={e => e.stopPropagation()}
      text="My Cards"
      className="hidden md:block"
    >
      <MyCardsIcon />
    </GlassButton>
  );
}
