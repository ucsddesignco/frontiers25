import { CardType } from '../components/constants';
import { useEffect } from 'react';
import { useCanvasStore } from '../stores/canvasStore';
import { Session } from '@/lib/auth';

interface InitializeCardsProps {
  data: CardType[];
  session: Session | null;
}

export function useInitializeCards({ data, session }: InitializeCardsProps) {
  const { setBasePattern } = useCanvasStore();

  useEffect(() => {
    setBasePattern(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, session?.user?.id]);
}
