import { async, TestBed } from '@angular/core/testing';
import { SharedUiToolbarModule } from './shared-ui-toolbar.module';

describe('SharedUiToolbarToolbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiToolbarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiToolbarModule).toBeDefined();
  });
});
