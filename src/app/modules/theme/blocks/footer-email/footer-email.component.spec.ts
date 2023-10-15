import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEmailComponent } from './footer-email.component';

describe('FooterEmailComponent', () => {
  let component: FooterEmailComponent;
  let fixture: ComponentFixture<FooterEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
