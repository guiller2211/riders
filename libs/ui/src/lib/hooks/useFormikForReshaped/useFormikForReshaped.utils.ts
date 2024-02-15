import type { ChangeHandler } from 'reshaped/types/global';

export const mapEventKeyToParam =
  (fn: (event: unknown) => void): ChangeHandler<string> =>
  ({ event }) =>
    fn(event);
