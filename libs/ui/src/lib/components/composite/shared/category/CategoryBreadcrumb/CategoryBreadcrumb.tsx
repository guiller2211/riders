import { AppRoutes, type CategoryData } from '@riders/types';

import { Breadcrumbs, Hidden, Icon, Text, View } from '../../../../atomic';
import { IconHome } from '../../../../../icons';
import type { CategoryBreadcrumbProps } from './CategoryBreadcrumb.types';
import { useIsMobile } from '../../../../../utils';
import { bool } from 'yup';

const CategoryBreadcrumb = (props: CategoryBreadcrumbProps) => {
  let categories: { name?: string; url: string }[] = [];
  const isMobile = useIsMobile();

  if (props.category) {
    categories = buildTree(props.category, []);
    if (!props.hiddenHome)
      categories.push({
        url: '/',
        name: 'Home',
      });
    categories = categories.reverse();
  }
  return (
    <View paddingBlock={6} paddingInline={2} backgroundColor='white' borderRadius="medium">
      <Hidden hide={!isMobile}>
        <Breadcrumb visibleItems={2} items={categories} />
      </Hidden>

      <Hidden hide={isMobile}>
        <Breadcrumb visibleItems={6} items={categories} />
      </Hidden>
    </View>
  );
};
export default CategoryBreadcrumb;

const Breadcrumb = (props: {
  visibleItems: number;
  items: { name?: string; url: string }[];
}) => {
  return (
    <Breadcrumbs defaultVisibleItems={props.visibleItems}>
      {props.items.map((item, index) => (
        <Breadcrumbs.Item key={index} href={item.url}>
          {item.url === '/' ? (
            <View gap={1} direction="row" align="center">
              <Icon svg={IconHome} size={5} />
              <Text variant="body-3" color="primary">
                {item.name}
              </Text>
            </View>
          ) : (
            <Text
              variant="body-3"
              color={
                index < props.items.length - 1 ? 'primary' : 'neutral-faded'
              }
            >
              {item.name}
            </Text>
          )}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>
  );
};

function buildTree(
  category: CategoryData,
  categories: { name?: string; url: string }[],
  isAncestors?: boolean,
) {
  if (category.ancestors && category.ancestors.length === 1) {
    buildTree(category.ancestors[0], categories, true);
  }
  categories.push(
    {
      url: isAncestors ?
        AppRoutes.Product + '/' + category?.id
        :
        AppRoutes.Category + '/' + category?.name,
      name: category.name
    }
  );
  return categories;
}
