import { useCanvasStore } from '@/app/stores/canvasStore';
import './Fog.scss';
import { memo, useEffect, useRef } from 'react';

function Fog() {
  const showMiddleFog = useCanvasStore(state => state.showMiddleFog);
  const showGalleryFog = useCanvasStore(state => state.showGalleryFog);
  const userHasInteracted = useCanvasStore(state => state.userHasInteracted);
  const fogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = fogRef.current;
    if (!element) return;

    const shouldHide = !showMiddleFog || userHasInteracted;
    const handleTransitionEnd = () => {
      if (element && shouldHide) {
        element.style.display = 'none';
      }
    };
    if (shouldHide) {
      element.addEventListener('transitionend', handleTransitionEnd, { once: true });
    }
    return () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [showMiddleFog, userHasInteracted]);

  return (
    <>
      <div
        id="fog"
        ref={fogRef}
        style={{
          opacity: showMiddleFog && !userHasInteracted ? 1 : 0
        }}
        className="pointer-events-none fixed inset-0 z-[1] transition-[opacity] duration-[500ms] ease-in-out"
      ></div>
      <div
        style={{
          opacity: showGalleryFog ? 1 : 0,
          transitionDuration: showGalleryFog ? '1200ms' : '600ms'
        }}
        id="persistent-fog"
        className={`pointer-events-none fixed inset-0 z-[1] transition-[opacity] ease-in-out`}
      ></div>
    </>
  );
}

export default memo(Fog);
