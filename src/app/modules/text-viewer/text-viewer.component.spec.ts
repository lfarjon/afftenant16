import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextViewerComponent } from './text-viewer.component';

describe('QuillViewComponent', () => {
  let component: TextViewerComponent;
  let fixture: ComponentFixture<TextViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextViewerComponent],
    });
    fixture = TestBed.createComponent(TextViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
