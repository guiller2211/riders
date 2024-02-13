import type { TextProps as RSTextProps } from 'reshaped';
import { Text as ReshapedText } from 'reshaped';
import { useContext } from 'react';

import type { RenderProps } from '../../../types/RenderProps.types';
import { RenderContext } from '../../../context';

export interface TextProps<As extends keyof JSX.IntrinsicElements>
  extends RSTextProps<As>,
    RenderProps {
  text?: string;
}

const Text = <As extends keyof JSX.IntrinsicElements>(props: TextProps<As>) => {
  const { text } = useContext(RenderContext);
  const inText = props.text ?? props.children?.toString() ?? '';
  const out = props.renderId ? text(inText, props.renderId) : props.children;

  return <ReshapedText {...props}>{out}</ReshapedText>;
};

export default Text;
