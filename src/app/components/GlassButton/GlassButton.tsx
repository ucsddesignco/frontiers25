import { CSSProperties, memo, forwardRef } from 'react';
import './GlassButton.scss';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  size?: 'skinny' | 'thick';
  color?: 'light' | 'dark' | 'red';
  width?: 'auto' | 'full';
  href?: string | undefined;
};

const GRADIENT_COLORS = {
  light: '#D8D7D9',
  dark: '#4D4857',
  red: '#560000'
};

const BLUR_COLORS = {
  light: 'bg-[rgba(255,255,255,0.80)]',
  dark: 'bg-[rgba(26,22,34,0.80)]',
  red: 'bg-[rgba(255,0,0,0.80)]'
};

const TEXT_COLORS = {
  light: 'text-[#1A1622]',
  dark: 'text-white',
  red: 'text-white'
};

const TEXT_SHADOW = {
  light: '#FFF',
  dark: 'rgba(0, 0, 0, 0.24)',
  red: 'rgba(0, 0, 0, 0.24)'
};

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      text,
      className = '',
      size = 'thick',
      color = 'light',
      width = 'auto',
      href = undefined,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClass = size === 'skinny' ? 'px-5 h-10' : 'px-6 h-[52px]';
    const blurColorClass = BLUR_COLORS[color];

    const gradientColor = GRADIENT_COLORS[color];
    const textShadowColor = TEXT_SHADOW[color];
    const textColor = TEXT_COLORS[color];
    const widthClass = width === 'full' ? 'w-full' : 'w-auto';

    const ButtonContent = () => (
      <div
        className={`${sizeClass} ${textColor} ${widthClass} glass-button pointer-events-none justify-center`}
      >
        <div className="color-overlay pointer-events-none"></div>
        <div className={`${blurColorClass} blur-background pointer-events-none`}></div>
        <div className="top-highlight pointer-events-none"></div>
        {children}
        <p>{text}</p>
      </div>
    );

    if (href) {
      return (
        <Link
          style={
            {
              '--gradient-color': gradientColor,
              '--text-shadow-color': textShadowColor,
              '--border-radius': '35px'
            } as CSSProperties
          }
          href={href}
          className={`${className} ${widthClass} isolate cursor-pointer select-none focus:outline-none`}
        >
          <ButtonContent />
        </Link>
      );
    } else {
      return (
        <button
          ref={ref}
          style={
            {
              '--gradient-color': gradientColor,
              '--text-shadow-color': textShadowColor,
              '--border-radius': '35px'
            } as CSSProperties
          }
          className={cn(
            'isolate cursor-pointer select-none focus:outline-none',
            widthClass,
            className
          )}
          {...props}
        >
          <ButtonContent />
        </button>
      );
    }
  }
);

GlassButton.displayName = 'GlassButton';

export default memo(GlassButton);
