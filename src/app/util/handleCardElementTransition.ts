import { transitionElement } from './transitionElement';
import { reverseTransitionElement } from './reverseTransitionElement';
import { calculateTransitionValues } from './calculateTransitionValues.ts';
import { MOBILE_BREAKPOINT } from '../components/constants';

type HandleCardElementTransitionProps = {
  parentScale: number;
  clickedCard: HTMLElement | null;
  type: 'open' | 'close' | 'reposition';
  reverse?: boolean;
  onTransitionEnd: () => void;
  setCardIsExpanding: (isTransitioning: boolean) => void;
  expandedCard: HTMLElement | null;
};

export function handleCardElementTransition({
  type,
  parentScale = 1,
  clickedCard,
  onTransitionEnd,
  setCardIsExpanding,
  expandedCard
}: HandleCardElementTransitionProps) {
  const initialElements = calculateTransitionValues(clickedCard, parentScale, expandedCard);
  setCardIsExpanding(true);

  if (type === 'open') {
    const learnMoreData = initialElements.find(element => element.name === 'learn-more');

    if (!learnMoreData) {
      throw new Error('Learn More data not found');
    }

    // Transition all elements except nav elements
    initialElements.forEach((element, index) => {
      if (element.type === 'nav') return;

      transitionElement({
        from: element.element,
        transformProperties: element.data,
        type: element.type,
        parentScale: parentScale,
        onTransitionEnd: () => {
          if (index === initialElements.length - 1) {
            onTransitionEnd();
          }
        }
      });
    });
  } else if (type === 'close') {
    const learnMoreElement = initialElements.find(element => element.name === 'learn-more')
      ?.element as HTMLElement;

    initialElements.forEach((element, index) => {
      if (element.name === 'learn-more') return;
      reverseTransitionElement({
        element: element.element,
        type: element.type,
        onTransitionEnd: () => {
          if (window.innerWidth < MOBILE_BREAKPOINT) {
            if (index === 0) {
              reverseTransitionElement({
                element: learnMoreElement,
                type: 'learn-more',
                onTransitionEnd: () => {
                  onTransitionEnd();
                }
              });
            }
          } else {
            if (index === initialElements.length - 1) {
              reverseTransitionElement({
                element: learnMoreElement,
                type: 'learn-more',
                onTransitionEnd: () => {
                  onTransitionEnd();
                }
              });
            }
          }
        }
      });
    });
  } else if (type === 'reposition') {
    // Reposition cardContent to be same as expandedCard in case user scrolled
    initialElements.forEach(element => {
      const currentTransition = element.element.style.transition;
      if (element.name === 'learn-more') {
        return;
      }
      element.element.style.transition = 'none';

      requestAnimationFrame(() => {
        transitionElement({
          from: element.element,
          transformProperties: element.data,
          type: 'reposition',
          parentScale: parentScale
        });
        requestAnimationFrame(() => {
          element.element.style.transition = currentTransition;
          if (element.name === 'svg') {
            onTransitionEnd();
          }
        });
      });
    });
  }
}
