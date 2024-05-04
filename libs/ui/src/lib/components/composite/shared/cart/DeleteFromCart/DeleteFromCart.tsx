import { useState } from 'react';

import { Button, Link, Loader, View } from '../../../../atomic';
import type { DeleteFromCartProps } from './DeleteFromCart.types';

const DeleteFromCart = (props: DeleteFromCartProps) => {
  const { isButtom, onClick } = props;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      {isLoading ? (
        <Loader />
      ) : isButtom ? (
        <Button
          onClick={onClick}
          color="primary"
          variant="outline"
          size="medium"
          fullWidth
        >
          Remover
        </Button>
      ) : (
        <Link onClick={onClick}>
          Remover
        </Link>
      )}
    </View>
  );
};

export default DeleteFromCart;
