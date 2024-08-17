import { View, Image, Button } from '../../../../atomic';
import { IconArrowsAngleExpand } from "../../../../../icons";
import { ImageZoomProps } from './ImageZoom.types';
import { useState } from 'react';
import { Icon } from 'reshaped';
import { useResponsiveClientValue } from '../../../../../hooks';

const ImageZoom = (props: ImageZoomProps) => {
  const [zoom, setZoom] = useState(false);

  const zoomClick =()=>{
    setZoom(!zoom);
  }
  return (
    <View direction="row"
      borderColor='neutral-faded'
      borderRadius='small' backgroundColor='white' width='80%'>
      <View.Item columns={12}>
        <View borderRadius="medium" overflow="hidden" padding={2}>
          <Image src={props.src} width={useResponsiveClientValue({l: 'auto', s: '100%'})} />
          <div style={{ position: "absolute", top: 12, right: 12 }}>
            <View backgroundColor='white'
              borderRadius='circular'
              borderColor='neutral-faded'>
              <Button
                color="inherit"
                variant="solid"
                size='large'
                onClick={zoomClick}>
                <Icon svg={IconArrowsAngleExpand} color='primary' size={5} />
              </Button>
            </View>
          </div>
        </View>
      </View.Item>
    </View>
  );
};

export default ImageZoom;
