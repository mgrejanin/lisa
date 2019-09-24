import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedChatDataAccessModule } from '@lisa/shared/chat/data-access';
import { SharedChatUiModule } from '@lisa/shared/chat/ui';
import { SharedChatFeatureContainer } from './shared-chat-feature.container';

@NgModule({
  declarations: [SharedChatFeatureContainer],
  imports: [
    CommonModule,
    SharedChatUiModule,
    SharedChatDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedChatFeatureContainer
      }
    ])
  ]
})
export class SharedChatModule {}
