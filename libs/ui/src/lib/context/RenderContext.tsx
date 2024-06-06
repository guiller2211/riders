import { createContext } from 'react';
// import { ImageProps } from 'reshaped';

// import { Image as ReshapedImage } from "reshaped";

/**
 * text:  text output elements
 * simpleText: "raw" text, such as button text
 * image: img output or its equivalent
 */
export interface Renderer {
  text: (text?: string, id?: string) => JSX.Element;
  simpleText: (text?: string, id?: string) => JSX.Element;
  searchBox: () => JSX.Element;
  // TODO - Add Image Support
  // image: (props: ImageProps) => JSX.Element;
}

export const defaultTextRenderer = (text?: string) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{text}</>;
};

export const defaultSimpleTextRenderer = (text?: string) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{text}</>;
};

export const defaultSearchBoxRenderer = () => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{}</>;
};

// TODO - Add Default Image Renderer Implementation
// export const defaultImageRenderer = (props: ImageProps) => {
// return (<ReshapedImage {...props} />);
// }

export const RenderContext = createContext<Renderer>({
  text: defaultTextRenderer,
  simpleText: defaultSimpleTextRenderer,
  searchBox: defaultSearchBoxRenderer,
  // TODO - Add Image Renderer Support
  // image: defaultImageRenderer
});
