import { async, TestBed } from '@angular/core/testing';
import { SharedProfileUiModule } from './shared-profile-ui.module';

describe('SharedProfileUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedProfileUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedProfileUiModule).toBeDefined();
  });
});
