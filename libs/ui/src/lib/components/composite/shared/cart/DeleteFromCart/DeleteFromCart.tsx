import { useState } from 'react';

import { Button, Link, Loader, View } from '../../../../atomic';
import { useTranslation } from '../../../../../hooks';
import type { DeleteFromCartProps } from './DeleteFromCart.types';

const DeleteFromCart = (props: DeleteFromCartProps) => {
  const translate = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCartEntry = async () => {
    setIsLoading(true);

  };

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : props.isButtom ? (
        <Button
          onClick={deleteCartEntry}
          color="primary"
          variant="outline"
          size="medium"
          fullWidth
        >
          {translate('actions.remove', 'layout')}
        </Button>
      ) : (
        <Link onClick={deleteCartEntry}>
          {translate('actions.remove', 'layout')}
        </Link>
      )}
    </View>
  );
};

export default DeleteFromCart;
