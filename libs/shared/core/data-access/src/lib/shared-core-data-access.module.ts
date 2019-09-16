import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './state/shared-core-login.state';
import { SharedCoreLoginService } from './service/shared-core-login.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBqjxFAQ4Xd1mXit64BO3bL95ogd93amgI',
      authDomain: 'lisa-b88ed.firebaseapp.com',
      databaseURL: 'https://lisa-b88ed.firebaseio.com',
      projectId: 'lisa-b88ed',
      storageBucket: '',
      messagingSenderId: '112988805848',
      appId: '1:112988805848:web:8fd40cba61a3c600'
    }),
    AngularFireAuthModule,
    NgxsModule.forFeature([LoginState])
  ],
  providers: [SharedCoreLoginService]
})
export class SharedCoreDataAccessModule {}
