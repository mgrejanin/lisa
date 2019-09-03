import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxsModule.forRoot([]),
    HttpClientModule,
    NgxsRouterPluginModule.forRoot(),
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
