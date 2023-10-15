import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillToolbarComponent } from './quill-toolbar.component';

describe('QuillToolbarComponent', () => {
  let component: QuillToolbarComponent;
  let fixture: ComponentFixture<QuillToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuillToolbarComponent]
    });
    fixture = TestBed.createComponent(QuillToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
