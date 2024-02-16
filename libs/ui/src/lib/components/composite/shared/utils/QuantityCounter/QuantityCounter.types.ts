export type QuantityCounterProps = {
  name: string;
  min: number;
  max: number;
  step: number;
  size?: 'medium' | 'large';
  changed: (quantity: number) => void;
}
