export interface Article {
  articleId: string;
  websiteId: string;
  title: string;
  handle: string;
  content: string;
  metafields: {
    title: string;
    description: string;
  };
  author?: string | null;
  last_saved?: Date;
  status: 'DRAFT' | 'PUBLISHED';
}
