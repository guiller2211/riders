import type { Context } from 'react';
import { createContext } from 'react';

export const initialI18nContext: Map<string, { [index: string]: object }> =
  new Map<string, { [index: string]: object }>();

export const I18nContext: Context<Map<string, { [index: string]: object }>> =
  createContext<Map<string, { [index: string]: object }>>(initialI18nContext);
