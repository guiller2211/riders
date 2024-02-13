import React from 'react';
import { Facet } from '../index';
import { IconSliders } from '../../../../../icons';
import { useResponsiveClientValue, useTranslation } from '../../../../../hooks';
import { View, Button, Hidden } from '../../../../atomic';
import type { FacetsProps } from './Facets.types';

const Facets = (props: FacetsProps) => {
  const { facets } = props;
  const translate = useTranslation();
  return (
    <View>
      <Hidden hide={useResponsiveClientValue({ s: true, l: false })}>
        <View direction="column" gap={8}>
          <View.Item columns={12}>
            {facets?.map((facet, index) => (
              <Facet
                key={index}
                name={facet.name}
                values={facet.values}
                isOpen={facet.isOpen}
                visibleLimit={facet.visibleLimit}
              />
            ))}
          </View.Item>
        </View>
      </Hidden>
      <Hidden hide={useResponsiveClientValue({ s: false, l: true })}>
        <View direction="column" gap={8}>
          <View.Item columns={12}>
            <Button
              icon={IconSliders}
              size="xlarge"
              color="primary"
              variant="outline"
              fullWidth
            >
              {translate('category.actions.showFilter')}
            </Button>
          </View.Item>
        </View>
      </Hidden>
    </View>
  );
};

export default Facets;
