import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Block, blocks } from 'src/app/core/models/block';
import {
  DynamicSection,
  footerSections,
  headerSections,
  sidenavSections,
  templateSections,
} from 'src/app/core/models/dynamic-section';
import { BlockService } from 'src/app/core/services/block.service';
import { DragDropService } from 'src/app/core/services/drag-drop.service';
import { SectionService } from 'src/app/core/services/section.service';
import { TemplateService } from 'src/app/core/services/template.service';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExpansionPanelComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() section: string = '';
  @Input() components!: DynamicSection[];
  @Input() expanded!: boolean;
  @Input() moreSections: boolean = true;
  @Input() allowAddBlocks: boolean = true;
  disabledMenu: boolean = false;
  blockMenu$!: Observable<Block[]>;
  sectionMenu$!: Observable<DynamicSection[]>;
  templateSections: DynamicSection[] = [...templateSections];
  headerSections: DynamicSection[] = [...headerSections];
  footerSections: DynamicSection[] = [...footerSections];
  sidenavSections: DynamicSection[] = [...sidenavSections];
  websiteId: string;
  isSelected!: string;
  isSelected$ = this.templateService.isSelected;

  private unsubscribeAll = new Subject();

  constructor(
    public dragDropService: DragDropService,
    private blockService: BlockService,
    public templateService: TemplateService,
    private sectionService: SectionService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    const routeSnapshot = this.route.snapshot;
    this.websiteId = routeSnapshot.params['websiteId'];
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.templateService.isSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((section) => {
        this.isSelected = section;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  toggleSection(section: DynamicSection, index: number) {
    switch (this.section) {
      case 'HEADER':
        this.templateService.toggleHeaderSectionVisiblity(section, index);
        break;
      case 'SIDENAV':
        this.templateService.toggleSidenavSectionVisibility(section, index);
        break;
      case 'FOOTER':
        this.templateService.toggleFooterSectionVisiblity(section, index);
        break;
      case 'TEMPLATE':
        this.templateService.toggleTemplateSectionVisiblity(section, index);
        break;
      default:
        break;
    }
  }

  toggleBlock(section: DynamicSection, block: Block, index: number) {
    this.blockService.toggleBlockVisibility(section, index);
  }

  drop(event: any) {
    switch (this.section) {
      case 'HEADER':
        let headerSections: DynamicSection[] | undefined =
          this.templateService.header$.value;
        this.templateService.drop(event, headerSections!, this.section);
        break;
      case 'SIDENAV':
        let sidenavSections: DynamicSection[] | undefined =
          this.templateService.sidenav$.value;
        this.templateService.drop(event, sidenavSections!, this.section);
        break;
      case 'FOOTER':
        let footerSections: DynamicSection[] | undefined =
          this.templateService.footer$.value;
        this.templateService.drop(event, footerSections!, this.section);
        break;
      case 'TEMPLATE':
        let templateSections: DynamicSection[] | undefined =
          this.templateService.template$.value;
        this.templateService.drop(event, templateSections!, this.section);
        break;
      default:
        break;
    }
  }

  addSection(section: DynamicSection) {
    let pageId = JSON.parse(localStorage.getItem('page')!);
    switch (this.section) {
      case 'HEADER':
        this.templateService.addHeaderSection(section);
        break;
      case 'SIDENAV':
        this.templateService.addSidenavSection(section);
        break;
      case 'FOOTER':
        this.templateService.addFooterSection(section);
        break;
      case 'TEMPLATE':
        this.templateService.addTemplateSection(section, pageId);
        break;
      default:
        break;
    }
  }

  removeSection({ sectionId }: DynamicSection, index: number) {
    switch (this.section) {
      case 'HEADER':
        this.templateService.removeHeaderSection(sectionId, index);
        break;
      case 'SIDENAV':
        this.templateService.removeSidenavSection(sectionId, index);
        break;
      case 'FOOTER':
        this.templateService.removeFooterSection(sectionId, index);
        break;
      case 'TEMPLATE':
        this.templateService.removeTemplateSection(sectionId, index);
        break;
      default:
        break;
    }
  }

  dropBlock(section: DynamicSection, event: any, blocks: Block[]) {
    this.blockService.drop(event, blocks, section);
  }

  openBlockMenu({ type }: DynamicSection) {
    // show available blocks for this section
    const blockTypes = this.blockService.getAvailableBlocksForSection(type);
    const menu: Block[] = [];

    blocks.map((block: Block) => {
      blockTypes.filter((blockType) => {
        if (blockType === block.type) {
          menu.push(block);
        }
      });
    });
    this.blockMenu$ = of(menu);
  }

  openSectionMenu(templatePart: string) {
    // show available blocks for this section
    const sectionTypes =
      this.sectionService.getAvailableSectionsForTemplatePart(templatePart);
    const menu: DynamicSection[] = [];

    switch (this.section) {
      case 'HEADER':
        this.headerSections.map((section: DynamicSection) => {
          sectionTypes.filter((sectionType) => {
            if (
              sectionType === section.type &&
              !this.components.find((c) => c.type === 'theme-announcement-bar')
            ) {
              menu.push(section);
            }
          });
        });
        break;
      case 'SIDENAV':
        this.sidenavSections.map((section: DynamicSection) => {
          sectionTypes.filter((sectionType) => {
            if (sectionType === section.type) {
              menu.push(section);
            }
          });
        });
        break;
      case 'FOOTER':
        this.footerSections.map((section: DynamicSection) => {
          sectionTypes.filter((sectionType) => {
            if (sectionType === section.type) {
              menu.push(section);
            }
          });
        });
        break;
      case 'TEMPLATE':
        this.templateSections.map((section: DynamicSection) => {
          sectionTypes.filter((sectionType) => {
            if (sectionType === section.type) {
              menu.push(section);
            }
          });
        });
        break;
      default:
        break;
    }

    this.sectionMenu$ = of(menu);
  }

  addBlock({ sectionId }: DynamicSection, block: Block) {
    this.blockService.addBlock(sectionId, block, true);
  }

  removeBlock({ sectionId }: DynamicSection, index: number) {
    this.blockService.removeBlock(sectionId, index);
  }

  editBlock(block: Block) {
    this.blockService.editingBlock.next({
      editing: true,
      block: block,
    });
  }

  selectSection(component: DynamicSection) {
    this.isSelected === component.sectionId
      ? this.templateService.isSelected.next('')
      : this.templateService.isSelected.next(component.sectionId);
  }
}
