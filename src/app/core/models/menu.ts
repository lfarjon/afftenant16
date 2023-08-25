interface NavListItem {
  routerLink: string;
  label: string;
  icon: string;
}

export interface NavList {
  items: NavListItem[];
}

export interface NavListWithIcon extends NavListItem {
  icon: string;
}

export interface NavListWithLabel extends NavListItem {
  label: string;
}

export interface MatNavList {
  items: (NavListWithIcon | NavListWithLabel)[];
}
