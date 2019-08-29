import { async, TestBed } from '@angular/core/testing';
import { SharedLoginFeatureModule } from './shared-login-feature.module';

describe('SharedLoginFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedLoginFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedLoginFeatureModule).toBeDefined();
  });
});
