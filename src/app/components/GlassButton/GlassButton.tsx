import { CSSProperties, memo, forwardRef } from 'react';
import './GlassButton.scss';
import Link from 'next/link';

type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  size?: 'skinny' | 'thick';
  color?: 'light' | 'dark';
  width?: 'auto' | 'full';
  href?: string;
};

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      text,
      className = '',
      size = 'thick',
      color = 'light',
      width = 'auto',
      href = '',
      children,
      ...props
    },
    ref
  ) => {
    const sizeClass = size === 'skinny' ? 'px-5 h-10' : 'px-6 h-[52px]';
    const blurColorClass =
      color === 'light' ? 'bg-[rgba(255,255,255,0.80)]' : 'bg-[rgba(26,22,34,0.80)]';
    const gradientColor = color === 'light' ? '#D8D7D9' : '#4D4857';
    const textShadowColor = color === 'light' ? '#FFF' : 'rgba(0, 0, 0, 0.24)';
    const textColor = color === 'light' ? 'text-[#1A1622]' : 'text-white';
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
          href={href}
          className={`${className} ${widthClass} isolate cursor-pointer select-none focus:outline-none`}
        >
          <ButtonContent />
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        style={
          {
            '--gradient-color': gradientColor,
            '--text-shadow-color': textShadowColor
          } as CSSProperties
        }
        className={`${className} ${widthClass} isolate cursor-pointer select-none focus:outline-none`}
        {...props}
      >
        <ButtonContent />
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default memo(GlassButton);
