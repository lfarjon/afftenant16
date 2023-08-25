import { Category } from './category';
import { Image } from './image';

export interface Link {
  id: string;
  imageUrl: Image;
  active: boolean;
  title: string;
  categories: Category[];
  url: string;
  icon: string;
  clicks: number;
  active_at: any;
  published_at: any;
}
