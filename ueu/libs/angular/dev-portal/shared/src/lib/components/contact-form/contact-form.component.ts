import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ContactQuery } from '../../data-access/contact/contact.query';
import { ContactService } from '../../data-access/contact/contact.service';

// Interfaces
import { Contact, ContactTag, ContactTagGroup } from '../../models';

import { EventTracking } from '@picpay/event-tracking';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'dev-portal-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    isFormLoading = false;
    formSent = false;
    formSentSuccess = true;
    tags: ContactTag[];

    tags$: Observable<ContactTagGroup>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<ContactFormComponent>,
        public formBuilder: FormBuilder,
        public contactService: ContactService,
        public query: ContactQuery,
    ) {
        // Form validation ruleZ
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            body: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/\([1-9]\d\)\s9?\d{4,5}-\d{4}/)]],
            tag: ['', Validators.required],
            terms: [false, Validators.required],
        });

        // Get tags from Akita
        this.tags$ = this.query.tags$;

        // Logged user
        if (data.user) {
            this.form.patchValue({
                name: data.user.attributes.name[0],
                email: data.user.email,
            });
        }
    }

    ngOnInit(): void {
        this.loadTags();

        // Watch for the value change of the phone input and then apply the mask
        this.form
            .get('phone')
            .valueChanges.pipe(subscribeUntil(this))
            .subscribe((value: string) => {
                // remove all mask characters (keep only numeric)
                let newVal: string = value.replace(/\D/g, '');
                if (newVal.length > 11) {
                    newVal = newVal.substring(0, 11);
                }

                // don't show braces for empty value and apply the hypen depending on the total numbers
                newVal =
                    newVal.length === 0
                        ? ''
                        : newVal.length <= 2
                        ? newVal.replace(/^(\d{0,2})/, '($1)')
                        : newVal.length <= 6
                        ? newVal.replace(/^(\d{0,2})(\d{0,4})/, '($1) $2')
                        : newVal.length <= 10
                        ? newVal.replace(/^(\d{0,2})(\d{0,4})(.*)/, '($1) $2-$3')
                        : newVal.replace(/^(\d{0,2})(\d{0,5})(.*)/, '($1) $2-$3');

                // Set the new value with the mask applied but skips event emission
                this.form.get('phone').patchValue(newVal, { emitEvent: false });
            });

        this.tags$.pipe(subscribeUntil(this)).subscribe((tagGroup: ContactTagGroup) => {
            if (tagGroup) {
                this.tags = tagGroup[this.data.slug];
            }
        });
    }

    // Forces validation and error status on the form fields when they are empty and never touched
    forceEmptyFormValidation(): void {
        Object.keys(this.form.controls).map(item => {
            const formField: AbstractControl = this.form.controls[item];
            if (!formField.dirty) {
                formField.updateValueAndValidity();
            }
        });
    }

    findTagIndex(tag): number {
        return this.tags.findIndex(item => item.tag === tag);
    }

    // Form submit handler
    onSubmit(): void {
        // Error and feedback control
        this.submitted = true;
        this.forceEmptyFormValidation();

        // stops here if form is invalid
        if (this.form.invalid || !this.formRef.terms.value) {
            return;
        }

        // Web service call
        this.isFormLoading = true;
        const formData: Contact = {
            name: this.formRef.name.value,
            email: this.formRef.email.value,
            phone: this.formRef.phone.value,
            subject: this.tags[this.findTagIndex(this.formRef.tag.value)].subject,
            body: this.formRef.body.value,
            tag: this.formRef.tag.value,
        };

        this.contactService
            .sendContact(formData)
            .pipe(subscribeUntil(this))
            .subscribe(
                () => {
                    this.isFormLoading = false;
                    this.formSent = true;
                    EventTracking.track('Button Clicked', {
                        button_name: 'BOTAO_ENVIAR_CONTATO',
                        page_name: `STUDIO_PICPAY_${this.data.slug.toLocaleUpperCase()}`,
                        context: 'SUCESSO_FORMULARIO_CONTATO',
                    });
                },
                () => {
                    this.isFormLoading = false;
                    this.formSent = true;
                    this.formSentSuccess = false;
                    EventTracking.track('Button Clicked', {
                        button_name: 'BOTAO_ENVIAR_CONTATO',
                        page_name: `STUDIO_PICPAY_${this.data.slug.toLocaleUpperCase()}`,
                        context: 'ERRO_FORMULARIO_CONTATO',
                    });
                },
            );
    }

    // Closes the modal dialog
    onCancel(button_name?: string, context?: string): void {
        EventTracking.track('Button Clicked', {
            button_name,
            page_name: `STUDIO_PICPAY_${this.data.slug.toLocaleUpperCase()}`,
            context: `${context}`,
        });
        this.dialogRef.close();
    }

    loadTags(): void {
        this.contactService.getTags(this.data.doc || 'external');
    }

    onReset(): void {
        this.submitted = false;
        this.formSent = false;
        this.formSentSuccess = true;
        EventTracking.track('Button Clicked', {
            button_name: 'BOTAO_TENTAR_NOVAMENTE_CONTATO',
            page_name: `STUDIO_PICPAY_${this.data.slug.toLocaleUpperCase()}`,
            context: `ERRO_TENTA_NOVAMENTE_CONTATO`,
        });
    }

    // Getter for easy access to form fields
    get formRef() {
        return this.form.controls;
    }
}
