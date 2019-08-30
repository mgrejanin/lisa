import { async, TestBed } from '@angular/core/testing';
import { SharedHomeFeatureModule } from './shared-home-feature.module';

describe('SharedHomeFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedHomeFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedHomeFeatureModule).toBeDefined();
  });
});
