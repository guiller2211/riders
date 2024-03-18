import { HomePage } from '../ui/pages/home.page';
import { typedjson } from 'remix-typedjson';
import { LayoutUtils } from '../../framework/layout.server';
import type { LoaderArgs } from '@remix-run/node';
import { getAccessories, getMotorcycles } from '../service/data.service';

export async function loader({ }: LoaderArgs) {
  const layout = LayoutUtils.getLayout();
  const motorcycles = await getMotorcycles();
  const accessories = await getAccessories();

  return typedjson({
    layout,
    getMotorcycles: motorcycles ?? [],
    getAccessories: accessories ?? [],
  });
}

export default function Index() {
  return <HomePage />;
}
