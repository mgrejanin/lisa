import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedToolbarFeatureContainer } from './shared-toolbar-feature.container';
import { RouterModule } from '@angular/router';
import { MatListModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { SharedHomeFeatureModule } from '@lisa/shared/home/feature';
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
    SharedHomeFeatureModule,
    SharedUiToolbarModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedToolbarFeatureContainer,
        children: [
          {
            path: 'home',
            loadChildren: () =>
              import('@lisa/shared/home/feature').then(
                m => m.SharedHomeFeatureModule
              )
          }
        ]
      }
    ])
  ]
})
export class SharedToolbarFeatureModule {}
