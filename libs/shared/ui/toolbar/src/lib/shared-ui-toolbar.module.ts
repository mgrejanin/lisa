import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedUiToolbarComponent } from './shared-ui-toolbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SharedUiToolbarComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports: [SharedUiToolbarComponent]
})
export class SharedUiToolbarModule {}
