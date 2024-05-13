import cn from 'classnames';
import { Checkbox, Select, TextField, View } from '../../../../atomic';
import {
  DrawerActionsButtons,
  DrawerContent,
  DrawerFooter,
} from '../../utils';
import { Fields } from './AddressForm.enums';
import { IconSquareFill } from '../../../../../icons';
import styles from './AddressForm.module.css';
import type { AddressFormProps } from './AddressForm.types';
import { FormEvent, useState } from 'react';
import { communes, regions } from '@ducati/types';

export const AddressForm = (props: AddressFormProps) => {
  const { className, isBilling = false, sendForm, initialValues, ...rest } = props;
  console.log(initialValues)
  const [uid, setUid] = useState(initialValues?.id ?? '');
  const [firstName, setFirstName] = useState(initialValues?.firstName ?? '');
  const [lastName, setLastName] = useState(initialValues?.lastName ?? '');
  const [address, setAddress] = useState(initialValues?.streetName ?? '');
  const [city, setCity] = useState(initialValues?.city ?? '');
  const [state, setState] = useState(initialValues?.state ?? '');
  const [email, setEmail] = useState(initialValues?.email ?? '');
  const [zipCode, setZipCode] = useState(initialValues?.postalCode ?? '');
  const [phoneNumber, setPhoneNumber] = useState(initialValues?.phone ?? '');
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(initialValues?.defaultShippingAddress ?? false);
  const [getCommunes, setGetCommunes] = useState<any>();

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const defaultAddress = formData.get('defaultAddress') as string;
    console.log(defaultAddress)
    sendForm && sendForm(e);
  };

  const filterCommunesByRegion = (region: any) => {
    setCity(region);
    console.log(city, "aqui");
  
    const filteredCommunes = communes.filter(commune => commune.idRegion === region);
  
    const options = filteredCommunes.map(commune => ({
      label: commune.name,
      value: commune.uid
    }));
  
    setGetCommunes(options);
  };
  
  
  const optionRegion = regions.map(region => ({
    label: region.name,
    value: region.uid
  }));

  return (
    <form method="POST" onSubmit={(e) => validateForm(e)}>
      <View className={cn(styles.root, className)} {...rest}>
        <DrawerContent gap={6}>
          <TextField
            name='addressUid'
            value={uid}
            attributes={{ style: { display: 'none' } }} />
          <TextField
            name={Fields.FirstName}
            size="xlarge"
            value={firstName}
            onChange={(e: any) => setFirstName(e.value)}
            placeholder='Nombre'
          />

          <TextField
            name={Fields.LastName}
            size="xlarge"
            value={lastName}
            onChange={(e: any) => setLastName(e.value)}
            placeholder='Apellido'
          />

          <TextField
            name={Fields.Email}
            size="xlarge"
            value={email}
            onChange={(e: any) => setEmail(e.value)}
            placeholder='Email'
          />

          <TextField
            name={Fields.Address}
            size="xlarge"
            value={address}
            onChange={(e: any) => setAddress(e.value)}
            placeholder='Direccion'
          />

          <Select
            name={Fields.Region}
            onChange={(e: any) => filterCommunesByRegion(e.value)}
            placeholder='Region'
            size="xlarge"
            value={city}
            options={optionRegion}
          />

          <Select
            name={Fields.State}
            onChange={(e: any) => setState(e.value)}
            placeholder='Comuna'
            size="xlarge"
            options={getCommunes}
          />

          <TextField
            name={Fields.ZipCode}
            size="xlarge"
            value={zipCode}
            onChange={(e: any) => setZipCode(e.value)}
            placeholder='Codigo Postal'
          />

          <TextField
            name={Fields.PhoneNumber}
            size="xlarge"
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.value)}
            placeholder='Numero de telefono'
          />

          <Checkbox
            name={Fields.DefaultAddress}
            checked={defaultShippingAddress}
            onChange={(e: any) => setDefaultShippingAddress(e.value)}>
            Dejar por Defecto?
          </Checkbox>
        </DrawerContent>

        <DrawerFooter>
          <DrawerActionsButtons
            primaryLabel='Guardar'
            type='submit'
          />
        </DrawerFooter>
      </View>
    </form>
  );
};
