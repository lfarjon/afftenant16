import { uuidv4 } from '@firebase/util';
import { templateSections } from './dynamic-section';

export interface Page {
  default: boolean;
  pageId: string;
  websiteId: string;
  title: string;
  handle: string;
  template: string;
  content: string;
  metafields: {
    title: string;
    description: string;
  };
  author?: string | null;
  published_at?: Date;
  url?: Record<string, unknown>;
  templateSections: any[];
}

export const defaultPages: Page[] = [
  {
    default: true,
    pageId: uuidv4(),
    title: 'Home',
    handle: 'home',
    template: 'home',
    published_at: new Date(),
    metafields: {
      title: 'home',
      description: '',
    },
    templateSections: templateSections,
  },
  {
    default: false,
    pageId: uuidv4(),
    title: 'Contact',
    handle: 'contact',
    template: 'contact',
    published_at: new Date(),
    metafields: {
      title: 'contact',
      description: '',
    },
    templateSections: templateSections,
  },
  {
    default: false,
    pageId: uuidv4(),
    title: 'About',
    handle: 'about',
    template: 'default',
    published_at: new Date(),
    metafields: {
      title: 'about',
      description: '',
    },
    templateSections: templateSections,
  },
] as Page[];
