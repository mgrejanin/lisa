import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatIconModule } from '@angular/material';
import { SharedUiSearchComponent } from './shared-ui-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SharedUiSearchComponent],
  exports: [SharedUiSearchComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class SharedUiSearchModule {}
