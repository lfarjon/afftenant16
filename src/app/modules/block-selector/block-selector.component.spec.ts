import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSelectorComponent } from './block-selector.component';

describe('BlockSelectorComponent', () => {
  let component: BlockSelectorComponent;
  let fixture: ComponentFixture<BlockSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockSelectorComponent]
    });
    fixture = TestBed.createComponent(BlockSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
