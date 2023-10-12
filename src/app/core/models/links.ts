import { FormControl } from '@angular/forms';
import { Category } from './category';

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
