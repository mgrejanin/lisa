import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { CredentialsService, ProjectCredential } from '@picpay/seller-panel/services';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'seller-panel-credentials-generate-credentials',
    templateUrl: './generate-credentials.component.html',
    styleUrls: ['./generate-credentials.component.scss'],
})
export class GenerateCredentialsComponent {
    form: FormGroup;
    isLoading = false;

    constructor(
        private formBuilder: FormBuilder,
        private service: CredentialsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.form = formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            url: new FormControl('', [
                Validators.required,
                // eslint-disable-next-line no-useless-escape
                Validators.pattern(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/),
            ]),
        });
    }

    createProject(): void {
        if (this.form.invalid) {
            return;
        }

        const project: ProjectCredential = {
            project_name: this.formRef.name.value,
            callback_url: this.formRef.url.value,
        };

        this.isLoading = true;
        this.service
            .saveProjectCredential(project)
            .pipe(
                subscribeUntil(this),
                finalize(() => {
                    this.isLoading = false;
                }),
            )
            .subscribe(async () => {
                await this.router.navigate(['/']);
            });
    }

    get formRef(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }
}
