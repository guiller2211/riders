import React from 'react';
import type { BreadcrumbsProps } from 'reshaped';
import { Breadcrumbs as ReshapedBreadcrumbs } from 'reshaped';

const Breadcrumbs = (props: BreadcrumbsProps) => {
  return <ReshapedBreadcrumbs {...props} />;
};

Breadcrumbs.Item = ReshapedBreadcrumbs.Item;
export default Breadcrumbs;
