import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedProfileUiModule } from '@lisa/shared/profile/ui';
import { SharedProfileContainer } from './shared-profile-feature.container';

@NgModule({
  declarations: [SharedProfileContainer],
  imports: [
    SharedProfileUiModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SharedProfileContainer
      }
    ])
  ]
})
export class SharedProfileFeatureModule {}
