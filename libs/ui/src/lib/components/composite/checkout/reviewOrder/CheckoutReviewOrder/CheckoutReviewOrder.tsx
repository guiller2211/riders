import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Accordion,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Text,
  TextField,
  View,
} from '../../../../atomic';
import { CartEntry, OrderSummary } from '../../../cart';
import { CheckoutOverview } from '../../../order';
import { Loading } from '../../../shared';
import { useCart, useOrder } from '../../../../../providers';
import { useTranslation } from '../../../../../hooks';
import type { CheckoutReviewOrderProps } from './CheckoutReviewOrder.types';

const CheckoutReviewOrder = (props: CheckoutReviewOrderProps) => {
  const { cart, isActive, overview } = props;
  const { summary } = useCart();
  const { createFromCart } = useOrder();
  const [agreed, toggleAgreed] = useState(false);

  const translate = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [active, setIsActive] = useState(isActive);
  const [poNumber, setPONumber] = useState('');
  const [poNumberHasError, setPONumberHasError] = useState(false);

  const isPONumberValid = () => poNumber.trim();
  const ponumberValidation = () => setPONumberHasError(!isPONumberValid());
  const navigate = useNavigate();

  const placeOrder = async () => {
    setIsLoading(true);

    try {
      if (isPONumberValid()) {
        await createFromCart(poNumber);

        navigate('/order-confirmation');
      } else {
        ponumberValidation();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error); // eslint-disable-line no-console
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <Loading
      ariaLabel={translate('loader.ariaLabel', 'layout')}
      size="xlarge"
      text={{ message: translate('loader.message', 'layout') }}
      view={{
        align: 'center',
        justify: 'center',
        paddingBlock: 20,
        paddingInline: 0,
      }}
    />
  ) : (
    <View
      borderRadius="small"
      borderColor="neutral"
      padding={8}
      backgroundColor={active ? 'white' : 'disabled'}
    >
      <View.Item>
        <Accordion
          defaultActive={active}
          onToggle={(active) => setIsActive(active)}
        >
          <Accordion.Trigger>
            <View direction="row" gap={4}>
              <Text variant="featured-3">3</Text>
              <Text variant="featured-3">
                {translate('review.title', 'checkoutReviewOrder')}
              </Text>
            </View>
          </Accordion.Trigger>

          <Accordion.Content>
            <View paddingTop={10}>
              <FormControl>
                <View direction="row">
                  <View.Item columns={12}>
                    <View direction="row" paddingBottom={8}>
                      <View.Item columns={12}>
                        <CheckoutOverview overview={overview} />
                      </View.Item>
                    </View>
                  </View.Item>
                  <View
                    direction="row"
                    paddingStart={8}
                    paddingEnd={8}
                    gap={10}
                  >
                    <View.Item columns={12}>
                      <View direction="column" gap={3}>
                        <View.Item columns={12}>
                          <Text variant="featured-3">
                            {' '}
                            {translate(
                              'placeholder.poNumber',
                              'checkoutReviewOrder',
                            )}
                          </Text>
                        </View.Item>
                        <View.Item columns={12}>
                          <FormControl hasError={poNumberHasError}>
                            <TextField
                              name="PONumber"
                              placeholder={translate(
                                'placeholder.poNumber',
                                'checkoutReviewOrder',
                              )}
                              size="large"
                              onChange={(e) => setPONumber(e.value)}
                            />
                            <FormControl.Error>
                              {translate(
                                'forms.validations.required',
                                'layout',
                              )}
                            </FormControl.Error>
                          </FormControl>
                        </View.Item>
                      </View>
                    </View.Item>
                    <View.Item columns={12}>
                      <View paddingBottom={4} divided>
                        {cart.entries.map((entry, index) => (
                          <View.Item columns={12} key={index}>
                            <CartEntry entry={entry} viewCart="ReadOnly" />
                          </View.Item>
                        ))}
                      </View>
                    </View.Item>

                    <View.Item columns={12}>
                      <OrderSummary
                        shippingTotal={summary.shippingTotal}
                        salesTax={summary.salesTax}
                        subTotal={summary.subTotal}
                        total={summary.total}
                      />
                    </View.Item>
                    <View.Item columns={12}>
                      <Divider />
                    </View.Item>

                    <View.Item columns={12}>
                      <Checkbox
                        name="agree"
                        onChange={() => toggleAgreed(!agreed)}
                      >
                        {translate('review.check', 'checkoutReviewOrder')}
                      </Checkbox>
                    </View.Item>

                    <View.Item columns={12}>
                      <Button
                        color="primary"
                        size="xlarge"
                        fullWidth
                        type="submit"
                        onClick={placeOrder}
                        disabled={!agreed}
                      >
                        {translate('review.btn', 'checkoutReviewOrder')}
                      </Button>
                    </View.Item>
                  </View>
                </View>
              </FormControl>
            </View>
          </Accordion.Content>
        </Accordion>
      </View.Item>
    </View>
  );
};

export default CheckoutReviewOrder;
