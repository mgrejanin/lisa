import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
     BrowserModule, CommonModule, RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
        { path: 'login', loadChildren: () => import('@lisa/shared/login/feature').then(m => m.SharedLoginFeatureModule) },
        { path: 'home', loadChildren: () => import('@lisa/shared/home/feature').then(m => m.SharedHomeFeatureModule) },
    ],)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[RouterModule]
})
export class AppModule {}
