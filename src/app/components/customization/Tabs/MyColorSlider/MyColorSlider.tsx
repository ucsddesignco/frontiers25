import type { ColorSliderProps } from 'react-aria-components';
import { ColorSlider, SliderTrack, ColorThumb } from 'react-aria-components';

interface MyColorSliderProps extends ColorSliderProps {
  label?: string;
}

export function MyColorSlider({ ...props }: MyColorSliderProps) {
  return (
    <ColorSlider {...props} className="grid grid-cols-[1fr_auto] flex-col items-center gap-2">
      <SliderTrack
        style={{
          boxShadow: '0px -1px 1px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px #FFF'
        }}
        className="col-span-2 h-2 w-full flex-none overflow-visible rounded-lg"
      >
        <ColorThumb
          style={{
            boxShadow: '0px 2px 12px 0px rgba(250, 22, 34, 0.10) inset'
          }}
          className="color-thumb left-[50%] top-[50%] grid h-8 w-8 place-items-center rounded-full border border-white hover:cursor-pointer"
        >
          <div
            style={{ boxShadow: '0px 2px 0px 0px #FFF inset' }}
            className="h-[26px] w-[26px] rounded-full"
          ></div>
        </ColorThumb>
      </SliderTrack>
    </ColorSlider>
  );
}
