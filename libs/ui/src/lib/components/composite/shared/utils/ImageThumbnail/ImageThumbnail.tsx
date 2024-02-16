import { Carousel, Hidden, Icon, Image, Link, View } from '../../../../atomic';
import { useState } from 'react';
import { ImageThumbnailProps } from './ImageThumbnail.types';
import {  IconChevronDown, IconChevronUp } from '../../../../../icons';

const ImageThumbnail = (props: ImageThumbnailProps) => {
  const [ current, setCurrent ] = useState(0);

  const onSelection = (index: number) => {
    setCurrent(index);
    props.selectedIndex(index);
  };
  return (
    <View direction='column'>
      <Hidden hide={{l:true, s:false}}>
        <Carousel gap={3} visibleItems={4} navigationDisplay='hidden'>
          {
            props.images?.map((image, index) => (
              <Thumbnail key={index}
                current={current}
                image={image.url}
                index={index}
                onSelection={onSelection}
              />
            ))
          }
        </Carousel>
      </Hidden>

      <Hidden hide={{l:false, s:true}}>
        <View direction='column' gap={3} >
          <View align='center' direction='column' justify='center'>
            <Link disabled={current === 0} onClick={() => onSelection(current - 1)}>
              <Icon svg={IconChevronUp} size={6} />
            </Link>
          </View>
          <Carousel visibleItems={6}>
            <View direction='column' height={128} gap={3}>
            {
              props.images?.map((image, index) => (
                <Thumbnail key={index}
                  current={current}
                  image={image.url}
                  index={index}
                  onSelection={onSelection}
                />
              ))
            }
            </View>
          </Carousel>
          {
            props.images &&
            <View align='center' direction='column' justify='center'>
              <Link disabled={current >= props.images.length - 1} onClick={() => onSelection(current + 1)} >
                <Icon svg={IconChevronDown} size={6} />
              </Link>
            </View>
          }
        </View>
      </Hidden>
    </View>
  );
};

export default ImageThumbnail;

const Thumbnail = (props: {
  image: string,
  index: number,
  current: number,
  onSelection: (index: number) => void;
}) => {
  return (
    <Link onClick={() => props.onSelection(props.index)} attributes={{ style: { margin: 3} }}>
      <View padding={1}
        width={17}
        height={17}
        backgroundColor='neutral-faded'
        borderColor={props.index === props.current ? 'primary' : 'neutral'}
        borderRadius='small'
        attributes={{
          style: {
            boxShadow: props.index === props.current ? '0px 0px 0px 3px #E8E7FD' : 'unset',
          }
        }}>
        <Image src={props.image} borderRadius='small'
          imageAttributes={{ style: { mixBlendMode: 'darken' } }}
          attributes={{ style: { mixBlendMode: 'darken' } }}
        />
      </View>
    </Link>
  );
}
