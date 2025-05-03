type MobileGalleryFogProps = {
  showFog: boolean;
};

export default function MobileGalleryFog({ showFog }: MobileGalleryFogProps) {
  const scaleClass = showFog ? 'scale-[1]' : 'scale-[1.5]';
  const opacityClass = showFog ? 'opacity-100' : 'opacity-0';
  const delayClass = showFog ? 'delay-[0.1s]' : 'delay-0';
  return (
    <>
      <div
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(233, 233, 233, 0) 0%, rgba(233, 233, 233, 1) 50%)'
        }}
        className={`${opacityClass} ${scaleClass} duration-[0.25s] pointer-events-none fixed inset-0 z-[4] transition-[transform,opacity] ease-in-out md:hidden`}
      ></div>
      <div
        className={`${opacityClass} ${delayClass} pointer-events-none fixed inset-0 z-[4] bg-[rgb(233,233,233)] transition-opacity ease-in-out`}
      ></div>
    </>
  );
}
