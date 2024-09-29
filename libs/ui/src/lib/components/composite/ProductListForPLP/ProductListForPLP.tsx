import { ProductCardForPLP } from '../ProductCardForPLP';
import { View, useResponsiveClientValue } from 'reshaped';
import { ProductListForPLPProps } from './ProductListForPLP.types';
import { useIsMobile } from '../../../utils';

export const ProductListForPLP = (props: ProductListForPLPProps) => {
  const { products, sendForm, isLoading, isGridView} = props;
  const isMobile = useIsMobile(); 
  const columns = isMobile ? 12 : 4 ; 
  
  return (
    <View direction="row" gap={6}>
      {products?.map((product, index) =>
        <View.Item columns={isGridView ? columns : 12} key={index}>
          <ProductCardForPLP
            product={product}
            isGridView={isGridView}
            sendForm={sendForm}
            isLoading={isLoading}
          />
        </View.Item>
      )}
    </View>
  );
};
