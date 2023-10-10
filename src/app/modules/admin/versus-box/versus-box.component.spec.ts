import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersusBoxComponent } from './versus-box.component';

describe('VersusBoxComponent', () => {
  let component: VersusBoxComponent;
  let fixture: ComponentFixture<VersusBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VersusBoxComponent]
    });
    fixture = TestBed.createComponent(VersusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
