import { async, TestBed } from '@angular/core/testing';
import { SharedChatModule } from './shared-chat.module';

describe('SharedChatModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedChatModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedChatModule).toBeDefined();
  });
});
