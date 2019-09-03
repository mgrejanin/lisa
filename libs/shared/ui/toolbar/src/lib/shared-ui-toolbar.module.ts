import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedUiToolbarComponent } from './shared-ui-toolbar.component';

@NgModule({
  declarations: [SharedUiToolbarComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports: [SharedUiToolbarComponent]
})
export class SharedUiToolbarModule {}
