import { AlertNotificationEnum } from './AlertNotificationEnum';

export type AlertNotificationColor = 'positive' | 'neutral' | 'critical' | 'primary' | undefined;
export type AlertNotificationProps = {
  message: string;
  type: AlertNotificationEnum;
  close: () => void;
};
