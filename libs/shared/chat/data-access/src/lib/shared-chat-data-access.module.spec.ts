import { async, TestBed } from '@angular/core/testing';
import { SharedChatDataAccessModule } from './shared-chat-data-access.module';

describe('SharedChatDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedChatDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedChatDataAccessModule).toBeDefined();
  });
});
