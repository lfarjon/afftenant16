import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import {
  InitialBlock,
  availableBlocks,
  Block,
  blocks,
  initialBlocks,
} from '../models/block';
import { DynamicBlockLoaderDirective } from '../directives/dynamic-block-loader.directive';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DragDropService } from './drag-drop.service';
import { DynamicSection } from '../models/dynamic-section';
import { blockTypeMapping } from '../models/component-mapping';
import { v4 as uuid } from 'uuid';

export interface BlockEditing {
  editing: boolean;
  block: Block | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class BlockService {
  private _sectionBlocks = new Map<string, BehaviorSubject<Block[]>>();
  _blocks = new Map<string, BehaviorSubject<Block>>();

  editingBlock = new BehaviorSubject<BlockEditing>({
    editing: false,
    block: undefined,
  });

  editingStyle = new BehaviorSubject<BlockEditing>({
    editing: false,
    block: undefined,
  });

  constructor(private dragDropService: DragDropService) {}

  getBlocks(
    sectionId: string,
    sectionType: string,
    savedBlocks?: Block[],
    generateBlocks?: boolean
  ) {
    let sectionBlocks = this._sectionBlocks.get(sectionId);
    const availableBlocks = this.getAvailableBlocksForSection(sectionType);
    const initBlocks = this.getInitialBlocks(sectionType);

    // If this section doesn't have a BehaviorSubject yet, create one
    if (!sectionBlocks) {
      sectionBlocks = new BehaviorSubject<Block[]>([]);
      this._sectionBlocks.set(sectionId, sectionBlocks);

      if (generateBlocks) {
        // Add initial blocks in the specified order
        // and add initial model for each block
        const starterBlocks = initBlocks
          .filter((blockType) => blockType.order !== undefined)
          .sort((a, b) => a.order - b.order)
          .map((blockType) => ({ type: blockType.block }));

        starterBlocks.forEach((block) => {
          const existingBlock = blocks.find((b) => b.type === block.type);
          if (existingBlock) {
            this.addBlock(sectionId, existingBlock, true);
          }
        });
      } else {
        if (savedBlocks) {
          console.log('saved');
          savedBlocks.forEach((block) => {
            this.addBlock(sectionId, block, false);
          });
        }
      }
    }

    return sectionBlocks.pipe(
      map((blocks) =>
        blocks.filter((block) =>
          availableBlocks.map((b) => b.includes(block.type))
        )
      )
    );
  }

  getBlocksValues(sectionId: string) {
    return this._sectionBlocks.get(sectionId)?.value;
  }

  getLiveBlocks(sectionId: string) {
    return this._sectionBlocks.get(sectionId)!;
  }

  getInitialBlocks(sectionType: string): InitialBlock[] {
    return initialBlocks[sectionType] || [];
  }

  getAvailableBlocksForSection(sectionType: string): string[] {
    return availableBlocks[sectionType] || [];
  }

  getBlockData(blockId: string): Observable<Block> {
    const block = this._blocks.get(blockId);
    return block!.asObservable();
  }

  addBlock(sectionId: string, block: Block, newBlock: boolean) {
    if (newBlock) {
      //make sure the blockId is unique
      const id = uuid();
      block = {
        ...block,
        blockId: id,
      };
    }

    this._blocks.set(block.blockId, new BehaviorSubject<Block>(block));
    const sectionBlocks = this._sectionBlocks.get(sectionId);
    if (sectionBlocks) {
      const currentBlocks = sectionBlocks.value;
      sectionBlocks.next([...currentBlocks, block]);
      //then add block to _blocks
    }
  }

  removeBlock(sectionId: string, index: number) {
    const sectionBlocks = this._sectionBlocks.get(sectionId);

    if (sectionBlocks) {
      const currentBlocks = sectionBlocks.value;
      currentBlocks.splice(index, 1);
      sectionBlocks.next(currentBlocks);
    }
  }

  loadBlocksComponents(
    sectionId: string,
    newBlocks: Block[],
    dynamicChildren: QueryList<DynamicBlockLoaderDirective>,
    context?: any
  ) {
    dynamicChildren?.forEach((dynamicChild, index) => {
      dynamicChild?.viewContainerRef.clear();
      newBlocks.forEach((block) => {
        if (block.visible) {
          const component = blockTypeMapping[block.type];
          if (component) {
            const componentRef = dynamicChild?.viewContainerRef.createComponent(
              component.component
            );
            const componentInstance: any = componentRef.instance;
            componentInstance.blockId = block.blockId;
            componentInstance.sectionId = sectionId;
            componentInstance.context = context;
            componentInstance.block = block;
          } else {
            console.warn(`Unknown component type: ${block.type}`);
          }
        }
      });
    });
  }

  drop(
    event: CdkDragDrop<string[]>,
    blocks: Block[],
    { sectionId }: DynamicSection
  ) {
    this.dragDropService
      .dropBlock(event, blocks)
      .pipe(
        take(1),
        tap((c) => {
          const sectionBlocks = this._sectionBlocks.get(sectionId);
          if (sectionBlocks) {
            sectionBlocks.next(c);
          }
        })
      )
      .subscribe();
  }

  toggleBlockVisibility({ sectionId, type }: DynamicSection, index: number) {
    const sectionBlocks = this._sectionBlocks.get(sectionId);

    if (sectionBlocks) {
      const currentBlocks = sectionBlocks.value;
      const updatedBlocks = [...currentBlocks]; // Create a new array with the existing blocks

      // Toggle the visibility of the block at the specified index
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        visible: !updatedBlocks[index].visible,
      };

      sectionBlocks.next(updatedBlocks); // Update the BehaviorSubject with the updated array
    }
  }

  updateBlocks(sectionId: string, block: Block) {
    this._blocks.get(block.blockId)?.next(block);
    const sectionBlocks = this._sectionBlocks.get(sectionId);
    if (sectionBlocks) {
      const currentBlocks = sectionBlocks.value;
      const blockToChange = currentBlocks.find(
        (b: Block) => b.blockId === block.blockId
      );

      const finalBlocks = currentBlocks.map((b) => {
        if (b.blockId === blockToChange?.blockId) {
          return block;
        }
        return b;
      });

      sectionBlocks.next(finalBlocks);
    }
  }
}
