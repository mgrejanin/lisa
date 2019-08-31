import { async, TestBed } from '@angular/core/testing';
import { SharedUiMarketGridModule } from './shared-ui-market-grid.module';

describe('SharedUiMarketGridModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiMarketGridModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiMarketGridModule).toBeDefined();
  });
});
