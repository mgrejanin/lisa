import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiSidenavComponent } from './shared-ui-sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material';
import {RouterModule} from "@angular/router";
@NgModule({
  declarations: [SharedUiSidenavComponent],
  imports: [CommonModule, MatSidenavModule, MatListModule, RouterModule],
  exports: [SharedUiSidenavComponent]
})
export class SharedUiSidenavModule {}
