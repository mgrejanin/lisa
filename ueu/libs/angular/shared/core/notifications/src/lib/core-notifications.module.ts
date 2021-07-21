import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsModule } from './components/components.module';

@NgModule({
    imports: [CommonModule, ComponentsModule, MatDialogModule],
})
export class CoreNotificationsModule {}
