import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandSectionComponent } from './expand-section.component';

describe('ExpandSectionComponent', () => {
  let component: ExpandSectionComponent;
  let fixture: ComponentFixture<ExpandSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
