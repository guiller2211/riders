import type { LoaderFunctionArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { CategoryPage } from '../ui/pages/category.page';
import { FacetProps, FacetValueTypeEnum } from '@ducati/ui';
import { LayoutUtils } from '../../framework/layout.server';

function getFacetData(): FacetProps[] {
  return [
    {
      name: 'Categorías',
      isOpen: true,
      values: [
        {
          name: 'Deportivas',
          type: FacetValueTypeEnum.Link,
          quantity: 55,
        },
        {
          name: 'Naked',
          type: FacetValueTypeEnum.Link,
          quantity: 33,
        },
        {
          name: 'Custom',
          type: FacetValueTypeEnum.Link,
          quantity: 11,
        },
      ],
    },
    {
      name: 'Tipos de Motos',
      isOpen: true,
      values: [
        {
          name: 'Motos Eléctricas',
          type: FacetValueTypeEnum.Checkbox,
          quantity: 42,
        },
        {
          name: 'Motos de Gasolina',
          type: FacetValueTypeEnum.Checkbox,
          quantity: 75,
        },
        {
          name: 'Scooters',
          type: FacetValueTypeEnum.Checkbox,
          quantity: 28,
        },
      ],
    },
    {
      name: 'Descuentos',
      values: [],
    },
    {
      name: 'Precio',
      values: [],
    },
    {
      name: 'CC',
      values: [],
    },
  ];
}

export async function loader({}: LoaderFunctionArgs) {
  const layout = LayoutUtils.getLayout();

  return typedjson({
    layout,
    facets: getFacetData(),
    getProduct:  [],
  });
}

export default function Index() {
  return <CategoryPage />;
}
