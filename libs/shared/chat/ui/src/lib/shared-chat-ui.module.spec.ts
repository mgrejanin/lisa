import { async, TestBed } from '@angular/core/testing';
import { SharedChatUiModule } from './shared-chat-ui.module';

describe('SharedChatUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedChatUiModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedChatUiModule).toBeDefined();
  });
});
