import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';
import { VariableType, VariablesTypeOption } from '../../models/variables-type.model';
import { VariablesUpdate } from '../../models/variables-update.model';
import { VariablesQuery } from '../../data-access/variables/variables.query';
import { VariablesService } from '../../data-access/variables/variables.service';

import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'ops-dash-variables-update',
    templateUrl: './variables-update.component.html',
    styleUrls: ['./variables-update.component.scss'],
})
export class VariablesUpdateComponent implements OnInit {
    readonly environment$: Observable<string>;
    associatedServices$: Observable<Service[]>;

    isLoadingUpdateVariable$: Observable<boolean>;
    isLoadingService$: Observable<boolean>;
    isLoadingValueVariableSecret$: Observable<boolean>;
    isLoadingButtonDeploy$: Observable<boolean>;

    showValueVariableSecret$: Observable<boolean>;
    disabledSection$: Observable<boolean>;

    valueVariable: string;
    typeVariable: VariableType;
    versionVariable: number;

    activeKey: string;
    variables: Variable;
    versions: unknown;
    formUpdateVariable: FormGroup;
    formService: FormGroup;
    formDeployService: FormGroup;
    versionShow: boolean;
    buttonUpdate: boolean;
    buttonRollback: boolean;
    buttonHelpSecret: boolean;
    isLoadingVersion: boolean;
    itemDropdownClass: string;
    versionChange: number;
    itemDisabled: string;
    variablesTypes: VariablesTypeOption[];

    @ViewChild('tabs') tabGroup: MatTabGroup;

    constructor(
        private variableService: VariablesService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog,
        private variablesQuery: VariablesQuery,
    ) {
        this.variablesTypes = [{ type: VariableType.PLAIN }, { type: VariableType.SECRET }];
        this.environment$ = this.variablesQuery.environment$;

        this.isLoadingUpdateVariable$ = this.variablesQuery.isLoadingUpdateVariable$;
        this.isLoadingService$ = this.variablesQuery.isLoadingService$;
        this.isLoadingValueVariableSecret$ = this.variablesQuery.isLoadingValueVariableSecret$;
        this.isLoadingButtonDeploy$ = this.variablesQuery.isLoadingButtonDeploy$;

        this.showValueVariableSecret$ = this.variablesQuery.showValueVariableSecret$;
        this.disabledSection$ = this.variablesQuery.disabledSection$;
        this.associatedServices$ = this.variablesQuery.associatedServices$;

        this.variablesQuery.activeVariableKey$.pipe(subscribeUntil(this)).subscribe((activeKey: string) => {
            if (activeKey) {
                this.activeKey = activeKey;
                this.getVariableKey();
            }
        });
    }

    ngOnInit(): void {
        this.formUpdateVariable = this.formBuilder.group({
            type: ['', [Validators.required]],
            value: ['', [Validators.required]],
        });

        this.formService = this.formBuilder.group({
            service: ['', [Validators.required]],
            alias: [''],
        });

        this.formDeployService = this.formBuilder.group({
            deploy: this.formBuilder.array([], [Validators.required]),
        });

        this.startUpdateSubscription();
        this.startGetSubscription();
    }

    updateFormByVariableType(): void {
        this.formUpdateVariable.patchValue({ type: this.typeVariable });

        if (this.typeVariable === VariableType.SECRET) {
            this.buttonHelpSecret = true;
            this.formUpdateVariable.patchValue({ value: '***' });
            return;
        }

        if (this.typeVariable === VariableType.PLAIN) {
            this.buttonHelpSecret = false;
            this.formUpdateVariable.patchValue({ value: this.valueVariable });
            return;
        }

        if (this.typeVariable === null) {
            this.buttonHelpSecret = false;
            this.formUpdateVariable.patchValue({ value: '' });
            return;
        }
    }

    changeVersion(event: number): void {
        this.versionVariable = event;

        this.buttonUpdate = this.versionChange.toString() === this.versionVariable.toString() ? true : false;
        this.buttonRollback = this.versionChange.toString() === this.versionVariable.toString() ? false : true;
        this.itemDisabled =
            this.versionChange.toString() === this.versionVariable.toString() ? 'itemAbled' : 'itemDisabled';

        this.variableService.getVariableVersion(this.activeKey, this.versionVariable);

        this.variablesQuery.valueVariable$.pipe(subscribeUntil(this)).subscribe((value: string) => {
            this.valueVariable = value;
            this.updateFormByVariableType();
        });

        this.variablesQuery.typeVariable$.pipe(subscribeUntil(this)).subscribe((type: VariableType) => {
            this.typeVariable = type;
            this.updateFormByVariableType();
        });
    }

    getVersions(version: number): void {
        const versions = [];
        for (let i = 1; i <= version; i += 1) {
            versions.push(i);
        }
        this.versions = versions;
    }

    getVariableKey(): void {
        this.buttonUpdate = true;
        this.buttonRollback = false;
        this.itemDisabled = 'itemAbled';
        this.isLoadingVersion = true;
        this.versionShow = false;

        this.variableService
            .getVariableKey(this.activeKey)
            .pipe(subscribeUntil(this))
            .subscribe(response => {
                this.variables = response;
                this.versionVariable = response.version;
                this.versionChange = this.versionVariable;

                this.typeVariable = response.type;
                this.valueVariable = response.value;

                this.versionShow = true;
                this.isLoadingVersion = false;

                this.getVersions(this.versionVariable);
                this.tabGroup.selectedIndex = 0;
                this.updateFormByVariableType();
            });
    }

    updateVariable(): void {
        if (this.formUpdateVariable.invalid) {
            return;
        }

        const value = this.formUpdateVariable.get('value').value;
        const type = this.formUpdateVariable.get('type').value;
        const params = new VariablesUpdate(value, type);

        this.variableService.updateVariable(this.activeKey, params);
    }

    showValueVariableSecret(): void {
        this.buttonHelpSecret = false;
        this.variableService.showValueVariableSecret(this.activeKey, this.versionVariable);

        this.variablesQuery.valueVariableSecret$.pipe(subscribeUntil(this)).subscribe((value: string) => {
            this.formUpdateVariable.controls.value.setValue(value);
        });
    }

    rollbackVariable(): void {
        if (this.formUpdateVariable.invalid) {
            return;
        }

        const value = this.formUpdateVariable.get('value').value;
        const type = this.formUpdateVariable.get('type').value;
        const params = new VariablesUpdate(value, type);

        this.variableService.rollbackVariable(this.activeKey, this.versionVariable, params);
    }

    getServiceKey(): void {
        this.variableService.getVariableServicesByKey(this.activeKey);
    }

    associateService(): void {
        this.clearFormArray();

        if (this.formService.invalid) {
            return;
        }

        const service = this.formService.get('service').value;
        const key = this.activeKey;
        const alias = this.formService.get('alias').value;
        const params = new Service(service, key, alias, null);

        this.variableService.associateService(service, params);
        this.formService.reset();
    }

    desassociateService(paramService: string): void {
        this.clearFormArray();
        this.variableService.desassociateService(paramService, this.activeKey);
    }

    startUpdateSubscription(): void {
        this.variableService.onServiceUpdate
            .pipe(
                subscribeUntil(this),
                tap(() => this.getServiceKey()),
            )
            .subscribe();
    }

    startGetSubscription(): void {
        this.variableService.onVariablesGet
            .pipe(
                subscribeUntil(this),
                tap(() => this.getVariableKey()),
            )
            .subscribe();
    }

    onCheckboxChange(checked: boolean, service: string) {
        const servicesToDeploy: FormArray = this.formDeployService.get('deploy') as FormArray;

        if (checked) {
            servicesToDeploy.push(new FormControl(service));
            return;
        }

        const index = servicesToDeploy.controls.findIndex(item => item.value === service);
        servicesToDeploy.removeAt(index);
    }

    deployService(): void {
        const value = this.formDeployService.get('deploy').value;
        this.variableService.deployService(value);
    }

    clearFormArray(): void {
        this.formDeployService.setControl('deploy', this.formBuilder.array([], [Validators.required]));
    }

    tabClick(event: number): void {
        if (event === 1) {
            this.getServiceKey();
            this.clearFormArray();
        }
    }

    menuDropdownClick(title: string, buttonClass: string): void {
        this.itemDropdownClass = buttonClass;
        this.variableService.setEnvironment(title);

        this.getVariableKey();
        this.tabGroup.selectedIndex = 0;
    }
}
