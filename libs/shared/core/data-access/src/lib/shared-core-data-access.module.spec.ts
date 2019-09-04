import { async, TestBed } from '@angular/core/testing';
import { SharedCoreDataAccessModule } from './shared-core-data-access.module';

describe('SharedCoreDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedCoreDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedCoreDataAccessModule).toBeDefined();
  });
});
