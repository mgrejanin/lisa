import { async, TestBed } from '@angular/core/testing';
import { SharedUiSearchModule } from './shared-ui-search.module';

describe('SharedUiSearchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiSearchModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiSearchModule).toBeDefined();
  });
});
