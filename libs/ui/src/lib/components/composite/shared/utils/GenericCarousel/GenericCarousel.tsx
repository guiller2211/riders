import type { ReactElement } from 'react';
import {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { equals, findIndex } from 'ramda';
import { InstanceRef } from 'reshaped/components/Carousel/Carousel.types';

import {
  Button,
  Carousel as AtomicCarousel,
  Icon,
  Tabs,
  View,
  Text,
} from '../../../../atomic';
import { focusElementByIndex } from './GenericCarousel.utils';
import { IconChevronLeft, IconChevronRight } from '../../../../../icons/Arrows';
import type { TabsProps } from '../../../../atomic';
import {
  CarouselNavigationActionEnum,
  type GenericCarouselProps,
  type CarouselRef,
} from './GenericCarousel.types';
import type { CarouselItemProps } from './CarouselItem';

const GenericCarouselInner = <T,>(
  props: GenericCarouselProps<T>,
  ref: CarouselRef,
) => {
  const {
    changeAfterNavigation = false,
    children,
    onChange,
    title,
    value,
    ...rest
  } = props;

  const isControlled = value !== undefined;

  const { findIndexByValue, findValueByIndex, totalItems } = useMemo(() => {
    const values = Children.toArray(children).map((child) => {
      const { value } = (child as ReactElement<CarouselItemProps<T>>).props;
      return value;
    });

    const findIndexByValue = (value: T) => findIndex(equals(value), values);

    const findValueByIndex = (index: number) => values[index];

    const totalItems = Children.count(children);

    return {
      findIndexByValue,
      findValueByIndex,
      totalItems,
      values,
    };
  }, [children]);
  const { getActionByIndexesValues } = useMemo(() => {
    const getActionByIndexesValues = (
      nextIndex: number,
      previousIndex: number,
    ) => {
      return previousIndex < nextIndex
        ? CarouselNavigationActionEnum.NavigateRight
        : CarouselNavigationActionEnum.NavigateLeft;
    };
    return {
      getActionByIndexesValues,
    };
  }, []);
  const [currentIndex, setCurrentIndex] = useState(() =>
    value ? findIndexByValue(value) : 0,
  );
  const [previousIndex, setPreviousIndex] = useState(() =>
    value ? findIndexByValue(value) : 0,
  );
  const [scrollEl, setScrollEl] = useState<HTMLUListElement | undefined>(
    undefined,
  );
  const references = useRef(
    Array.from({ length: totalItems }).map(() => createRef<HTMLDivElement>()),
  );
  const wrapperRef = useRef<HTMLElement>(null);

  const setTabByIndex = useCallback(
    (index: number, action: CarouselNavigationActionEnum) => {
      if (isControlled) {
        setCurrentIndex(index);
      }
      focusElementByIndex(index, references, action, scrollEl);
      if (changeAfterNavigation && onChange) {
        const value = findValueByIndex(index);
        onChange(value);
      }
    },
    [references, changeAfterNavigation, isControlled, totalItems, scrollEl],
  );

  const onChangeHandler: TabsProps['onChange'] = ({ value }) => {
    const nextIndex = Number(value);

    if (isControlled) {
      setCurrentIndex(nextIndex);
    }
    if (onChange) {
      const value = findValueByIndex(nextIndex);
      onChange(value);
    }
  };

  const onNextHandler = useCallback(() => {
    setTabByIndex(
      Math.min(currentIndex + 1, totalItems - 1),
      CarouselNavigationActionEnum.NavigateRight,
    );
  }, [currentIndex, setTabByIndex, totalItems, scrollEl]);

  const onPreviousHandler = useCallback(() => {
    setTabByIndex(
      Math.max(currentIndex - 1, 0),
      CarouselNavigationActionEnum.NavigateLeft,
    );
  }, [currentIndex, setTabByIndex, scrollEl]);

  useEffect(() => {
    const el = wrapperRef?.current?.querySelector('ul');
    if (el) setScrollEl(el);
  }, [wrapperRef]);

  useEffect(() => {
    if (value) {
      const nextIndex = findIndexByValue(value);
      setCurrentIndex(nextIndex);
      focusElementByIndex(
        nextIndex,
        references,
        getActionByIndexesValues(nextIndex, previousIndex),
        scrollEl,
      );
    }
  }, [value, scrollEl]);

  useEffect(() => {
    setPreviousIndex(currentIndex);
  }, [currentIndex]);

  useImperativeHandle(
    ref,
    () => ({
      onPreviousHandler,
      onNextHandler,
      setTabByIndex,
    }),
    [onPreviousHandler, onNextHandler, setTabByIndex],
  );

  return (
    <View {...rest}>
      {title && (
        <Text variant="body-2" weight="bold">
          {title}
        </Text>
      )}

      <AtomicCarousel
        attributes={{
          ref: wrapperRef,
        }}
        navigationDisplay="hidden"
      >
        <Tabs value={currentIndex.toString()} onChange={onChangeHandler}>
          <Tabs.List>
            {Children.map(children, (child, index) => {
              return cloneElement(child, {
                ref: references.current[index],
                value: index.toString(),
              } as unknown as CarouselItemProps<T>);
            })}
          </Tabs.List>
        </Tabs>
      </AtomicCarousel>

      <View
        gap={3}
        align="end"
        justify="end"
        direction="row"
        width="100%"
        paddingTop={5}
      >
        <Button
          color="primary"
          onClick={onPreviousHandler}
          rounded
          size="xlarge"
          variant="outline"
        >
          <Icon autoWidth svg={IconChevronLeft} />
        </Button>

        <Button
          color="primary"
          onClick={onNextHandler}
          rounded
          size="xlarge"
          variant="outline"
        >
          <Icon autoWidth svg={IconChevronRight} />
        </Button>
      </View>
    </View>
  );
};
export const GenericCarousel = forwardRef(GenericCarouselInner) as <T>(
  props: GenericCarouselProps<T>,
  ref: CarouselRef,
) => ReactElement;
