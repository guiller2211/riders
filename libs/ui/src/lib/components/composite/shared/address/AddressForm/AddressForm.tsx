import { AppRoutes } from '@ducati/types';
import cn from 'classnames';

import { Button, Checkbox, Select, TextField, View } from '../../../../atomic';
import {
  DrawerActionsButtons,
  DrawerContent,
  DrawerFooter,
} from '../../utils';
import { Fields } from './AddressForm.enums';
import { IconSquareFill } from '../../../../../icons';
import styles from './AddressForm.module.css';
import type { AddressFormProps } from './AddressForm.types';

export const AddressForm = (props: AddressFormProps) => {
  const { className, isBilling = false, ...rest } = props;


  return (
    <View className={cn(styles.root, className)} {...rest}>
      <DrawerContent gap={6}>
        <TextField
          size="xlarge"
          name={Fields.FirstName}
          placeholder='Nombre'
        />

        <TextField
          size="xlarge"
          name={Fields.LastName}
          placeholder='Apellido'
        />

        <TextField
          size="xlarge"
          name={Fields.Address}
          placeholder='Direccion'
        />

        <View.Item>
          <Button icon={IconSquareFill} variant="ghost" color="primary">
            Agregar Otra direccion
          </Button>
        </View.Item>

        <Select
          name={Fields.City}
          placeholder='Region'
          size="xlarge"
          options={[{ label: 'Metropolitana', value: 'Metropolitana' }]}
        />

        <Select
          name={Fields.State}
          placeholder='Comuna'
          size="xlarge"
          options={[{ label: 'Santiago', value: 'Santiago' }]}
        />

        <TextField
          size="xlarge"
          name={Fields.ZipCode}
          placeholder='Codigo Postal'
        />

        <TextField
          size="xlarge"
          name={Fields.PhoneNumber}
          placeholder='Numero d etelefono'
        />

        {!isBilling && (
          <Checkbox name={Fields.SetDefaultShippingAddress}>
            Dejar por Defecto?
          </Checkbox>
        )}
      </DrawerContent>

      <DrawerFooter>
        <DrawerActionsButtons
          primaryHref={AppRoutes.Home}
          primaryLabel='Guardar'
        />
      </DrawerFooter>
    </View>
  );
};
