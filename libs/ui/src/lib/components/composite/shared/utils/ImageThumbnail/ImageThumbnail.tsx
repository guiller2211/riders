import { useState } from 'react';

import { Carousel, Hidden, Icon, Image, Link, View } from '../../../../atomic';
import type { ImageThumbnailProps } from './ImageThumbnail.types';
import { ThumbPoisitionEnum } from './ImageThumbnail.types';
import { IconChevronDown, IconChevronUp } from '../../../../../icons';
import { Image as imageProps } from '@ducati/types';
import styles from './ImageThumbnail.module.css';

const ImageThumbnail = (props: ImageThumbnailProps) => {
  const [current, setCurrent] = useState(0);
  const itemsPerPage = props.visibleItems || 3;
  const [currentPage, setCurrentPage] = useState(1);
  const thumbOnLeft =
    !props.position || props.position === ThumbPoisitionEnum.Left;

  const onSelection = (index: number) => {
    if (index >= currentPage * itemsPerPage) {
      setCurrentPage(currentPage + 1);
    } else if (index < (currentPage - 1) * itemsPerPage) {
      setCurrentPage(currentPage - 1);
    }

    setCurrent(index);
    props.selectedIndex(index);
  };

  const imageThumbnails = props.images?.map((image, index) => (
    <Thumbnail
      key={index}
      current={current}
      image={image}
      index={index}
      onSelection={onSelection}
    />
  ));

  return (
    <View direction="column">
      <View className={styles['mobile-screen']}>
        <Carousel
          gap={3}
          visibleItems={props.visibleItems}
          navigationDisplay="hidden"
        >
          {imageThumbnails}
        </Carousel>
      </View>

      <View className={styles['non-mobile-screen']}>
        {!thumbOnLeft ? (
          <Carousel gap={3} visibleItems={props.visibleItems}>
            {imageThumbnails}
          </Carousel>
        ) : (
          <View direction="column" gap={3} maxWidth={20}>
            <View align="center" direction="column" justify="center">
              <Link
                disabled={current === 0}
                onClick={() => onSelection(current - 1)}
              >
                <Icon svg={IconChevronUp} size={6} />
              </Link>
            </View>
            <Carousel visibleItems={6}>
              <View direction="column" height={128} gap={3}>
                {imageThumbnails?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage,
                )}
              </View>
            </Carousel>
            {props.images && (
              <View align="center" direction="column" justify="center" >
                <Link
                  disabled={current >= props.images.length - 1}
                  onClick={() => onSelection(current + 1)}
                >
                  <Icon svg={IconChevronDown} size={6} />
                </Link>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ImageThumbnail;

const Thumbnail = (props: {
  image: imageProps;
  index: number;
  current: number;
  onSelection: (index: number) => void;
}) => {
  return (
    <Link
      onClick={() => props.onSelection(props.index)}
      attributes={{ style: { margin: 3 } }}
    >
      <View
        width={17}
        backgroundColor="neutral-faded"
        borderColor={props.index === props.current ? 'primary' : 'neutral'}
        borderRadius="small"
        attributes={{
          style: {
            boxShadow:
              props.index === props.current
                ? '0px 0px 0px 3px #E8E7FD'
                : 'unset',
          },
        }}
      >
        <Image
          src={props.image.url}
          borderRadius="small"
          imageAttributes={{ style: { mixBlendMode: 'darken' } }}
          attributes={{ style: { mixBlendMode: 'darken' } }}
        />
      </View>
    </Link>
  );
};
