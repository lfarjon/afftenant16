import { Component, OnDestroy, Type } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  affiliateToolMappingArray,
  sectionTypeMappingArray,
} from 'src/app/core/models/component-mapping';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-block-selector',
  templateUrl: './block-selector.component.html',
  styleUrls: ['./block-selector.component.scss'],
})
export class BlockSelectorComponent implements OnDestroy {
  sections = [...sectionTypeMappingArray];
  tools = [...affiliateToolMappingArray];
  currentlyEditing: string;
  assetType: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private sectionService: SectionService
  ) {
    const routeSnapshot = this.route.snapshot;
    this.currentlyEditing = routeSnapshot.params['id'];
    this.assetType = routeSnapshot.data['type'];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  addBlock(block: any, blockType: string) {
    this.sectionService.addBlockToAsset(
      this.currentlyEditing,
      this.assetType,
      block,
      blockType
    );
  }
}
