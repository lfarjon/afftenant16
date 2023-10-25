import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockExpanderComponent } from './block-expander.component';

describe('BlockExpanderComponent', () => {
  let component: BlockExpanderComponent;
  let fixture: ComponentFixture<BlockExpanderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockExpanderComponent]
    });
    fixture = TestBed.createComponent(BlockExpanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
