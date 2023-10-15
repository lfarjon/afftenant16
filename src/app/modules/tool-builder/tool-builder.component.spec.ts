import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolBuilderComponent } from './tool-builder.component';

describe('ToolBuilderComponent', () => {
  let component: ToolBuilderComponent;
  let fixture: ComponentFixture<ToolBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolBuilderComponent]
    });
    fixture = TestBed.createComponent(ToolBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
