import type { ReactElement, Ref } from 'react';

import type { CarouselItemProps } from './CarouselItem';
import type { ViewProps } from '../../../../atomic';

export type GenericCarouselProps<T> = Omit<ViewProps, 'children'> & {
  changeAfterNavigation?: boolean;
  children:
    | ReactElement<CarouselItemProps<T>>
    | ReactElement<CarouselItemProps<T>>[];
  onChange?: (value: T) => void;
  title?: string;
  value?: T;
};

export type CarouselRef = Ref<{
  onNextHandler: VoidFunction;
  onPreviousHandler: VoidFunction;
  setTabByIndex: (index: number, action: CarouselNavigationActionEnum) => void;
}>;

export enum CarouselNavigationActionEnum {
  NoNavigate = 0,
  NavigateLeft,
  NavigateRight,
}
