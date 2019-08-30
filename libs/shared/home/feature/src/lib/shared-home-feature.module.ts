import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedHomeFeatureContainer } from './shared-home-feature.container';
import { RouterModule } from '@angular/router';
import {SharedUiToolbarModule} from '@lisa/shared/ui/toolbar';
@NgModule({
  declarations: [SharedHomeFeatureContainer],
  imports: [
    CommonModule, 
    RouterModule.forChild(
      [{
        path: '',
        component: SharedHomeFeatureContainer
      }]
    ),
    SharedUiToolbarModule
  ]
})
export class SharedHomeFeatureModule {}
