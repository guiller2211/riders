export type AccountQuickLinksProps = {
  selected: string;
  isLoading: (isLoading: boolean) => void;
};
export enum AccountQuickLinksURL {
  myAccount = '/my-account',
  personalDetails = '/my-account/personal-details',
  addresses = '/my-account/address-book',
  payments = '/my-account/payment-methods',
  wishlist = '/my-account/wishlist',
  orders = '/my-account/orders',
}
