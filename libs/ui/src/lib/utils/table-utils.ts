export class TableUtils {
  static badgeColor(
    statusCode: string | undefined,
  ): 'primary' | 'positive' | 'critical' | undefined {
    switch (statusCode) {
      case 'In process':
        return 'primary';
      case 'Approved':
      case 'Shipped':
        return 'positive';
      case 'Delivered':
        return undefined;
      default:
        return 'critical';
    }
  }
}
