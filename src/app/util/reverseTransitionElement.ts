type TransitionProps = {
  element: HTMLElement;
  type: string;
  onTransitionEnd?: () => void;
};

export function reverseTransitionElement({
  element: initialElement,
  type,
  onTransitionEnd
}: TransitionProps) {
  function handleTransitionEnd() {
    initialElement.removeEventListener('transitionend', handleTransitionEnd);
    if (onTransitionEnd) {
      // Nav elements need to be scaled to 1 after being scaled to 0.1.
      // This is so the elements can properly transition for the next opening cycle
      if (type === 'nav') {
        initialElement.style.transform = 'scale(1)';
      }
      onTransitionEnd();
    }
  }

  initialElement.addEventListener('transitionend', handleTransitionEnd);

  if (type === 'learn-more') {
    initialElement.style.opacity = '1';
    initialElement.style.transform = 'scale(1)';
    return initialElement;
  }
  if (type === 'button') {
    initialElement.style.width = '100%';
    initialElement.style.height = '100%';
    initialElement.style.transform = '';
    return initialElement;
  }

  if (type === 'nav') {
    initialElement.style.transform = 'scale(0.1)';
    initialElement.style.opacity = '0';
    return initialElement;
  }

  initialElement.style.transform = 'scale(1)';

  return initialElement;
}
