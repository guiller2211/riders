import type { IObject } from '../types';

export const findById = <T extends IObject>(id: string, list: T[]) =>
  list.find((item) => item.id === id);
