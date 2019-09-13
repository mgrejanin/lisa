import { async, TestBed } from '@angular/core/testing';
import { SharedInvoicesUiModule } from './shared-invoices-ui.module';

describe('SharedInvoicesUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedInvoicesUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedInvoicesUiModule).toBeDefined();
  });
});
