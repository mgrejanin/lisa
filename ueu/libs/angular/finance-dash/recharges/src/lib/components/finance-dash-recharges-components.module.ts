import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// components
import { HeaderComponent } from './header/header.component';

// modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { UiComponentsModule } from '@picpay/ui/components';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeRechargeValueComponent } from './modals/change-recharge-value/change-recharge-value.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
    declarations: [HeaderComponent, ChangeRechargeValueComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        DesignSystemAngularModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        UiComponentsModule,
        CurrencyMaskModule,
    ],
    exports: [HeaderComponent],
    entryComponents: [ChangeRechargeValueComponent],
})
export class FinanceDashRechargesComponentsModule {}
