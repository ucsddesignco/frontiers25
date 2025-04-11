import { useEffect, RefObject } from 'react';
import { DOT_BACKGROUND_SIZE } from '../components/constants'; // Adjust path as needed

type Position = {
  x: number;
  y: number;
};

type UseBackgroundDotsProps = {
  backgroundRef: RefObject<HTMLDivElement | null>;
  position: Position;
  zoomLevel: number;
};

export const useBackgroundDots = ({
  backgroundRef,
  position,
  zoomLevel
}: UseBackgroundDotsProps) => {
  useEffect(() => {
    if (!backgroundRef.current) return;

    const effectiveSize = DOT_BACKGROUND_SIZE * zoomLevel;
    const offsetX = position.x;
    const offsetY = position.y;

    // Ensure zoomLevel doesn't cause negative size/radius
    const gradientRadius = Math.max(1, 5 * zoomLevel);

    // Direct style manipulation for performance
    const style = backgroundRef.current.style;
    style.backgroundSize = `${effectiveSize}px ${effectiveSize}px`;
    style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    style.backgroundImage = `radial-gradient(circle, #eeeeee ${gradientRadius}px, rgba(0, 0, 0, 0) ${gradientRadius}px)`;
  }, [position, zoomLevel, backgroundRef]); // Include backgroundRef in dependencies
};
