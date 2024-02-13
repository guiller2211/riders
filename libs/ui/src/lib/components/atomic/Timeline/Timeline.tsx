import React from 'react';
import type { TimelineProps } from 'reshaped';
import { Timeline as ReshapedTimeline } from 'reshaped';

const Timeline = (props: TimelineProps) => {
  return <ReshapedTimeline {...props} />;
};

Timeline.Item = ReshapedTimeline.Item;
export default Timeline;
