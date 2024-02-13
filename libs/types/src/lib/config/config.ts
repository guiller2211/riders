export interface AppConfig {
  statuses: Statuses;
}

export interface Statuses {
  order: OrderStatusConfig[];
}

export interface OrderStatusConfig {
  id?: string;
  name: string;
  data: OrderStatusData;
}

export interface OrderStatusData {
  badgeColor: 'primary' | 'positive' | 'critical' | undefined;
}
