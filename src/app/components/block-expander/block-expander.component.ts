import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { BlockService } from 'src/app/core/services/block.service';
import { DragDropService } from 'src/app/core/services/drag-drop.service';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-block-expander',
  templateUrl: './block-expander.component.html',
  styleUrls: ['./block-expander.component.scss'],
})
export class BlockExpanderComponent {
  @Input() selectedSection$!: Observable<DynamicSection | null>;

  private unsubscribeAll = new Subject();

  constructor(
    public dragDropService: DragDropService,
    private blockService: BlockService,
    private sectionService: SectionService
  ) {}

  toggleBlock(section: DynamicSection, block: Block, index: number) {
    this.blockService.toggleBlockVisibility(section, index);
  }

  dropBlock(section: DynamicSection, event: any, blocks: Block[]) {
    this.blockService.drop(event, blocks, section);
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
}
