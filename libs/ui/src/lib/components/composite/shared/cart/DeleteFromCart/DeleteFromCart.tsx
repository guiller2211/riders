import { useState } from 'react';

import { Button, Link, Loader, View } from '../../../../atomic';
import type { DeleteFromCartProps } from './DeleteFromCart.types';

const DeleteFromCart = (props: DeleteFromCartProps) => {
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
          Remover
        </Button>
      ) : (
        <Link onClick={deleteCartEntry}>
          Remover
        </Link>
      )}
    </View>
  );
};

export default DeleteFromCart;
