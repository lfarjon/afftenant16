import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingCardsComponent } from './ranking-cards.component';

describe('RankingCardsComponent', () => {
  let component: RankingCardsComponent;
  let fixture: ComponentFixture<RankingCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankingCardsComponent],
    });
    fixture = TestBed.createComponent(RankingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
