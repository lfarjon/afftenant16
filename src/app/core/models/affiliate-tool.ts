export interface AffiliateTool {
  id: string;
  websiteId: string;
  type:
    | 'COMPARISON TABLE'
    | 'PRODUCT BOX'
    | 'TOP 3 BOX'
    | 'PROS & CONS BOX'
    | 'RATING BOX'
    | 'VERSUS BOX'
    | 'PRODUCT SLIDER';
  last_saved: Date;
  title: string;
  metafields: {
    title: string;
    description: string;
  };
}
