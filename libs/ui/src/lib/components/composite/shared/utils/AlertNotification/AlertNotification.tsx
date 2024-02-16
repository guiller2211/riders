import { Alert, Link } from '../../../../atomic';
import { AlertNotificationColor, AlertNotificationProps } from './AlertNotification.types';
import { AlertNotificationEnum } from './AlertNotificationEnum';
import { IconCheckCircle, IconExclamationCircle, IconInfoCircle, IconXCircle } from '../../../../../icons';
import { TranslationFunction, useTranslation } from '../../../../../hooks';

const AlertNotification = (props: AlertNotificationProps) => {
  const translate: TranslationFunction = useTranslation();

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
      title={props.message ? translate(props.message) : ''}
      actionsSlot={
        <Link variant="plain" color="inherit" onClick={props.close}>
          {translate('actions.close', 'layout')}
        </Link>
      }
    />
  );
};
export default AlertNotification;
