import { useState } from 'react';

import { Hidden, View } from '../../../../atomic';
import ImageThumbnail, { ThumbPoisitionEnum } from '../ImageThumbnail';
import ImageZoom from '../ImageZoom';
import type { ImageGalleryProps } from './ImageGallery.types';
import styles from './ImageGallery.module.css';

const ImageGallery = (props: ImageGalleryProps) => {
  const [imageSelected, setImageSelected] = useState(0);
  return (
    <View>
      <View className={styles['non-mobile-screen']}>
        <DesktopGallery
          gallery={props}
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
        />
      </View>
      <View className={styles['mobile-screen']}>
        <MobileGallery
          gallery={props}
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
        />
      </View>
    </View>
  );
};
export default ImageGallery;

const DesktopGallery = (props: {
  gallery: ImageGalleryProps;
  imageSelected: number;
  setImageSelected: (index: number) => void;
}) => {
  const thumbOnLeft =
    !props.gallery.thumbPosition;

  return (
    props.gallery?.images?.length &&
    props.gallery.images.length > 0 && (
      <View gap={8} direction={thumbOnLeft ? 'row' : 'column'}>
        {thumbOnLeft && (
          <View maxWidth={20}>
            <ImageThumbnail
              visibleItems={6}
              images={props.gallery.images}
              selectedIndex={props.setImageSelected}
            />
          </View>
        )}
        <ImageZoom src={props.gallery.images[props.imageSelected].url} />
        {!thumbOnLeft && (
          <View maxWidth={145}>
            <ImageThumbnail
              visibleItems={6}
              images={props.gallery.images}
              position={props.gallery.thumbPosition}
              selectedIndex={props.setImageSelected}
            />
          </View>
        )}
      </View>
    )
  );
};

const MobileGallery = (props: {
  gallery: ImageGalleryProps;
  imageSelected: number;
  setImageSelected: (index: number) => void;
}) => {
  return (
    props.gallery?.images?.length &&
    props.gallery.images.length > 0 && (
      <View gap={6} direction="column">
        <View.Item columns={12}>
          <ImageZoom src={props.gallery.images[props.imageSelected].url} />
        </View.Item>
        <View.Item columns={12}>
          <ImageThumbnail
            visibleItems={4}
            images={props.gallery.images}
            selectedIndex={props.setImageSelected}
          />
        </View.Item>
      </View>
    )
  );
};
