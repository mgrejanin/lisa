/* eslint-disable max-len */
import { tap } from 'rxjs/operators';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { customMessage } from '@picpay/angular/shared/validators';

import { VariablesRequest } from '../../models/variables-request.model';
import { VariablesService } from '../../data-access/variables/variables.service';

@Component({
    selector: 'ops-dash-variables-create',
    templateUrl: './variables-create.component.html',
    styleUrls: ['./variables-create.component.scss'],
})
export class VariablesCreateComponent implements OnInit {
    formCreateVariable: FormGroup;

    constructor(
        private variableService: VariablesService,
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<VariablesCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string },
    ) {}

    ngOnInit(): void {
        this.formCreateVariable = this.formBuilder.group({
            key: [
                '',
                [
                    Validators.required,
                    customMessage(
                        Validators.pattern('^[A-Z][A-Z0-9_]*$'),
                        'O nome deve conter apenas letras maiúsculas, números ou underline.',
                    ),
                ],
            ],
        });

        this.startUpdateSubscription();
    }

    createVariable(): void {
        if (this.formCreateVariable.invalid) {
            return;
        }

        const key = this.formCreateVariable.get('key').value;
        const params = new VariablesRequest(key);

        this.variableService.createVariable(params);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    // fecha dialog após o cadastro da variável de ambiente
    startUpdateSubscription(): void {
        this.variableService.onVariablesUpdate
            .pipe(
                tap(() => {
                    this.dialogRef.close();
                }),
            )
            .subscribe();
    }
}
