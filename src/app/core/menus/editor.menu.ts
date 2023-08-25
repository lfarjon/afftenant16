import { NavListWithIcon, NavListWithLabel } from '../models/menu';

export const editorNavListItems: (NavListWithIcon | NavListWithLabel)[] = [
  {
    routerLink: '/pages',
    label: 'Pages',
    icon: 'menu_book',
  },
  {
    routerLink: '/design',
    label: 'Design',
    icon: 'design_services',
  },
  {
    routerLink: '/theme',
    label: 'Theme',
    icon: 'design_services',
  },
];
