import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validJson } from '@picpay/angular/shared/validators';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

// interfaces
import {
    Comparator,
    FeatureConditionExpression,
    FeatureCondition,
    UpdateFeatureParams,
    Application,
    Feature,
    FeatureType,
    Squad,
    ClientGroup,
    FeatureCreate,
} from '../../models';

// rxjs
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// data-access
import { FeaturesQuery } from '../../data-access/features/features.query';
import { FeaturesService } from '../../data-access/features/features.service';

// services
import { NotificationsService } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'feature-flag-features-create-feature',
    templateUrl: './feature-workbench.component.html',
    styleUrls: ['./feature-workbench.component.scss'],
})
export class FeatureWorkbenchComponent implements OnInit {
    readonly form: FormGroup;

    readonly isLoading$: Observable<boolean>;

    private valueControl: AbstractControl;

    // Select options
    readonly applications$: Observable<Application[]>;
    readonly squads$: Observable<Squad[]>;
    readonly clientGroups$: Observable<ClientGroup[]>;
    readonly featureTypes: typeof FeatureType = FeatureType;

    // editing mode state
    readonly isEditing: boolean;
    private featureId: string;

    constructor(
        private featuresQuery: FeaturesQuery,
        private featuresService: FeaturesService,
        private formBuilder: FormBuilder,
        private modalsService: NotificationsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.form = this.formBuilder.group({
            name: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                    Validators.pattern('^[a-zA-Z0-9_]*$'),
                ]),
            ],
            description: ['', Validators.required],
            type: [null, Validators.required],
            value: [null, Validators.required],
            application: ['', Validators.required],
            squad: ['', Validators.required],
            conditions: this.formBuilder.array([]),
            message: [''],
        });

        this.valueControl = this.form.get('value');

        this.isLoading$ = featuresQuery.isLoading$;
        this.applications$ = this.featuresQuery.applications$;
        this.squads$ = this.featuresQuery.squads$;
        this.clientGroups$ = this.featuresQuery.clientGroups$;

        this.isEditing = this.route.snapshot.data.editing;
    }

    ngOnInit(): void {
        this.featuresService.getApplications();
        this.featuresService.getSquads();

        this.valueControl.valueChanges.pipe(subscribeUntil(this)).subscribe(() => {
            this.formatJsonInput(this.valueControl);
        });

        if (this.isEditing) {
            this.featuresQuery.activeFeature$.pipe(take(1)).subscribe(async (feature: Feature) => {
                if (!feature) {
                    await this.onReturn();

                    return;
                }

                this.prepareForEdit(feature);
            });
        }
    }

    updateValidators(featureType: string): void {
        const conditions = this.conditions.controls;

        switch (featureType) {
            case this.featureTypes.JSON:
                this.valueControl.setValidators([Validators.required, validJson()]);

                conditions.forEach(condition => {
                    const conditionValueControl = condition.get('value');

                    conditionValueControl.setValidators([Validators.required, validJson()]);
                    conditionValueControl.reset();
                });
                break;

            default:
                this.valueControl.setValidators(Validators.required);

                conditions.forEach(condition => {
                    const conditionValueControl = condition.get('value');

                    conditionValueControl.setValidators(Validators.required);
                    conditionValueControl.reset();
                });
                break;
        }

        this.valueControl.reset();
    }

    private unformatJson(value: string): string {
        return JSON.stringify(JSON.parse(value));
    }

    formatJsonInput(valueControl: AbstractControl): void {
        if (this.form.get('type').value !== this.featureTypes.JSON || valueControl.invalid) {
            return;
        }

        const parsedJson = JSON.parse(valueControl.value);
        const formattedJson = JSON.stringify(parsedJson, undefined, 4);

        valueControl.setValue(formattedJson, { emitEvent: false });
    }

    getAppClientGroups(applicationId: string): void {
        this.featuresService.getClientGroups(applicationId);
    }

    get conditions(): FormArray {
        return this.form.get('conditions') as FormArray;
    }

    getConditionGroup(index: number): FormGroup {
        // the template expects the conditions.controls[index]
        // to be an simple abstract control. This functions serves
        // to return the control as a formGroup so we can
        // access the inside controls errors.

        const formGroup = this.conditions.controls[index] as FormGroup;

        return formGroup;
    }

    getConditionName(index: number): string {
        const control = this.getConditionGroup(index);

        // checks if the controller exists and
        // returns his value if it has any.
        const name =
            control && control.controls && control.controls.name.value
                ? control.controls.name.value
                : 'Nova segmentação';

        return name;
    }

    onAddCondition(): void {
        const formGroup = this.formBuilder.group({
            id: [null],
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            value: ['', Validators.required],
            percentage: ['', Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
            system: ['', Validators.required],
            versionComparator: [''],
            clientGroup: [''],
        });

        const featureType = this.form.get('type').value;
        const conditionValueControl = formGroup.controls.value;

        if (featureType === this.featureTypes.JSON) {
            conditionValueControl.setValidators([Validators.required, validJson()]);
        }

        conditionValueControl.valueChanges.pipe(subscribeUntil(this)).subscribe(() => {
            this.formatJsonInput(conditionValueControl);
        });

        // subscription used to update
        // the form with the necessary controls
        // to create the version option
        formGroup.controls.versionComparator.valueChanges.pipe(subscribeUntil(this)).subscribe(value => {
            switch (value) {
                case 'greater':
                    this.clearVersionControls(formGroup);

                    formGroup.addControl('version', new FormControl('', Validators.required));

                    break;

                case 'greater-or-equal':
                    this.clearVersionControls(formGroup);

                    formGroup.addControl('version', new FormControl('', Validators.required));

                    break;

                case 'less':
                    this.clearVersionControls(formGroup);

                    formGroup.addControl('version', new FormControl('', Validators.required));

                    break;

                case 'less-or-equal':
                    this.clearVersionControls(formGroup);

                    formGroup.addControl('version', new FormControl('', Validators.required));

                    break;

                case 'equal':
                    this.clearVersionControls(formGroup);

                    formGroup.addControl('version', new FormControl('', Validators.required));

                    break;

                case 'between':
                    this.clearVersionControls(formGroup);

                    formGroup.addControl('minVersion', new FormControl('', Validators.required));
                    formGroup.addControl('maxVersion', new FormControl('', Validators.required));

                    break;

                default:
                    this.clearVersionControls(formGroup);

                    break;
            }
        });

        this.conditions.push(formGroup);
    }

    onRemoveCondition(index: number): void {
        const modalRef = this.modalsService.openConfirmationModal(
            'Excluir segmentação',
            'Ao excluir essa segmentação, você não poderá mais visualizá-la. Deseja realmente excluir?',
        );

        modalRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(async reason => {
                if (reason && reason.confirm) {
                    this.conditions.removeAt(index);
                }
            });
    }

    onSubmit(): void {
        // The form groups inside conditions are
        // not being marked as touched when we try to submit.
        // This functions serves to fix this.
        this.touchConditionsFormGroup();

        if (this.form.invalid) {
            return;
        }

        const name: string = this.form.get('name').value;
        const description: string = this.form.get('description').value;
        const type: FeatureType = this.form.get('type').value;
        let value: string = this.form.get('value').value;
        const application: string = this.form.get('application').value;
        const squad: string = this.form.get('squad').value;
        const conditions = this.getFormattedConditions(this.conditions, type);

        if (type === this.featureTypes.JSON) {
            value = this.unformatJson(value);
        }

        // checks if is in editing mode
        // and do the proper logic. If not,
        // continues to the creation logic.
        if (this.isEditing) {
            const id: string = this.featureId;
            const message = this.form.controls.message.value;

            const params = new UpdateFeatureParams(description, value, message, conditions);

            this.featuresService.updateFeature(id, params);

            return;
        }

        const feature = new FeatureCreate(name, description, type, value, application, squad, conditions);

        this.featuresService.createFeature(feature);
    }

    async onReturn(): Promise<void> {
        await this.router.navigate(['../']);
    }

    private clearVersionControls(formGroup: FormGroup): void {
        // this function is used to
        // clear the version controls of a
        // condition form group.

        formGroup.removeControl('version');
        formGroup.removeControl('minVersion');
        formGroup.removeControl('maxVersion');
    }

    private prepareForEdit(feature: Feature): void {
        const form = this.form.controls;

        // Setting the values on the form
        // and disabling the necessary controls.
        form.name.disable();
        form.name.setValue(feature.name);

        form.description.setValue(feature.description);

        form.application.disable();
        form.application.setValue(feature.application.id);
        this.getAppClientGroups(feature.application.id);

        form.squad.disable();
        form.squad.setValue(feature.squad.id);

        form.type.disable();
        form.type.setValue(feature.type);
        this.updateValidators(feature.type);

        form.value.setValue(feature.value);

        // adding the necessary validators to
        // message control
        form.message.setValidators(Validators.compose([Validators.required, Validators.minLength(10)]));

        this.featureId = feature.id;

        feature.conditions.forEach((condition, index) => {
            this.onAddCondition();

            const conditionGroup = this.getConditionGroup(index);

            conditionGroup.controls.id.setValue(condition.id);
            conditionGroup.controls.name.setValue(condition.name);
            conditionGroup.controls.value.setValue(condition.value);
            conditionGroup.controls.percentage.setValue(condition.percentage);
            conditionGroup.controls.system.setValue(this.getConditionSystem(condition));
            conditionGroup.controls.clientGroup.setValue(this.getConditionClientGroup(condition));

            this.setConditionAppVersion(condition, conditionGroup);
        });
    }

    private getConditionSystem(condition: FeatureCondition): string {
        // simple function used to find the
        // expression that defines the OS
        // and returns the simple value to the
        // form controller.
        const index = condition.expressions.findIndex(exp => exp.param === 'appOS');

        return condition.expressions[index] ? condition.expressions[index].value : '';
    }

    private getConditionClientGroup(condition: FeatureCondition): string {
        const index = condition.expressions.findIndex(exp => exp.param === 'groups');

        return condition.expressions[index] ? condition.expressions[index].value : '';
    }

    private setConditionAppVersion(condition: FeatureCondition, formGroup: FormGroup): void {
        const expressions = condition.expressions.filter(exp => exp.param === 'appVersion');

        if (expressions.length === 0) {
            return;
        }

        if (expressions.length > 1) {
            // unfortunately this is a bit of business logic
            // on the front end side. Always work with the version interval
            // being >= min version and <= max version.
            const minIndex = condition.expressions.findIndex(exp => exp.comparator === Comparator.GREATER_OR_EQUAL);
            const maxIndex = condition.expressions.findIndex(exp => exp.comparator === Comparator.LESS_OR_EQUAL);

            formGroup.controls.versionComparator.setValue('between');
            formGroup.controls.minVersion.setValue(condition.expressions[minIndex].value);
            formGroup.controls.maxVersion.setValue(condition.expressions[maxIndex].value);

            return;
        }

        switch (expressions[0].comparator) {
            case Comparator.EQUAL:
                formGroup.controls.versionComparator.setValue('equal');
                formGroup.controls.version.setValue(expressions[0].value);

                break;

            case Comparator.LESS:
                formGroup.controls.versionComparator.setValue('less');
                formGroup.controls.version.setValue(expressions[0].value);

                break;

            case Comparator.LESS_OR_EQUAL:
                formGroup.controls.versionComparator.setValue('less-or-equal');
                formGroup.controls.version.setValue(expressions[0].value);

                break;

            case Comparator.GREATER:
                formGroup.controls.versionComparator.setValue('greater');
                formGroup.controls.version.setValue(expressions[0].value);

                break;

            case Comparator.GREATER_OR_EQUAL:
                formGroup.controls.versionComparator.setValue('greater-or-equal');
                formGroup.controls.version.setValue(expressions[0].value);

                break;
        }
    }

    private getFormattedConditions(formArray: FormArray, featureType: FeatureType): FeatureCondition[] {
        const conditions: FeatureCondition[] = [];

        formArray.controls.forEach((group: FormGroup, index: number) => {
            const id = group.controls.id.value;
            const name = group.controls.name.value;
            let value = group.controls.value.value;
            const percentage = group.controls.percentage.value;

            if (featureType === this.featureTypes.JSON) {
                value = this.unformatJson(value);
            }

            const expressions = this.getFormattedExpressions(group);

            const condition = new FeatureCondition(
                name,
                index + 1,
                percentage,
                value,
                expressions,
                id ? id : undefined,
            );

            conditions.push(condition);
        });

        return conditions;
    }

    private getFormattedExpressions(formGroup: FormGroup): FeatureConditionExpression[] {
        const expressions: FeatureConditionExpression[] = [];

        if (formGroup.controls.clientGroup.value) {
            expressions.push(
                new FeatureConditionExpression('groups', Comparator.CONTAINS, formGroup.controls.clientGroup.value),
            );
        }

        // converting appOS expression
        expressions.push(new FeatureConditionExpression('appOS', Comparator.EQUAL, formGroup.controls.system.value));

        // converting the appVersion expressions
        const comparator = formGroup.controls.versionComparator.value;

        switch (comparator) {
            case 'greater':
                expressions.push(
                    new FeatureConditionExpression('appVersion', Comparator.GREATER, formGroup.controls.version.value),
                );

                break;

            case 'greater-or-equal':
                expressions.push(
                    new FeatureConditionExpression(
                        'appVersion',
                        Comparator.GREATER_OR_EQUAL,
                        formGroup.controls.version.value,
                    ),
                );

                break;

            case 'less':
                expressions.push(
                    new FeatureConditionExpression('appVersion', Comparator.LESS, formGroup.controls.version.value),
                );

                break;

            case 'less-or-equal':
                expressions.push(
                    new FeatureConditionExpression(
                        'appVersion',
                        Comparator.LESS_OR_EQUAL,
                        formGroup.controls.version.value,
                    ),
                );

                break;

            case 'equal':
                expressions.push(
                    new FeatureConditionExpression('appVersion', Comparator.EQUAL, formGroup.controls.version.value),
                );

                break;

            case 'between':
                // unfortunately this is a bit of business logic
                // on the front end side. Always work with the version interval
                // being >= min version and <= max version.

                expressions.push(
                    new FeatureConditionExpression(
                        'appVersion',
                        Comparator.GREATER_OR_EQUAL,
                        formGroup.controls.minVersion.value,
                    ),
                );

                expressions.push(
                    new FeatureConditionExpression(
                        'appVersion',
                        Comparator.LESS_OR_EQUAL,
                        formGroup.controls.maxVersion.value,
                    ),
                );

                break;
        }

        return expressions;
    }

    private touchConditionsFormGroup(): void {
        const formArray = this.form.controls.conditions as FormArray;

        formArray.controls.forEach(control => {
            control.markAllAsTouched();
        });
    }
}
