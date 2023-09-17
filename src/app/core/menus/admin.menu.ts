import { NavListWithIcon, NavListWithLabel } from '../models/menu';

export const adminNavListItems: (NavListWithIcon | NavListWithLabel)[] = [
  {
    routerLink: '/admin',
    label: 'Dashboard',
    icon: 'query_stats',
  },
  {
    routerLink: '/admin/theme',
    label: 'Theme',
    icon: 'palette',
  },
  {
    routerLink: '/admin/articles',
    label: 'Articles',
    icon: 'article',
  },
  {
    routerLink: '/admin/affiliate-tools',
    label: 'Affiliate tools',
    icon: 'hotel_class',
  },
  {
    routerLink: '/admin/links',
    label: 'Links',
    icon: 'link',
  },
];
