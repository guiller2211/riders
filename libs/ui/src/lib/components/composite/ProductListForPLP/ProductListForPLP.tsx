import { ProductCardForPLP } from '../ProductCardForPLP';
import { View } from '../../atomic';
import { ProductListForPLPProps } from './ProductListForPLP.types';
import { useResponsiveClientValue } from '../../../hooks';

export const ProductListForPLP = (props: ProductListForPLPProps) => {
  const { products } = props;

  return (
    <View direction="row" gap={5}>
      {products?.map((item, index) => ( 
        <View.Item
          columns={useResponsiveClientValue({ s: 12, l: 4 })}
          key={index}
        >
            <ProductCardForPLP product={item}/>         
        </View.Item>
      ))}
    </View>
  );
};

