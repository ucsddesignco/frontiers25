import { useCanvasStore } from '@/app/stores/canvasStore';
import { memo } from 'react';

function LightFog() {
  const showLightFog = useCanvasStore(state => state.showLightFog);

  return (
    <>
      <div
        style={{
          opacity: showLightFog ? 1 : 0,
          transitionDuration: showLightFog ? '1200ms' : '600ms',
          backgroundImage:
            'radial-gradient(closest-corner,rgba(255, 0, 0, 0) 50%,rgba(233, 233, 233, 0.5) 70%,rgba(233, 233, 233, 0.8) 100%)'
        }}
        className={`pointer-events-none fixed inset-0 z-[1] hidden transition-[opacity] ease-in-out lg:block`}
      ></div>
    </>
  );
}

export default memo(LightFog);
