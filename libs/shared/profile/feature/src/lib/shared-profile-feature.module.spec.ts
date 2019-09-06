import { async, TestBed } from '@angular/core/testing';
import { SharedProfileFeatureModule } from './shared-profile-feature.module';

describe('SharedProfileFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedProfileFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedProfileFeatureModule).toBeDefined();
  });
});
