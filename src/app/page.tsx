'use client';

import { useEffect } from 'react';
import InfiniteCanvas from './components/InfiniteCanvas';
import { useCanvasStore } from './stores/canvasStore';

export default function Home() {
  const setCardSize = useCanvasStore(state => state.setCardSize);

  useEffect(() => {
    const descriptionElement = document.querySelector('[data-expanded-description]') as HTMLElement;
    const PADDING = 36;
    if (!descriptionElement) return;
    let width = 300;
    let height = 400;
    let gap = 100;

    if (window.innerWidth < 768) {
      width = Math.min(window.innerWidth * 0.8, 320);
      height = width * (4 / 3);
      gap = 65;
    }
    setCardSize({ width, height, gap });
    descriptionElement.style.width = `${width - 2 * PADDING}px`;
  }, [setCardSize]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <InfiniteCanvas />
      </main>
    </div>
  );
}
