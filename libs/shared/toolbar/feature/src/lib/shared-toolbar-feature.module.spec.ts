import { async, TestBed } from '@angular/core/testing';
import { SharedToolbarFeatureModule } from './shared-toolbar-feature.module';

describe('SharedToolbarFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedToolbarFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedToolbarFeatureModule).toBeDefined();
  });
});
