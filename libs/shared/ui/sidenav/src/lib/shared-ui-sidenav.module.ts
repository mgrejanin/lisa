import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiSidenavComponent } from './shared-ui-sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [SharedUiSidenavComponent],
  imports: [CommonModule, MatSidenavModule],
  exports: [SharedUiSidenavComponent]
})
export class SharedUiSidenavModule {}
