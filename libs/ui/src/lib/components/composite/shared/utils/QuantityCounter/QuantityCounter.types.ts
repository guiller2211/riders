export type QuantityCounterProps = {
  name: string;
  qty?: number;
  min: number;
  max: number;
  step: number;
  size?: 'medium' | 'large';
  changed: (quantity: number) => void;
  showInPlp?: boolean;
  sizeField?: 'large' | 'xlarge';
  showIcon?: boolean;
};
