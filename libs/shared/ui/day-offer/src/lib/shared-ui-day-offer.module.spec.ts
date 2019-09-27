import { async, TestBed } from '@angular/core/testing';
import { SharedUiDayOfferModule } from './shared-ui-day-offer.module';

describe('SharedUiDayOfferModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiDayOfferModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiDayOfferModule).toBeDefined();
  });
});
