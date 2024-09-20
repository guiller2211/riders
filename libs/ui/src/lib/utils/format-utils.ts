export class FormatUtils {
  static formatCurrency(
    centsAmount?: number,
    currency?: string,
    locale?: string,
    decimalPlaces?: number,
  ): string {
    if (centsAmount !== undefined && currency && locale && decimalPlaces !== undefined) {
      const value = centsAmount / 10 ** decimalPlaces;

      const currencyFormatter = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });

      return currencyFormatter.format(value);
    }
    return '';
  }
}