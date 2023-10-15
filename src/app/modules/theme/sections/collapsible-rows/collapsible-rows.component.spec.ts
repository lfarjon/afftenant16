import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleRowsComponent } from './collapsible-rows.component';

describe('CollapsibleRowsComponent', () => {
  let component: CollapsibleRowsComponent;
  let fixture: ComponentFixture<CollapsibleRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsibleRowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
