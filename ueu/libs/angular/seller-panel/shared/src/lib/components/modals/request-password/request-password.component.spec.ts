import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { EventTracking } from '@picpay/event-tracking';

import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { LoadingButtonComponent } from '../../loading-button/loading-button.component';
import { RequestPasswordComponent } from './request-password.component';
import { ValidationMessagesComponent } from '../../validation-messages/validation-messages.component';

import { MockComponents, MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';
import { CheckPasswordService, CheckPasswordServiceMock } from '@picpay/seller-panel/services';

describe('RequestPasswordComponent', () => {
    let component: RequestPasswordComponent;
    let fixture: ComponentFixture<RequestPasswordComponent>;
    let matDialogRef: MatDialogRef<RequestPasswordComponent>;
    let checkPasswordService: CheckPasswordService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                MockModule(MatFormFieldModule),
                MockModule(MatIconModule),
            ],
            declarations: [
                RequestPasswordComponent,
                MockComponents(LoadingButtonComponent, ValidationMessagesComponent),
            ],
            providers: [
                { provide: CheckPasswordService, useClass: CheckPasswordServiceMock },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestPasswordComponent);
        component = fixture.componentInstance;

        matDialogRef = TestBed.inject(MatDialogRef);
        checkPasswordService = TestBed.inject(CheckPasswordService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should onApplyPassword function (Case Success)', () => {
        const dialogSpy = spyOn(matDialogRef, 'close');
        const authServiceSpy = spyOn(checkPasswordService, 'verifyPassword').and.callThrough();
        const evtTrancking = spyOn(EventTracking, 'track');

        component.onApplyPassword();

        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Settings - Password',
            seller_id: undefined,
        });

        expect(authServiceSpy).toHaveBeenCalledWith(component.form.value);
        expect(component.connecting).toBe(false);
        expect(dialogSpy).toHaveBeenCalledWith({ confirm: true });
    });

    it('should onApplyPassword function (Case Error)', () => {
        const dialogSpy = spyOn(matDialogRef, 'close');
        const authServiceSpy = spyOn(checkPasswordService, 'verifyPassword').and.returnValue(throwError({}));

        component.onApplyPassword();

        expect(authServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.connecting).toBe(false);
        expect(dialogSpy).toHaveBeenCalledWith({ confirm: false });
    });

    it('should onClose function', () => {
        const dialogSpy = spyOn(matDialogRef, 'close');
        const cancelSpy = spyOn(component, 'onClose').and.callThrough();

        component.onClose();

        expect(cancelSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalled();
    });
});
