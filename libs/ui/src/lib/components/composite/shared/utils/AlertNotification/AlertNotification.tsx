import { Alert, Link } from '../../../../atomic';
import { AlertNotificationColor, AlertNotificationProps } from './AlertNotification.types';
import { AlertNotificationEnum } from './AlertNotificationEnum';
import { IconCheckCircle, IconExclamationCircle, IconInfoCircle, IconXCircle } from '../../../../../icons';

const AlertNotification = (props: AlertNotificationProps) => {

  let color: AlertNotificationColor;
  let icon;
  switch (props.type) {
    case AlertNotificationEnum.Success: {
      color = 'positive';
      icon = IconCheckCircle;
      break;
    }
    case AlertNotificationEnum.Info: {
      color = 'primary';
      icon = IconInfoCircle;
      break;
    }
    case AlertNotificationEnum.Warning: {
      color = 'neutral';
      icon = IconExclamationCircle;
      break;
    }
    case AlertNotificationEnum.Error: {
      color = 'critical';
      icon = IconXCircle;
      break;
    }
  }

  return (
    <Alert
      inline
      icon={icon}
      color={color}
      title={props.message ? props.message : ''}
      actionsSlot={
        <Link variant="plain" color="inherit" onClick={props.close}>
          Cerrar
        </Link>
      }
    />
  );
};
export default AlertNotification;
