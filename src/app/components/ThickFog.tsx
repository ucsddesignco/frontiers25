import { memo, RefObject, useEffect, useRef } from 'react';

function ThickFog({
  status,
  isInitialLoad
}: {
  status: 'selected' | 'previous';
  isInitialLoad: RefObject<boolean>;
}) {
  const fogRef = useRef<HTMLDivElement>(null);
  // This is to properly transition Fog because it renders before the card is selected
  useEffect(() => {
    requestAnimationFrame(() => {
      if (fogRef.current) {
        if (status === 'previous') {
          console.log('weee previous');
          fogRef.current.style.opacity = '0';
        } else {
          fogRef.current.style.opacity = '1';
        }
      }
    });
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
    }
  }, [isInitialLoad, status]);

  const opacityClass = status === 'previous' ? 'opacity-100 z-[1]' : 'opacity-0  z-[2]';

  const transitionClass = isInitialLoad.current
    ? ''
    : 'transition-opacity duration-[0.35s] ease-in-out';

  return (
    <div
      ref={fogRef}
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(233, 233, 233, 0.5) 0%, rgba(232, 232, 232, 1) 50%)'
      }}
      className={`${opacityClass} ${transitionClass} pointer-events-none absolute left-1/2 top-1/2 h-[200vh] w-[200vw] -translate-x-1/2 -translate-y-1/2`}
    ></div>
  );
}

export default memo(ThickFog);
