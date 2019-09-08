import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedChatUiComponent } from './shared-chat-ui.component';

@NgModule({
  declarations: [SharedChatUiComponent],
  exports: [SharedChatUiComponent],
  imports: [CommonModule]
})
export class SharedChatUiModule {}
