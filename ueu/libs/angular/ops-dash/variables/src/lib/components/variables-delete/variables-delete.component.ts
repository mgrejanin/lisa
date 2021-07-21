import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { VariablesService } from '../../data-access/variables/variables.service';

@Component({
    selector: 'ops-dash-variables-delete',
    templateUrl: './variables-delete.component.html',
    styleUrls: ['./variables-delete.component.scss'],
})
export class VariablesDeleteComponent implements OnInit {
    formDeleteVariable: FormGroup;
    keyValue: string;
    showButton = true;

    constructor(
        private variableService: VariablesService,
        public dialogRef: MatDialogRef<VariablesDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { key: string },
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.formDeleteVariable = this.formBuilder.group({
            keyValue: ['', [Validators.required]],
        });
    }

    keyDelete(value: string): void {
        this.showButton = value === this.data.key ? false : true;
    }

    deleteVariable(): void {
        if (this.formDeleteVariable.invalid) {
            return;
        }

        this.keyValue = this.formDeleteVariable.get('keyValue').value;

        if (this.data.key === this.keyValue) {
            this.variableService.deleteVariable(this.data.key);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
