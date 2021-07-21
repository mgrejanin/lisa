import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { ContactFormComponent } from './contact-form.component';
import { ContactService } from '../../data-access/contact/contact.service';

// Models
import { Contact, ContactReponse } from '../../models';
import { of, throwError } from 'rxjs';

import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { MockModule } from 'ng-mocks';

xdescribe('ContactFormComponent', () => {
    let component: ContactFormComponent;
    let fixture: ComponentFixture<ContactFormComponent>;
    let service: ContactService;

    const contactMock: Contact = {
        name: 'name',
        email: 'email@email.com',
        subject: 'subject',
        body: 'msg',
        phone: '(11) 99999-9999',
        tag: 'tag',
    };

    beforeEach(async () => {
        const MatDialogRefStub = () => ({ close: () => ({}) });

        await TestBed.configureTestingModule({
            declarations: [ContactFormComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                SharedTrackEventsModule.forRoot(),
                MockModule(DesignSystemAngularModule),
                MatDialogModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
            ],
            providers: [
                ContactService,
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {}, useFactory: MatDialogRefStub },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactFormComponent);
        service = TestBed.inject(ContactService);
        component = fixture.componentInstance;
        component.data.slug = 'product-slug';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an onCancel function', () => {
        const MatDialogRefStub: MatDialogRef<ContactFormComponent> | undefined = TestBed.inject(MatDialogRef);
        const spy = spyOn(MatDialogRefStub, 'close').and.callThrough();
        component.onCancel();
        expect(spy).toHaveBeenCalled();
    });

    it('should have findTagIndex function', () => {
        expect(component.findTagIndex).toBeDefined();

        component.tags = [
            { tag: 'tag.1', subject: 'sub' },
            { tag: 'tag.2', subject: 'sub' },
        ];

        fixture.detectChanges();

        const index: number = component.findTagIndex('tag.2');
        expect(index).toBe(1);
    });

    it('should have and formRef get accessor', () => {
        expect(component.formRef).toBeDefined();
    });

    it('should have have a function to reset form control variables', () => {
        expect(component.onReset).toBeDefined();

        component.submitted = true;
        component.formSent = true;
        component.formSentSuccess = false;
        fixture.detectChanges();

        expect(component.submitted).toBeTruthy();
        expect(component.formSent).toBeTruthy();
        expect(component.formSentSuccess).toBeFalsy();

        component.onReset();
        fixture.detectChanges();
        expect(component.submitted).toBeFalsy();
        expect(component.formSent).toBeFalsy();
        expect(component.formSentSuccess).toBeTruthy();
    });

    it('should have an onSubmit function', () => {
        const form = component.form;
        const contactResponse: ContactReponse = { message: 'msg' };
        const updatedSpy = spyOn(service, 'sendContact').and.returnValue(of(contactResponse));

        // should not submit if the form is invalid
        component.onSubmit();

        expect(form.invalid).toBe(true);
        expect(updatedSpy).not.toHaveBeenCalled();

        // should submit
        component.tags = [
            { tag: 'tag', subject: 'sub' },
            { tag: 'tag.2', subject: 'sub' },
        ];

        fixture.detectChanges();

        form.controls.name.setValue(contactMock.name);
        form.controls.email.setValue(contactMock.email);
        form.controls.body.setValue(contactMock.body);
        form.controls.phone.setValue(contactMock.phone);
        form.controls.tag.setValue(contactMock.tag);
        form.controls.terms.setValue(true);
        form.updateValueAndValidity();

        expect(form.valid).toBe(true);

        component.onSubmit();
        service.sendContact(contactMock).subscribe(result => result);

        expect(updatedSpy).toHaveBeenCalledWith(contactMock);
    });

    it('should have error feedback for the contact form', () => {
        spyOn(service, 'sendContact').and.returnValue(throwError({ status: 404 }));
        const form = component.form;

        component.tags = [
            { tag: 'tag', subject: 'sub' },
            { tag: 'tag.2', subject: 'sub' },
        ];

        fixture.detectChanges();

        form.controls.name.setValue(contactMock.name);
        form.controls.email.setValue(contactMock.email);
        form.controls.body.setValue(contactMock.body);
        form.controls.phone.setValue(contactMock.phone);
        form.controls.tag.setValue(contactMock.tag);
        form.controls.terms.setValue(true);
        form.updateValueAndValidity();

        component.onSubmit();
        service.sendContact(contactMock).subscribe(result => result);

        expect(component.formSent).toBeTruthy();
        expect(component.formSentSuccess).toBeFalsy();
    });
});
