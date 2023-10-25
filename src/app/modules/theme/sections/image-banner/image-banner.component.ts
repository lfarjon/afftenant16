import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { DynamicBlockLoaderDirective } from 'src/app/core/directives/dynamic-block-loader.directive';
import { Block } from 'src/app/core/models/block';
import { DynamicSection } from 'src/app/core/models/dynamic-section';
import { BlockService } from 'src/app/core/services/block.service';

@Component({
  selector: 'theme-image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageBannerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(DynamicBlockLoaderDirective)
  dynamicChildren!: QueryList<DynamicBlockLoaderDirective>;
  @Input() section!: DynamicSection;
  image: string = 'assets/placeholders/1200x600.png';
  private unsubscribeAll = new Subject();
  constructor(
    private blockService: BlockService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const image = this.section.blocks.find(
      (block: Block) => block.type === 'block-image'
    )?.model.fileUrl;
    if (image?.length > 0) {
      this.image = image;
    }

    this.blockService.loadBlocksComponents(
      this.section.sectionId,
      this.section.blocks,
      this.dynamicChildren,
      'image-banner'
    );
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribeAll.next(true);
    this.unsubscribeAll.complete();
  }

  editBlock() {}
}
