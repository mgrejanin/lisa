import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { NgxsModule } from '@ngxs/store';
import { ChatRestService } from './services/shared-chat-rest-service';
import { ChatState } from './store/shared-chat.state';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    NgxsModule.forFeature([ChatState]),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBqjxFAQ4Xd1mXit64BO3bL95ogd93amgI',
      authDomain: 'lisa-b88ed.firebaseapp.com',
      databaseURL: 'https://lisa-b88ed.firebaseio.com',
      projectId: 'lisa-b88ed',
      storageBucket: '',
      messagingSenderId: '112988805848',
      appId: '1:112988805848:web:8fd40cba61a3c600'
    }),
    AngularFireAuthModule
  ],
  providers: [ChatRestService]
})
export class SharedChatDataAccessModule {}
