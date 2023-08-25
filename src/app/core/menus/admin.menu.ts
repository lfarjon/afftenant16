import { NavListWithIcon, NavListWithLabel } from '../models/menu';

export const adminNavListItems: (NavListWithIcon | NavListWithLabel)[] = [
  {
    routerLink: '/admin',
    label: 'Dashboard',
    icon: 'dashboard',
  },
  {
    routerLink: '/admin/links',
    label: 'Links',
    icon: 'link',
  },
  {
    routerLink: '/admin/websites',
    label: 'Websites',
    icon: 'website',
  },
];
