import { async, TestBed } from '@angular/core/testing';
import { SharedUiSidenavModule } from './shared-ui-sidenav.module';

describe('SharedUiSidenavModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiSidenavModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiSidenavModule).toBeDefined();
  });
});
