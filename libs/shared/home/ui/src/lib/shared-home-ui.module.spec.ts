import { async, TestBed } from '@angular/core/testing';
import { SharedHomeUiModule } from './shared-home-ui.module';

describe('SharedHomeUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedHomeUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedHomeUiModule).toBeDefined();
  });
});
