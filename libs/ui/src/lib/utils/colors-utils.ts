import { OrderStatus } from "@riders/types";


export class ColorUtils {
  static badgeColor = (
    value: string,
  ): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' | undefined => {
    switch (value) {
      case OrderStatus.InProcess:
        return 'info';
      case OrderStatus.Approved:
      case OrderStatus.Delivered:
        return 'success';
      case OrderStatus.Shipped:
        return 'warning';
      default:
        return 'danger';
    }
  }
}