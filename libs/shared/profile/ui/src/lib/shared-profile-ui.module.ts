import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedProfileUiComponent } from './shared-profile-ui.component';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [SharedProfileUiComponent],
  exports: [SharedProfileUiComponent],
  imports: [CommonModule, MatButtonModule]
})
export class SharedProfileUiModule {}
