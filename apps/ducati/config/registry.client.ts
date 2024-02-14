import type { Registry, RequestDecorator } from '@smithcommerce/core';
import { RegistryBuilder, TheUndecoratorDecorator } from '@smithcommerce/core';
import React from 'react';
// import { Renderer, defaultSimpleTextRenderer, defaultTextRenderer } from '@smithcommerce/ui';
import { createElement } from 'react';

const requestDecorator: RequestDecorator = new TheUndecoratorDecorator();

export const registry: Registry = new RegistryBuilder(requestDecorator).build();

// TODO:  Reference from the UI lib, but for now this causes ESM issues
const defaultTextRenderer = (text?: string) => {
  return createElement(React.Fragment, null, text);
};

export const renderer = {
  text: defaultTextRenderer,
  simpleText: defaultTextRenderer,
  // TODO - Add Image Renderer Support
  // image: defaultImageRenderer
};

// ######## Uniform Configuration ########
/*
import { DefaultUniformContextCreator, UniformRequestDecorator, uniformTextRenderer } from '@smithcommerce/uniform';
import uniformManifest from './uniform-context.manifest.json';
import { ManifestV2 } from '@uniformdev/context';
import { Renderer } from '@smithcommerce/ui';

const uniformContextCreator = new DefaultUniformContextCreator({ manifest: uniformManifest as ManifestV2 });
const requestDecorator: RequestDecorator = new UniformRequestDecorator(uniformContextCreator);

export const renderer: Renderer = {
  text: uniformTextRenderer,
  simpleText: uniformTextRenderer,
};
*/
