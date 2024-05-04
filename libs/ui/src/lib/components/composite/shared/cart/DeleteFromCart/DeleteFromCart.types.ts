import { ButtonProps } from "reshaped";

export type DeleteFromCartProps = {
  entryId: string;
  quantity: number;
  variant: 'solid' | 'outline' | 'ghost' | 'faded';
  isMiniCart?: boolean;
  color?:
    | 'black'
    | 'white'
    | 'primary'
    | 'critical'
    | 'positive'
    | 'neutral'
    | 'inherit';
  isButtom?: boolean;
  onClick?: ButtonProps['onClick']
};
