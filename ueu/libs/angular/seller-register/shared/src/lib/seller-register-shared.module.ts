import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FieldValidationComponent } from './components/field-validation/field-validation.component';

const materialModules = [MatIconModule, MatFormFieldModule, MatInputModule];
@NgModule({
    declarations: [FieldValidationComponent],
    imports: [CommonModule, ReactiveFormsModule, ...materialModules],
    exports: [FieldValidationComponent, ReactiveFormsModule, ...materialModules],
    providers: [],
    entryComponents: [],
})
export class SellerRegisterSharedModule {}
