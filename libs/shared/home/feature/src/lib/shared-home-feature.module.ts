import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedHomeUiModule } from '@lisa/shared/home/ui';
import { SharedHomeFeatureContainer } from './shared-home-feature.container';
@NgModule({
  declarations: [SharedHomeFeatureContainer],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedHomeFeatureContainer
      }
    ]),
    SharedHomeUiModule
  ]
})
export class SharedHomeFeatureModule {}
