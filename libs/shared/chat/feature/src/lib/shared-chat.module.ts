import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedChatDataAccessModule } from '@lisa/shared/chat/data-access';
import { SharedChatFeatureContainer } from './shared-chat-feature.container';
import {SharedChatUiModule} from '@lisa/shared/chat/ui';
import { CommonModule } from '@angular/common';

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
