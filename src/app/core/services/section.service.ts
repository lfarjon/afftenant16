import { ChangeDetectorRef, Injectable, QueryList, Type } from '@angular/core';
import { DynamicChildLoaderDirective } from '../directives/dynamic-child-loader.directive';
import {
  affiliateToolMapping,
  componentTypeMapping,
  textTypeMapping,
} from '../models/component-mapping';
import { availableSections, DynamicSection } from '../models/dynamic-section';
import { BlogService } from './blog.service';
import { v4 as uuid } from 'uuid';
import {
  createProduct,
  createProducts,
  createSummaryBox,
  createVSBox,
} from '../models/product';
import { Link, dummyLink } from '../models/links';
import {
  addLocalFeaturesToProduct,
  addLocalFeaturesToProducts,
  buildGlobalFeatures,
  dummyFeatures,
} from '../models/feature';
import { BlockService } from './block.service';
import hljs from 'highlight.js';
import { BehaviorSubject } from 'rxjs';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Block } from '../models/block';

interface FormTools {
  fields: FormlyFieldConfig[];
  form: FormGroup;
  model: any;
  options: FormlyFormOptions;
}

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  selectedSection$ = new BehaviorSubject<DynamicSection | null>(null);

  private forms = new Map<string, FormTools>();

  constructor(
    private blogService: BlogService,
    private blockService: BlockService
  ) {}

  addBlockToAsset(
    insertIndex: number,
    id: string,
    assetType: string,
    block: any,
    blockType: string
  ) {
    switch (assetType) {
      case 'ARTICLE':
        this.handleArticle(insertIndex, id, block, blockType);
        break;
      case 'PAGE':
        this.handlePage(id, block, blockType);
        break;
      default:
        break;
    }
  }

  handleArticle(index: number, id: string, block: any, blockType: string) {
    //get asset
    const article = this.blogService.article$;
    const currentSections = article.value.templateSections;
    //generate section from block
    const newSection = this.generateSection(block, blockType);

    //add block to sections
    currentSections.splice(index, 0, newSection);
    currentSections.map((s, i) => (s.order = i + 1));

    //update article
    article.next({
      ...article.value,
      templateSections: [...currentSections],
    });

    //this.selectedSection$.next(newSection);
  }

  // prepareSectionForm(section: DynamicSection) {
  //   this.forms.set((section.sectionId), {
  //     fields: section
  //   })
  // }

  prepareBlockForm(block: Block) {
    this.forms.set(block.blockId, {
      fields: block.fields,
      model: block.model,
      form: new FormGroup({}),
      options: {},
    });
  }

  getBlockForm({ blockId }: Block) {
    return this.forms.get(blockId);
  }

  handlePage(id: string, block: any, blockType: string) {
    //get asset
  }

  generateSection({ name, key }: any, blockType: string): DynamicSection {
    const type = key;
    let section = {
      sectionId: uuid(),
      websiteId: JSON.parse(localStorage.getItem('website')!),
      title: name,
      updated_at: new Date(),
      metafields: {
        title: '',
        description: '',
      },
      type: type,
    } as DynamicSection;

    switch (blockType) {
      case 'TOOL':
        section = this.handleAffiliateTools(section, type);
        break;
      case 'GENERAL_BLOCKS':
        section = this.handleGeneralBlocks(section, type);
        break;
      case 'TEXT_BLOCKS':
        section = this.handleTextBlocks(section, type);
        break;
      default:
        break;
    }

    return section;
  }

  handleAffiliateTools(section: DynamicSection, type: string): DynamicSection {
    const link = dummyLink;
    let products = this.generateData(type, link);

    //Build local or global features
    if (type === 'aff-comparison-matrix') {
      // If MATRIX, build global features
      const globalFeatures = buildGlobalFeatures(products, dummyFeatures);

      section = {
        ...section,
        globalFeatures: globalFeatures,
      };
    } else {
      // Else build local (product level) features
      if (Array.isArray(products)) {
        products = addLocalFeaturesToProducts(products);
      } else {
        products = addLocalFeaturesToProduct(products);
      }
    }

    section = {
      ...section,
      data: products,
    };

    return section;
  }

  handleTextBlocks(section: DynamicSection, type: string): DynamicSection {
    section = {
      ...section,
      data: [],
    };
    return section;
  }

  handleGeneralBlocks(section: DynamicSection, type: string): DynamicSection {
    //Generate the blocks for the section
    this.blockService.getBlocks(
      section.sectionId,
      section.type,
      undefined,
      true
    );

    const blocks = this.blockService.getBlocksValues(section.sectionId);
    if (blocks) {
      //Add the blocks to the section
      section = {
        ...section,
        blocks: blocks,
      } as DynamicSection;

      blocks?.map((block) => {
        this.prepareBlockForm(block);
      });
    }

    return section;
  }

  generateData(type: string, link: Link) {
    let data: any;

    switch (type) {
      case 'aff-ranking-cards':
        data = createProducts([link, link, link] as Link[]);
        break;
      case 'aff-comparison-matrix':
        data = createProducts([link, link, link, link, link] as Link[]);
        break;
      case 'aff-comparison-table':
        data = createProducts([link, link, link, link, link] as Link[]);
        break;
      case 'aff-top-three':
        data = createProducts([link, link, link] as Link[]);
        break;
      case 'aff-versus-box':
        data = createVSBox([link, link] as Link[]);
        break;
      case 'aff-product-box':
        data = createProduct(link as Link);
        break;
      case 'aff-summary-box':
        data = createSummaryBox(link as Link);
        break;
      case 'aff-product-slider':
        data = createProducts([
          link,
          link,
          link,
          link,
          link,
          link,
          link,
          link,
          link,
        ] as Link[]);
        break;
      case 'aff-product-collage':
        data = createProducts([
          link,
          link,
          link,
          link,
          link,
          link,
          link,
          link,
          link,
        ] as Link[]);
        break;
      default:
        break;
    }
    return data;
  }

  loadSectionsComponents(
    dynamicChildren: QueryList<DynamicChildLoaderDirective>,
    sections: DynamicSection[] | undefined,
    inputs?: any
  ) {
    // Check that we have the same number of directives as components
    if (dynamicChildren.length !== sections?.length) {
      console.warn(
        'Mismatch between number of components and dynamicChild directives.'
      );
      return;
    }
    sections?.forEach((section: DynamicSection, index: number) => {
      const component =
        componentTypeMapping[section.type] ||
        affiliateToolMapping[section.type] ||
        textTypeMapping[section.type];

      if (component) {
        this.loadComponent(
          component.component,
          dynamicChildren.toArray()[index],
          inputs,
          section
        );
      } else {
        console.warn(`Unknown component type: ${section.type}`);
      }
    });
  }

  loadComponent(
    component: Type<any>,
    dynamicChild: DynamicChildLoaderDirective,
    inputs: any,
    section: DynamicSection
  ) {
    dynamicChild.viewContainerRef.clear();
    const componentRef =
      dynamicChild.viewContainerRef.createComponent(component);
    const componentInstance: any = componentRef.instance;
    componentInstance.section = section;
    if (section.data) componentInstance.data = section.data;
    if (section.globalFeatures)
      componentInstance.globalFeatures = section.globalFeatures;
    if (
      section.type === 'theme-navigation' ||
      section.type === 'theme-sidenav'
    ) {
      componentInstance.drawer = inputs;
    }

    if (section.type === 'block-paragraph') {
      componentInstance.content = `
      <p class="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">Deliver great service experiences fast - without the complexity of traditional ITSM solutions.Accelerate critical development work and deploy.</p>
      <p class="text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p>      
      `;
      //QUILL STUFF
      // const viewerModules: any = {
      //   blotFormatter: {},
      //   syntax: {
      //     highlight: (text: string) => hljs.highlightAuto(text).value,
      //   },
      // };
      // componentInstance.preserveWhitespace = true;
      // componentInstance.modules = viewerModules;
    }
    if (section.type === 'quill-quote') {
    }
  }

  getAvailableSectionsForTemplatePart(templatePart: string): string[] {
    return availableSections[templatePart] || [];
  }
}
