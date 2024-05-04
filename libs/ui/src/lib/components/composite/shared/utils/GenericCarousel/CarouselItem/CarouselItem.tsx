import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { TabsItemProps } from 'reshaped/components/Tabs';

import { Tabs } from '../../../../../atomic';
import type { CarouselItemProps } from './CarouselItem.types';

export const CarouselItem = forwardRef(
  <T,>(
    props: CarouselItemProps<T>,
    ref: Ref<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    return <Tabs.Item {...(props as TabsItemProps)} ref={ref} />;
  },
);
