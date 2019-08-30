import { async, TestBed } from '@angular/core/testing';
import { SharedLoginDataAccessModule } from './shared-login-data-access.module';

describe('SharedLoginDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedLoginDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedLoginDataAccessModule).toBeDefined();
  });
});
