import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPickerComponent } from './link-picker.component';

describe('LinkPickerComponent', () => {
  let component: LinkPickerComponent;
  let fixture: ComponentFixture<LinkPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkPickerComponent]
    });
    fixture = TestBed.createComponent(LinkPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
