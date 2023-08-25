import { Block } from './block';
import { DynamicSection } from './dynamic-section';

export interface Website {
  websiteId: string;
  userId: string;
  tenantId: string;
  domain: string;
  subdomain: string;
  templateId: string;
  header: DynamicSection[];
  footer: DynamicSection[];
  sidenav: DynamicSection[];
  headerBlocks: Block[];
  footerBlocks: Block[];
  status: 'DRAFT' | 'LIVE';
}
