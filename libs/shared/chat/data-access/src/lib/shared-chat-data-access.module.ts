import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ChatRestService } from './services/shared-chat-rest-service';
import { ChatState } from './store/shared-chat.state';

@NgModule({
  imports: [NgxsModule.forFeature([ChatState])],
  providers: [ChatRestService]
})
export class SharedChatDataAccessModule {}
