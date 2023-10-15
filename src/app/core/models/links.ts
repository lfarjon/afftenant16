import { Category } from './category';
import { v4 as uuid } from 'uuid';
import { lorem } from './lorem';

export interface Link {
  id: string;
  websiteId: string;
  imageUrl: string;
  active: boolean;
  title: string;
  categories: Category[];
  url: string;
  icon: string;
  clicks: number;
  active_at: any;
  published_at: any;
  selected?: boolean;
}

export const dummyLink: Link = {
  id: uuid(),
  websiteId: JSON.parse(localStorage.getItem('website')!),
  imageUrl: 'assets/placeholders/600x600.png',
  active: true,
  title: lorem.generateSentences(1),
  categories: [],
  url: 'https://www.nba.com',
  icon: 'home',
  clicks: 0,
  active_at: new Date(),
  published_at: new Date(),
  selected: false,
};
