import { async, TestBed } from '@angular/core/testing';
import { SharedInvoicesFeatureModule } from './shared-invoices-feature.module';

describe('SharedInvoicesFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedInvoicesFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedInvoicesFeatureModule).toBeDefined();
  });
});
