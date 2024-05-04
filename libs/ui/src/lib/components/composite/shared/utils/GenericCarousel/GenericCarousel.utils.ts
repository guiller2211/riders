import e from 'express';
import type { MutableRefObject } from 'react';

import { CarouselNavigationActionEnum } from '.';

export const focusElementByIndex = (
  index: number,
  references: MutableRefObject<React.RefObject<HTMLElement>[]>,
  action: CarouselNavigationActionEnum,
  scrollEl?: HTMLUListElement,
) => {
  const element = references.current[index].current;
  if (element && scrollEl) {
    scrollEl.scrollBy({
      left:
        CarouselNavigationActionEnum.NavigateLeft === action
          ? -element.clientWidth
          : element.clientWidth,
      top: 0,
      behavior: 'smooth',
    });
  }
};
