import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// components
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
    declarations: [ConfirmationModalComponent],
    exports: [ConfirmationModalComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule, DesignSystemAngularModule],
})
export class ComponentsModule {}
