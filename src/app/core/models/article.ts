import { DynamicSection } from './dynamic-section';

export interface Article {
  articleId: string;
  websiteId: string;
  title: string;
  handle: string;
  tags: string[];
  metafields: {
    title: string;
    description: string;
  };
  published: boolean;
  author?: string | null;
  published_at?: Date;
  updated_at?: Date;
  templateSections: DynamicSection[];
}
