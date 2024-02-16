import { useState } from "react";
import { Hidden, View } from "../../../../atomic";
import ImageThumbnail from "../ImageThumbnail/ImageThumbnail";
import ImageZoom from "../ImageZoom";
import { ImageGalleryProps } from "./ImageGallery.types";

const ImageGallery = (props: ImageGalleryProps) => {
  const [imageSelected, setImageSelected] = useState(0);
  return (
    props.images &&
    <View direction={{s: 'column', l: 'row'}} gap={{l: 8, s: 6}}>
      <Hidden hide={{ s: true, l: false }}>
        <View.Item grow>
          <ImageThumbnail images={props.images} selectedIndex={setImageSelected}  />
        </View.Item>
      </Hidden>
      <View.Item columns={{s:12,l: 'auto'}}>
        <ImageZoom src={props.images[imageSelected].url} />
      </View.Item>
      <Hidden hide={{ s: false, l: true }}>
      <View.Item columns={12}>
          <ImageThumbnail images={props.images} selectedIndex={setImageSelected}  />
        </View.Item>
      </Hidden>
    </View>
  );
}
export default ImageGallery;
