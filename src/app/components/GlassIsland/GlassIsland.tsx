import { cn } from '@/lib/utils';
import './GlassIsland.scss';

type GlassIslandProps = {
  className?: string;
  children: React.ReactNode;
};

export const GlassIsland = ({ className, children }: GlassIslandProps) => {
  return (
    <div
      id="glass-island"
      className={cn(
        `fixed bottom-6 left-0 right-0 z-[2] mx-auto flex w-fit items-center justify-center gap-4 rounded-[32px] px-[12px] py-2 ps-4 transition-transform duration-300`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassIsland;
