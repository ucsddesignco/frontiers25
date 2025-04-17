import { CSSProperties, memo } from 'react';
import './GlassButton.scss';

type GlassButtonProps = {
  text: string;
  className?: string;
  size?: 'skinny' | 'thick';
  color?: 'light' | 'dark';
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function GlassButton({
  text,
  className = '',
  size = 'thick',
  color = 'light',
  children,
  onClick,
  onMouseDown
}: GlassButtonProps) {
  const sizeClass = size === 'skinny' ? 'px-5 h-10' : 'px-6 h-[52px]';
  const blurColorClass =
    color === 'light' ? 'bg-[rgba(255,255,255,0.80)]' : 'bg-[rgba(26,22,34,0.80)]';
  const gradientColor = color === 'light' ? '#D8D7D9' : '#4D4857';
  const textShadowColor = color === 'light' ? '#FFF' : 'rgba(0, 0, 0, 0.24)';
  const textColor = color === 'light' ? 'text-[#1A1622]' : 'text-white';

  return (
    <div className={`${className} isolate`}>
      <button
        style={
          {
            '--gradient-color': gradientColor,
            '--text-shadow-color': textShadowColor
          } as CSSProperties
        }
        className={`${sizeClass} ${textColor} glass-button cursor-pointer`}
        onClick={onClick}
        onMouseDown={onMouseDown}
      >
        <div className="color-overlay"></div>
        <div className={`${blurColorClass} blur-background`}></div>
        <div className="top-highlight"></div>
        {children}
        <p>{text}</p>
      </button>
    </div>
  );
}

export default memo(GlassButton);
