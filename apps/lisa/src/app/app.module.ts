import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiToolbarModule } from '@lisa/shared/ui/toolbar';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    SharedUiToolbarModule,
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('@lisa/shared/toolbar/feature').then(
            m => m.SharedToolbarFeatureModule
          )
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
