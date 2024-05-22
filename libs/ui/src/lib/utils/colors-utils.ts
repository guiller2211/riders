import { OrderStatus } from "@ducati/types";


export class ColorUtils {
  static badgeColor = (
    value: string,
  ): 'primary' | 'positive' | 'critical' | 'warning' | undefined => {
    switch (value) {
      case OrderStatus.InProcess:
        return 'primary';
      case OrderStatus.Approved:
      case OrderStatus.Delivered:
        return 'positive';
      case OrderStatus.Shipped:
        return 'warning';
      default:
        return 'critical';
    }
  }
}