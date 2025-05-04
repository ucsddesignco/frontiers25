import { cn } from '@/lib/utils';

export default function BevelTriangles({ className }: { className?: string }) {
  return (
    <>
      <div className={cn(className, `accordion-triangle-border left-[0] top-[0]`)}></div>
      <div className={cn(className, `accordion-triangle left-[-1px] top-[-1px]`)}></div>
      <div className={cn(className, `accordion-triangle-border right-0 top-[0] rotate-90`)}></div>
      <div className={cn(className, `accordion-triangle right-[-1px] top-[-1px] rotate-90`)}></div>
      <div
        className={cn(className, `accordion-triangle-border bottom-[0] left-0 rotate-[270deg]`)}
      ></div>
      <div
        className={cn(className, `accordion-triangle bottom-[-1px] left-[-1px] rotate-[270deg]`)}
      ></div>
      <div
        className={cn(className, `accordion-triangle-border bottom-[0] right-0 rotate-180`)}
      ></div>
      <div
        className={cn(className, `accordion-triangle bottom-[-1px] right-[-1px] rotate-180`)}
      ></div>
    </>
  );
}
