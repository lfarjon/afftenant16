import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  QueryList,
  Type,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DynamicChildLoaderDirective } from 'src/app/core/directives/dynamic-child-loader.directive';
import {
  affiliateToolMappingArray,
  sectionTypeMappingArray,
  textTypeMappingArray,
} from 'src/app/core/models/component-mapping';
import { DragDropService } from 'src/app/core/services/drag-drop.service';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-block-selector',
  templateUrl: './block-selector.component.html',
  styleUrls: ['./block-selector.component.scss'],
})
export class BlockSelectorComponent implements OnDestroy {
  @ViewChildren(DynamicChildLoaderDirective)
  dynamicChildren!: QueryList<DynamicChildLoaderDirective>;

  textBlocks = [...textTypeMappingArray];
  sections = [...sectionTypeMappingArray];
  tools = [...affiliateToolMappingArray];

  currentlyEditing: string;
  assetType: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService,
    public dragDropService: DragDropService,
    private cd: ChangeDetectorRef
  ) {
    const routeSnapshot = this.route.snapshot;
    this.currentlyEditing = routeSnapshot.params['id'];
    this.assetType = routeSnapshot.data['type'];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // addBlock(block: any, blockType: string) {
  //   this.sectionService.addBlockToAsset(
  //     this.currentlyEditing,
  //     this.assetType,
  //     block,
  //     blockType
  //   );
  // }
}
