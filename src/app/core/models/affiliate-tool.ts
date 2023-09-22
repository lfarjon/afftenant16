import { Type } from '@angular/core';

export interface AffiliateTool {
  id: string;
  websiteId: string;
  type:
    | 'COMPARISON_TABLE'
    | 'PRODUCT_BOX'
    | 'TOP_3_BOX'
    | 'PROS_CONS_BOX'
    | 'RATING_BOX'
    | 'VERSUS_BOX'
    | 'PRODUCT_SLIDER'
    | 'PRODUCT_COLLAGE';
  last_saved: Date;
  title: string;
  metafields: {
    title: string;
    description: string;
  };
  data?: Type<any>;
}
