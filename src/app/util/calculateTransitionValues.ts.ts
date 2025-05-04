import { MOBILE_BREAKPOINT, TransformProperties } from '../components/constants';
import { calculateElements } from './calculateElements';

export type TransitionElementType = 'nav' | 'button' | 'learn-more' | 'reposition' | '';

type InitialElements = Array<{
  element: HTMLElement;
  name: string;
  type: TransitionElementType;
  data: TransformProperties;
}>;

export const calculateTransitionValues = (
  clickedCard: HTMLElement | null,
  parentScale: number,
  expandedCard: HTMLElement | null
) => {
  if (!clickedCard) {
    throw Error('Missing a Clicked Card!');
  }

  if (!expandedCard) {
    throw Error('Missing a Expanded Card!');
  }

  const initialElements: InitialElements = [];
  const expandedElements: InitialElements = [];

  let timeElementNames = ['time-1', 'time-2'];
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    timeElementNames = ['mobile-time-1', 'mobile-time-2'];
  }

  const elementNames = [
    'svg',
    'date',
    'location',
    ...timeElementNames,
    'description-1',
    'description-2',
    'learn-more',
    'apply-bg',
    'apply-text'
  ];

  function updateElementList(
    parentElement: HTMLElement,
    names: string[],
    elementList: InitialElements
  ) {
    names.forEach(name => {
      const element = parentElement?.querySelector(`.${name}`) as HTMLElement;
      if (element) {
        let type: TransitionElementType = '';
        if (name === 'apply-bg') {
          type = 'button';
        }
        if (name === 'learn-more') {
          type = 'learn-more';
        }
        elementList.push({ element, name, type, data: {} as TransformProperties });
      }
    });
  }

  updateElementList(clickedCard, elementNames, initialElements);

  if (initialElements.length !== elementNames.length) {
    throw Error('Missing a Initial Element!');
  }

  updateElementList(expandedCard, elementNames, expandedElements);

  if (expandedElements.length !== elementNames.length) {
    throw Error('Missing a Expanded Element!');
  }

  for (let i = 0; i < initialElements.length; i++) {
    const initialElement = initialElements[i];
    const expandedElement = expandedElements[i];
    const data = calculateElements({
      from: initialElement.element,
      to: expandedElement.element,
      parentScale: parentScale
    });

    initialElements[i].data = data;
  }

  return initialElements;
};
