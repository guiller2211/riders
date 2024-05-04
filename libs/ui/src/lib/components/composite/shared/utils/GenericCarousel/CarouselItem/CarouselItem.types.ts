import type { TabsItemProps } from 'reshaped/components/Tabs';

export type CarouselItemProps<T = unknown> = Omit<TabsItemProps, 'value'> & {
  value: T;
};
