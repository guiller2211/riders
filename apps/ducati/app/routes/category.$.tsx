import type { LoaderArgs } from '@remix-run/node';
import { typedjson } from 'remix-typedjson';
import { CategoryPage } from '../ui/pages/category.page';
import { FacetProps, FacetValueTypeEnum } from '@ducati/ui';
import { LayoutUtils } from '../../framework/layout.server';
import { getMotorcycles } from '../service/data.service';

function getFacetData(): FacetProps[] {
  return [
    {
      name: 'Categorías',
      isOpen: true,
      values: [
        {
          name: 'Nuevas',
          type: FacetValueTypeEnum.Link,
          quantity: 55,
        },
        {
          name: 'Seminuevas',
          type: FacetValueTypeEnum.Link,
          quantity: 33,
        }
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

export async function loader({}: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const products = await getMotorcycles();

  return typedjson({
    layout,
    facets: getFacetData(),
    getProduct: products ?? [],
  });
}

export default function Index() {
  return <CategoryPage />;
}
