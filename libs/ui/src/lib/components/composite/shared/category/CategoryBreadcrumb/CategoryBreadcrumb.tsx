import type { CategoryData } from '@riders/types';

import { Breadcrumbs, Hidden, Icon, Text, View } from '../../../../atomic';
import { IconHome } from '../../../../../icons';
import type { CategoryBreadcrumbProps } from './CategoryBreadcrumb.types';

const CategoryBreadcrumb = (props: CategoryBreadcrumbProps) => {
  let categories: { name?: string; url: string }[] = [];

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
    <View paddingBlock={6} paddingInline={0}>
      <Hidden hide={{ s: false, l: true }}>
        <Breadcrumb visibleItems={2} items={categories} />
      </Hidden>

      <Hidden hide={{ s: true, l: false }}>
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
) {
  categories.push({ url: `/category/${category.id}`, name: category.name });
  if (category.ancestors && category.ancestors.length === 1) {
    buildTree(category.ancestors[0], categories);
  }
  return categories;
}
