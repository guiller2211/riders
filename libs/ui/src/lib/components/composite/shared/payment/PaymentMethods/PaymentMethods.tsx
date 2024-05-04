import { View } from '../../../../atomic';
import { GenericActionCard } from '../../utils';
import { PaymentMethod } from '../PaymentMethod';
import type { PaymentMethodsProps } from './PaymentMethods.types';

const PaymentMethods = (props: PaymentMethodsProps) => {
  const { methods } = props;

  const addCardMessage = methods?.length > 0
    ? 'Agregar Nuevo Metodo de pago'
    : 'Agregar un Metodo de Pago';

  return (
    <View direction="row" gap={8}>
      <View.Item columns={{ l: 4, s: 12 }}>
        <GenericActionCard
          cardLabel={addCardMessage}
          drawerTitle='Agregar Metodos de Pago'
        />
      </View.Item>
      {methods?.map((method) => {
        return (
          <View.Item key={method.id} columns={{ l: 4, s: 12 }}>
            <PaymentMethod method={method} canModify />
          </View.Item>
        );
      })}
    </View>
  );
};
export default PaymentMethods;
