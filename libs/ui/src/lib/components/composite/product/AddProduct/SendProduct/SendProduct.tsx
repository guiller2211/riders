import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import {
  Button,
  FormControl,
  Link,
  Select,
  Text,
  TextArea,
  TextField,
  View,
} from '../../../../atomic';
import { ValidationUtils } from '../../../../../utils';
import { SendProductProps } from './SendProduct.types';
import { FileUpload } from 'reshaped';

export const SendProduct = (props: SendProductProps) => {
  const { sendForm, isLoading } = props;

  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productName, setProductName] = useState('');

  const [typeHasError, setTypeHasError] = useState(false);
  const [productNameHasError, setProductNameHasError] = useState(false);

  const isTypeValid = () => ValidationUtils.isOptionSelected(type);

  const TypeValidation = () => setTypeHasError(!isTypeValid());
  const isProductNameValid = () =>
    ValidationUtils.validateMinAndMaxLength(productName, 1, 100) &&
    ValidationUtils.isFieldText(productName);


  const productNameValidation = () => setProductNameHasError(!isProductNameValid());


  const isValidForm = () => {
    return !!(
      isTypeValid() &&
      isProductNameValid()
    );
  };

  const validateForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidForm()) {
      sendForm(e);
    } else {
      TypeValidation();
      productNameValidation();
    }
  };


  return (
    <form method="POST" onSubmit={(e) => validateForm(e)} encType="multipart/form-data">
      <View gap={6} direction="row">

        <View.Item columns={12}>
          <FormControl hasError={productNameHasError}>
            <TextField
              name="productName"
              placeholder='Nombre del producto'
              onChange={(e) => setProductName(e.value)}
              disabled={isLoading}
              size="xlarge"
              inputAttributes={{
                tabIndex: 2,
                onFocus: () => setProductNameHasError(false),
                onBlur: () => productNameValidation(),
              }}
            />
            <FormControl.Error>
              error en el nombre
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={12}>
          <FormControl hasError={typeHasError}>
            <Select
              name="type"
              placeholder="tipo"
              onChange={(e) => setType(e.value)}
              size="xlarge"
              disabled={isLoading}
              options={[
                { label: 'Moto', value: 'motorcycles' },
                { label: 'Accesorios', value: 'accessories' },

              ]}
              onFocus={() => setTypeHasError(false)}
              onBlur={() => TypeValidation()}
              inputAttributes={{
                'aria-label': "tipo",
                tabIndex: 1,
              }}
            />
            <FormControl.Error>
              error
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={12}>
          <Select
            name="category"
            placeholder="categoria"
            onChange={(e) => setCategory(e.value)}
            size="xlarge"
            disabled={isLoading}
            options={[
              { label: 'Nuevo', value: 'NUEVO' },
              { label: 'Seminuevo', value: 'SEMINUEVO' },

            ]}
            onFocus={() => setTypeHasError(false)}
            onBlur={() => TypeValidation()}
            inputAttributes={{
              'aria-label': "tipo",
              tabIndex: 1,
            }}
          />
        </View.Item>

        <View.Item columns={12}>
          <TextArea
            name="description"
            placeholder='Descripcion'
            onChange={(e) => setDescription(e.value)}
            disabled={isLoading}
            size="xlarge"
            inputAttributes={{
              'aria-label': 'Email',
              tabIndex: 4,
            }}
          />
        </View.Item>

        <View.Item columns={12}>
          <Text>Agregar Imagen</Text>
          <FileUpload name="image" onChange={(arg) => setImage(arg.value)}>
            Arrastra el Archivo, o{" "}
            <FileUpload.Trigger>
              <Link variant="plain">desde carpeta</Link>
            </FileUpload.Trigger>
          </FileUpload>
          {image.length > 0 && (
            <View>
              <Text>Imágenes seleccionadas:</Text>
              {image.map((file, index) => (
                <View.Item key={index}>
                  <img src={URL.createObjectURL(file)} alt={`Imagen ${index}`} style={{ maxWidth: '100px' }} />
                </View.Item>
              ))}
            </View>
          )}
        </View.Item>

        <View.Item columns={12}>
          <TextField
            name="price"
            prefix="$"
            placeholder='Indique el preico'
            onChange={(e) => setPrice(e.value)}
            disabled={isLoading}
            size="xlarge"
            inputAttributes={{
              tabIndex: 6,
              type: 'number'
            }}
          />
        </View.Item>

        <View.Item columns={12}>
          <Button
            color="primary"
            size="xlarge"
            loading={isLoading}
            type="submit"
            fullWidth
            attributes={{
              'aria-label': 'Agregar',
              tabIndex: 9,
            }}
          >
            Agregar
          </Button>
        </View.Item>
      </View>
    </form>
  );
};

