import { Link, Tabs } from '../../../atomic';
import type { AccountQuickLinksProps } from './AccountQuickLinks.types';
import { AccountQuickLinksURL } from './AccountQuickLinks.types';
import {
  IconClockHistory,
  IconHeart,
  IconJournal,
  IconPersonCircle,
} from '../../../../icons';
import css from './AccountQuickLinks.module.css';

const AccountQuickLinks = (props: AccountQuickLinksProps) => {

  const { selected, isLoading } = props;

  return (
    <Tabs defaultValue={selected} onChange={() => isLoading(true)}>
      <Tabs.List className={css.quickLinks}>
        <Link href={AccountQuickLinksURL.myAccount}>
          <Tabs.Item value={AccountQuickLinksURL.myAccount}>
            Descripción general
          </Tabs.Item>
        </Link>
        <Link href={AccountQuickLinksURL.personalDetails}>
          <Tabs.Item
            icon={IconPersonCircle}
            value={AccountQuickLinksURL.personalDetails}
          >
            Detalles Personales
          </Tabs.Item>
        </Link>
        <Link href={AccountQuickLinksURL.addresses}>
          <Tabs.Item icon={IconJournal} value={AccountQuickLinksURL.addresses}>
            Direcciones
          </Tabs.Item>
        </Link>
        <Link href={AccountQuickLinksURL.orders}>
          <Tabs.Item
            icon={IconClockHistory}
            value={AccountQuickLinksURL.orders}
          >
            Ordenes
          </Tabs.Item>
        </Link>
        <Link href={AccountQuickLinksURL.wishlist}>
          <Tabs.Item
            icon={IconHeart}
            value={AccountQuickLinksURL.wishlist}
          >
            Productos Deseados
          </Tabs.Item>
        </Link>
      </Tabs.List>
    </Tabs>
  );
};
export default AccountQuickLinks;
