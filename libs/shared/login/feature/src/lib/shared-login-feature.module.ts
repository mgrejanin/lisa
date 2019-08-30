import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedLoginFeatureContainer } from './shared-login-feature.container';

@NgModule({
  declarations: [SharedLoginFeatureContainer],
  imports: [
    CommonModule, 
    RouterModule.forChild([
      {
        path: '',
        component: SharedLoginFeatureContainer
      }
    ])
  ]
})
export class SharedLoginFeatureModule {}
