import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSelectorComponent } from './link-selector.component';

describe('LinkSelectorComponent', () => {
  let component: LinkSelectorComponent;
  let fixture: ComponentFixture<LinkSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkSelectorComponent]
    });
    fixture = TestBed.createComponent(LinkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
