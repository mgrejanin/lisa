import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedChatDataAccessModule } from '@lisa/shared/chat/data-access';
import { SharedChatFeatureContainer } from './shared-chat-feature.container';

@NgModule({
  declarations: [SharedChatFeatureContainer],
  imports: [
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
