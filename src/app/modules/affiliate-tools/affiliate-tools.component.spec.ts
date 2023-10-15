import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateToolsComponent } from './affiliate-tools.component';

describe('AffiliateToolsComponent', () => {
  let component: AffiliateToolsComponent;
  let fixture: ComponentFixture<AffiliateToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffiliateToolsComponent]
    });
    fixture = TestBed.createComponent(AffiliateToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
