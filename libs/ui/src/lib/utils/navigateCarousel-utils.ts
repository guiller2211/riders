export const navigateCarousel = async <T>(
  list: T[],
  currentValue: string,
  direction: 'forward' | 'backward',
): Promise<string> => {
  if (list && list.length > 0) {
    const currentIndex = list.findIndex(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        item.id === currentValue,
    );

    if (currentIndex !== -1) {
      let newIndex: number;

      if (direction === 'forward') {
        newIndex = Math.min(currentIndex + 1, list.length - 1);
      } else {
        newIndex = Math.max(currentIndex - 1, 0);
      }

      const newItem = list[newIndex];

      if (newItem && typeof newItem === 'object' && 'id' in newItem) {
        return newItem.id as string;
      }
    }
  }

  return currentValue;
};
