import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedToolbarFeatureContainer } from './shared-toolbar-feature.container';
import { RouterModule } from '@angular/router';
import {
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule
} from '@angular/material';
import { SharedUiToolbarModule } from '@lisa/shared/ui/toolbar';
@NgModule({
  declarations: [SharedToolbarFeatureContainer],
  exports: [SharedToolbarFeatureContainer],
  imports: [
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
    SharedUiToolbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedToolbarFeatureContainer,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@lisa/shared/home/feature').then(
                m => m.SharedHomeFeatureModule
              )
          },
          {
            path: 'chat',
            loadChildren: () =>
              import('@lisa/shared/chat/feature').then(m => m.SharedChatModule)
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('@lisa/shared/profile/feature').then(
                m => m.SharedProfileFeatureModule
              )
          }
        ]
      }
    ])
  ]
})
export class SharedToolbarFeatureModule {}
