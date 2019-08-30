import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiToolbarComponent } from './shared-ui-toolbar.component';
import {MatToolbarModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import{SharedUiSidenavModule} from "@lisa/shared/ui/sidenav";
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [SharedUiToolbarComponent],
  imports: [CommonModule, MatToolbarModule, SharedUiSidenavModule, MatButtonModule, MatIconModule],
  exports: [SharedUiToolbarComponent]
})
export class SharedUiToolbarModule {}
