import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NguCarouselModule } from '@ngu/carousel';
import { SharedChatUiComponent } from './shared-chat-ui.component';

@NgModule({
  declarations: [SharedChatUiComponent],
  exports: [SharedChatUiComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NguCarouselModule
  ]
})
export class SharedChatUiModule {}
