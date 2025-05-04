import { cn } from '@/lib/utils';

export default function BevelTriangles({ className }: { className?: string }) {
  return (
    <>
      <div className={cn(className, `accordion-triangle-border left-[1px] top-[1px]`)}></div>
      <div className={cn(className, `accordion-triangle left-[-1px] top-[-1px]`)}></div>
      <div
        className={cn(className, `accordion-triangle-border right-[1px] top-[1px] rotate-90`)}
      ></div>
      <div className={cn(className, `accordion-triangle right-[-1px] top-[-1px] rotate-90`)}></div>
      <div
        className={cn(
          className,
          `accordion-triangle-border bottom-[1px] left-[1px] rotate-[270deg]`
        )}
      ></div>
      <div
        className={cn(className, `accordion-triangle bottom-[-1px] left-[-1px] rotate-[270deg]`)}
      ></div>
      <div
        className={cn(className, `accordion-triangle-border bottom-[1px] right-[1px] rotate-180`)}
      ></div>
      <div
        className={cn(className, `accordion-triangle bottom-[-1px] right-[-1px] rotate-180`)}
      ></div>
    </>
  );
}
