export interface HeaderNavigation {
  menuItems: MenuItem[];
}

export interface MenuItem {
  name?: string;
  url?: string;
  children?: MenuItem[];
}
