import { TransformProperties } from '../components/constants';
import { TransitionElementType } from './calculateTransitionValues.ts';

type TransitionProps = {
  from: HTMLElement;
  transformProperties: TransformProperties;
  type: TransitionElementType;
  parentScale?: number;
  onTransitionEnd?: () => void;
};

export function transitionElement({
  from: initialElement,
  transformProperties,
  type,
  onTransitionEnd,
  parentScale = 1
}: TransitionProps) {
  const { translateX, translateY, scaleX, scaleY, width, height, initialDim } =
    transformProperties as TransformProperties;

  if (type === 'reposition') {
    const previousTranslateMatrix = new DOMMatrix(initialElement.style.transform);
    const previousTranslateX = previousTranslateMatrix.e;
    const previousTranslateY = previousTranslateMatrix.f;
    const previousScaleX = previousTranslateMatrix.a;
    const previousScaleY = previousTranslateMatrix.d;
    initialElement.style.transform = `translate(${previousTranslateX}px, ${previousTranslateY + translateY}px) scale(${previousScaleX}, ${previousScaleY})`;
    return initialElement;
  }

  function handleTransitionEnd() {
    initialElement.removeEventListener('transitionend', handleTransitionEnd);
    // This resets the learn more position to the original position which makes the next transition cycle look better
    if (type === 'learn-more') {
      initialElement.style.transform = 'scale(0.1)';
    }
    if (onTransitionEnd) onTransitionEnd();
  }

  initialElement.addEventListener('transitionend', handleTransitionEnd);

  if (type === 'learn-more') {
    initialElement.style.transform = `translate(${transformProperties.translateX}px, ${transformProperties.translateY + transformProperties.height / 2}px) scale(0.1)`;
    initialElement.style.opacity = '0';
    return initialElement;
  }

  if (type === 'nav') {
    initialElement.style.transition = `transform var(--card-duration-half) ease-in-out, opacity var(--card-duration-half) linear`;
    initialElement.style.opacity = '1';
    initialElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

    return initialElement;
  }

  if (type === 'button' && initialDim) {
    const newWidth = width / parentScale;
    const newHeight = height / parentScale;

    initialElement.style.width = `${newWidth}px`;
    initialElement.style.height = `${newHeight}px`;

    const newTranslateX = translateX - (width - initialDim.width) / parentScale / 2;
    const newTranslateY = translateY - (height - initialDim.height) / parentScale / 2;

    initialElement.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;

    return initialElement;
  }

  initialElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

  return initialElement;
}
