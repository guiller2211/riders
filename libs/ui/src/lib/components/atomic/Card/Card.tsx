import React from 'react';
import type { CardProps } from 'reshaped';
import { Card as ReshapedCard } from 'reshaped';

const Card = (props: CardProps) => {
  return <ReshapedCard {...props}>{props.children}</ReshapedCard>;
};
export default Card;
