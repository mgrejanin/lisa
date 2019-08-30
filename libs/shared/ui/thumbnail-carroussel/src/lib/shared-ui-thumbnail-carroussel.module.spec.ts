import { async, TestBed } from '@angular/core/testing';
import { SharedUiThumbnailCarrousselModule } from './shared-ui-thumbnail-carroussel.module';

describe('SharedUiThumbnailCarrousselModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiThumbnailCarrousselModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiThumbnailCarrousselModule).toBeDefined();
  });
});
