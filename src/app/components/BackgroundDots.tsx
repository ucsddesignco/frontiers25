import { memo } from 'react';
import { DOT_BACKGROUND_SIZE } from './constants';

type BackgroundDotsProps = {
  position: { x: number; y: number };
  zoomLevel: number;
};

function BackgroundDots({ position, zoomLevel }: BackgroundDotsProps) {
  const effectiveSize = DOT_BACKGROUND_SIZE * zoomLevel;
  const offsetX = position.x;
  const offsetY = position.y;

  const gradientRadius = Math.max(1, 5 * zoomLevel);

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundSize: `${effectiveSize}px ${effectiveSize}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
        backgroundImage: `radial-gradient(circle, #eeeeee ${gradientRadius}px, rgba(0, 0, 0, 0) ${gradientRadius}px)`
      }}
    ></div>
  );
}

export default memo(BackgroundDots);
