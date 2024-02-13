export class FormatUtils {
  static formatCurrency(
    value?: number,
    currency?: string,
    locale?: string,
    decimalPlaces?: number,
  ): string {
    if (value !== undefined && currency && locale && decimalPlaces) {
      const currencyFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
      });
      return currencyFormatter.format(value / 10 ** decimalPlaces);
    }
    return '';
  }
}
