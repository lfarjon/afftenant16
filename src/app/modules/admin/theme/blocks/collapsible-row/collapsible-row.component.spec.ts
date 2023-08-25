import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleRowComponent } from './collapsible-row.component';

describe('CollapsibleRowComponent', () => {
  let component: CollapsibleRowComponent;
  let fixture: ComponentFixture<CollapsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsibleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
