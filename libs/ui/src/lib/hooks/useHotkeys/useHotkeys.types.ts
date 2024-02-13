export type HotkeysProps = {
  hotkeys: (e: KeyboardEvent) => void;
  deps?: (e: KeyboardEvent) => void;
  options?: (e: KeyboardEvent) => void;
};
