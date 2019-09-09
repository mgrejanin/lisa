import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppComponent } from './app.component';
import { SharedCoreDataAccessModule } from '@lisa/shared/core/data-access';
import{NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxsModule.forRoot([]),
    HttpClientModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    SharedCoreDataAccessModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('@lisa/shared/toolbar/feature').then(
            m => m.SharedToolbarFeatureModule
          )
      }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
