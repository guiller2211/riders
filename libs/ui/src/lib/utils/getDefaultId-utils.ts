import type { IObject } from '../types';
import { getDefault } from './getDefault-utils';

export const getDefaultId = <T extends IObject>(
  spaceName: keyof T,
  list: T[],
) => getDefault(spaceName, list)?.id;
