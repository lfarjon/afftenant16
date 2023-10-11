import { Feature } from './feature';
import { Product } from './product';

export interface AffiliateTool {
  id: string;
  websiteId: string;
  type:
    | 'RANKING_CARDS'
    | 'COMPARISON_TABLE'
    | 'COMPARISON_MATRIX'
    | 'PRODUCT_BOX'
    | 'TOP_3_BOX'
    | 'SUMMARY_BOX'
    | 'VERSUS_BOX'
    | 'PRODUCT_SLIDER'
    | 'PRODUCT_COLLAGE';
  multiple: boolean;
  last_saved: Date;
  title: string;
  metafields: {
    title: string;
    description: string;
  };
  features: Feature[];
  data?: Product | Product[];
}
