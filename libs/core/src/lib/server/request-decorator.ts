import type { ReactNode } from 'react';

export type RequestDecoratorParams = {
  request?: Request;
  window?: Window;
  node: ReactNode;
};

export interface RequestDecorator {
  decorateEntry(params: RequestDecoratorParams): ReactNode;
  decorateRoot(params: RequestDecoratorParams): ReactNode;
}

export class TheUndecoratorDecorator implements RequestDecorator {
  decorateEntry(params: RequestDecoratorParams): ReactNode {
    return params.node;
  }

  decorateRoot(params: RequestDecoratorParams): ReactNode {
    return params.node;
  }
}

export class RequestDecoratorChain implements RequestDecorator {
  private decorators: RequestDecorator[];

  constructor(decorators: RequestDecorator[]) {
    this.decorators = decorators;
  }

  decorateEntry(params: RequestDecoratorParams): ReactNode {
    return this.decorators.reduce(
      (node, decorator) => decorator.decorateEntry({ ...params, node }),
      params.node,
    );
  }

  decorateRoot(params: RequestDecoratorParams): ReactNode {
    return this.decorators.reduce(
      (node, decorator) => decorator.decorateRoot({ ...params, node }),
      params.node,
    );
  }
}
