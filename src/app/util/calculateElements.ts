import { TransformProperties } from '../components/constants';

interface TransitionProps {
  from: HTMLElement;
  to: HTMLElement;
  parentScale?: number;
}

export function calculateElements({
  from,
  to,
  parentScale = 1
}: TransitionProps): TransformProperties {
  const initialDim = from.getBoundingClientRect();
  const finalDim = to.getBoundingClientRect();

  const initialCenterX = initialDim.left + initialDim.width / 2;
  const initialCenterY = initialDim.top + initialDim.height / 2;
  const expandedCenterX = finalDim.left + finalDim.width / 2;
  const expandedCenterY = finalDim.top + finalDim.height / 2;

  const scaleX = finalDim.width / initialDim.width;
  const scaleY = finalDim.height / initialDim.height;

  const translateX = (expandedCenterX - initialCenterX) / parentScale;
  const translateY = (expandedCenterY - initialCenterY) / parentScale;

  return {
    translateX: translateX,
    translateY: translateY,
    scaleX: scaleX,
    scaleY: scaleY,
    width: finalDim.width,
    height: finalDim.height,
    initialDim: initialDim
  };
}
