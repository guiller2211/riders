import { useState } from 'react';
import type { FormEvent } from 'react';

import {
  Button,
  Card,
  FormControl,
  Link,
  Radio,
  RadioGroup,
  Select,
  Text,
  TextArea,
  TextField,
  View,
} from '../../../../atomic';
import { ValidationUtils } from '../../../../../utils';
import { SendProductProps } from './SendProduct.types';
import { FileUpload, Image, ScrollArea } from 'reshaped';
import { IconX } from '../../../../../icons';

export const SendProduct = (props: SendProductProps) => {
  const { sendForm, isLoading, categories, dataProduct } = props;

  const [category, setCategory] = useState(dataProduct?.categories?.id ?? '');
  const [color, setColor] = useState(dataProduct?.variants?.[0]?.name ?? '');
  const [size, setSize] = useState(dataProduct?.variants?.[1]?.name ?? '');
  const [sku, setsku] = useState(dataProduct?.sku ?? '');
  const [images, setImages] = useState<File[][]>([]);
  const [price, setPrice] = useState(dataProduct?.value.centsAmount ?? '');
  const [description, setDescription] = useState(dataProduct?.description ?? '');
  const [stock, setStock] = useState(dataProduct?.stock?.quantity ?? '');
  const [productName, setProductName] = useState(dataProduct?.name ?? '');
  const [active, setActive] = useState(dataProduct?.active ?? true);
  const [typeHasError, setCategoryHasError] = useState(false);
  const [productNameHasError, setProductNameHasError] = useState(false);
  const [showAdditionalButton, setShowAdditionalButton] = useState(true);

  const handleImageChange = (arg: any) => {
    setImages([...images, arg.value]);
    setShowAdditionalButton(false); // Ocultar el botón adicional después de agregar una imagen
  };
  const isCategoryValid = () => ValidationUtils.isOptionSelected(category);

  const TypeValidation = () => setCategoryHasError(!isCategoryValid());
  const isProductNameValid = () =>
    ValidationUtils.validateMinAndMaxLength(productName, 1, 100) &&
    ValidationUtils.isFieldText(productName);


  const productNameValidation = () => setProductNameHasError(!isProductNameValid());

  console.log(dataProduct)
  const isValidForm = () => {
    return !!(
      isCategoryValid() &&
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

  const optionsType = categories.categoriesData ? categories.categoriesData.map((categoryData: any) => ({
    label: categoryData.type.charAt(0).toUpperCase() + categoryData.type.slice(1),
    value: categoryData.id,
  })) : [];


  const optionsTypeColor = categories.productVariantsData ? Object.entries(categories.productVariantsData[0].color).map(([key, value]: [string, any]) => ({
    label: value,
    value: key,
  })) : [];


  const optionsTypeTalla = categories.productVariantsData ? Object.entries(categories.productVariantsData[1].talla).map(([key, value]: [string, any]) => ({
    label: value,
    value: key,
  })) : [];

  const removeImage = (setIndex: number) => {
    const newImages = [...images];
    newImages.splice(setIndex, 1);
    setImages(newImages);
  };
  const handleAddImage = () => {
    return (
      <FileUpload
        name="image"
        onChange={handleImageChange}
        attributes={{ hidden: !showAdditionalButton }}
      >
        Arrastra Otra imagen
      </FileUpload>
    );
  };
  return (
    <form method="POST" onSubmit={(e) => validateForm(e)} encType="multipart/form-data">
      <View gap={6} direction="row">
        <View.Item columns={6}>
          <FormControl group>
            <FormControl.Label>Activo</FormControl.Label>

            <RadioGroup name="available" defaultValue={active.toString() ?? ''}>
              <View direction='row' gap={2}>
                <Radio value="true" >SI</Radio>
                <Radio value="false" >NO</Radio>
              </View>
            </RadioGroup>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={productNameHasError}>
            <TextField
              name="productName"
              value={productName}
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

        <View.Item columns={6}>
          <FormControl hasError={productNameHasError}>
            <TextField
              name="sku"
              value={sku}
              placeholder='SKU del producto'
              onChange={(e) => setsku(e.value)}
              disabled={isLoading}
              size="xlarge"
              inputAttributes={{
                tabIndex: 2,
                onBlur: () => productNameValidation(),
              }}
            />
            <FormControl.Error>
              error en el nombre
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={typeHasError}>
            <Select
              name="category"
              placeholder="Categoria"
              defaultValue={category}
              onChange={(e) => setCategory(e.value)}
              size="xlarge"
              disabled={isLoading}
              options={optionsType}
              onFocus={() => setCategoryHasError(false)}
              onBlur={() => TypeValidation()}
            />
            <FormControl.Error>
              error
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={typeHasError}>
            <Select
              name="color"
              placeholder="Color"
              defaultValue={color}
              onChange={(e) => setColor(e.value)}
              size="xlarge"
              disabled={isLoading}
              options={optionsTypeColor}
              onFocus={() => setCategoryHasError(false)}
              onBlur={() => TypeValidation()}
            />
            <FormControl.Error>
              error
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <FormControl hasError={typeHasError}>
            <Select
              name="size"
              placeholder="Talla"
              defaultValue={size}
              onChange={(e) => setSize(e.value)}
              size="xlarge"
              disabled={isLoading}
              options={optionsTypeTalla}
              onFocus={() => setCategoryHasError(false)}
              onBlur={() => TypeValidation()}
            />
            <FormControl.Error>
              error
            </FormControl.Error>
          </FormControl>
        </View.Item>

        <View.Item columns={6}>
          <TextField
            name="stock"
            placeholder='Stock'
            defaultValue={stock.toString()}
            onChange={(e) => setStock(e.value)}
            disabled={isLoading}
            size="xlarge"
            inputAttributes={{
              tabIndex: 4,
              minLength: 0,
              maxLength: 100,
              type: 'number',
            }}
          />
        </View.Item>

        <View.Item columns={6}>
          <TextArea
            name="description"
            placeholder='Descripcion'
            defaultValue={description}
            onChange={(e) => setDescription(e.value)}
            disabled={isLoading}
            size="xlarge"
            inputAttributes={{
              tabIndex: 4,
            }}

          />
        </View.Item>

        {
          !dataProduct &&
          <View.Item columns={6}>
            <FileUpload
              name="image"
              onChange={(arg) => setImages([...images, arg.value])}
              attributes={{ hidden: images.length > 0 }}
            >
              Arrastra el Archivo, o{" "}
              <FileUpload.Trigger>
                <Link variant="plain">desde carpeta</Link>
              </FileUpload.Trigger>
            </FileUpload>
            {
              images.length > 0 &&
              <View paddingBlock={4}>
                <Text>Imágenes seleccionadas:</Text>
              </View>
            }
            <View direction='row'>
              {images.map((imageSet, setIndex) => (
                <>
                  <View.Item key={setIndex} columns={3}>
                    {imageSet.map((file, index) => (
                      <>

                        <Image
                          width="80px"
                          height="80px"
                          src={URL.createObjectURL(file)} />
                      </>
                    ))}
                    <Button onClick={() => removeImage(setIndex)}>Eliminar</Button>
                  </View.Item>
                  <View.Item>
                    <FileUpload
                      name="image"
                      onChange={(arg) => setImages([...images, arg.value])}
                      attributes={{ hidden: images.length > (setIndex + 1) }}
                    >
                      Arrastra Otra imagen
                    </FileUpload>
                  </View.Item>
                </>
              ))}
            </View>
          </View.Item>
        }

        <View.Item columns={6}>
          <TextField
            name="price"
            prefix="$"
            defaultValue={dataProduct?.value.centsAmount.toString()}
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

        {dataProduct?.image && (
          <View.Item columns={6}>
            <ScrollArea scrollbarDisplay="visible" height="300px">
              <View gap={3} paddingInline={10} paddingBlock={5} borderColor='disabled'>

                {dataProduct.image && dataProduct.image.map((_url, index) => (
                  <Card key={index}> {/* Agrega la clave key a Card */}
                    <View gap={3} direction="row" align="center">
                      <View.Item grow>
                        <Image
                          width="80px"
                          height="80px"
                          src={_url.url}
                          alt={`Image ${index}`}
                        />
                      </View.Item>
                      <Button
                        icon={IconX}
                      />
                    </View>
                  </Card>
                ))}

              </View>
            </ScrollArea>
          </View.Item>
        )}

        <View.Item columns={6}>
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
            {dataProduct ? 'Guardar' : 'Agregar'}
          </Button>
        </View.Item>
      </View>
    </form >
  );
};

