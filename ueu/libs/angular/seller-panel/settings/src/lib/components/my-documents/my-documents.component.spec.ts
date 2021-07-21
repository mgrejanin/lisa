import { throwError } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponents, MockDirective, MockModule } from 'ng-mocks';
import { NgxMaskModule } from 'ngx-mask';

import { ChangeImageProfileComponent } from '../change-image-profile/change-image-profile.component';
import { SellerService, SellerServiceMock, EventTrackingService } from '@picpay/seller-panel/services';
import {
    CharacterConcealerDirective,
    ConfirmComponent,
    LoadingButtonComponent,
    ValidationMessagesComponent,
} from '@picpay/seller-panel/shared';

import { MatDialogMock, validateAllFormFields } from '@picpay/angular/shared/helpers';

import { MyDocumentsComponent } from './my-documents.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { Router } from '@angular/router';

describe('MyDocumentsComponent', () => {
    let component: MyDocumentsComponent;
    let fixture: ComponentFixture<MyDocumentsComponent>;
    let initialDocumentsDataMock;
    let matDialog: MatDialog;
    let sellerService: SellerService;
    let eventTracking: EventTrackingService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                DesignSystemAngularModule,
                NgxMaskModule.forRoot(),
                MockModule(MatFormFieldModule),
                MockModule(MatSelectModule),
            ],
            declarations: [
                MyDocumentsComponent,
                MockComponents(ValidationMessagesComponent, LoadingButtonComponent),
                MockDirective(CharacterConcealerDirective),
            ],
            providers: [
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                { provide: SellerService, useClass: SellerServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyDocumentsComponent);
        component = fixture.componentInstance;

        initialDocumentsDataMock = {
            // COMPANY DATA
            avatar_base64: component.AVATAR_DEFAULT,
            organization_cnpj: { value: '', disabled: true },
            organization_social_reason: { value: '-', disabled: true },
            organization_fantasy_name: { value: '-', disabled: true },
            // OWNER DATA
            responsible_phone: '',
            organization_phone: '',
            organization_email: '',
            // BUSINESS DATA
            organization_name: '-',
            organization_mcc_category_id: '-',
            ecommerce_store_url: '-',
        };

        component.documentsData = initialDocumentsDataMock;
        matDialog = TestBed.inject(MatDialog);
        sellerService = TestBed.inject(SellerService);
        eventTracking = TestBed.inject(EventTrackingService);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should ngOnInit function', () => {
        spyOn(component, 'setInitialDocumentsData');
        spyOn(component, 'initFormDocuments');

        component.ngOnInit();

        expect(component.setInitialDocumentsData).toHaveBeenCalled();
        expect(component.initFormDocuments).toHaveBeenCalled();
    });

    it('should ngAfterViewInit function', () => {
        spyOn(component, 'checkFormChanges');

        component.ngAfterViewInit();

        expect(component.checkFormChanges).toHaveBeenCalled();
    });

    it('should setInitialDocumentsData function', () => {
        component.setInitialDocumentsData();

        expect(component.initialDocumentsData).toEqual({
            avatar_base64: 'assets/placeholders/consumer.png',
            organization_cnpj: '',
            organization_social_reason: '-',
            organization_fantasy_name: '-',
            responsible_phone: '',
            organization_phone: '',
            organization_email: '',
            organization_name: '-',
            organization_mcc_category_id: '',
            ecommerce_store_url: '-',
        });
    });

    it('should initFormDocuments function', () => {
        const form = component.formDocuments;
        expect(form).toBeDefined();

        expect(
            form.get([
                'avatar_base64',
                'organization_cnpj',
                'organization_social_reason',
                'organization_fantasy_name',
                'responsible_phone',
                'organization_phone',
                'organization_email',
                'organization_name',
                'organization_mcc_category_id',
                'ecommerce_store_url',
            ]),
        ).toBeDefined();

        // COMPANY DATA
        expect(form.get('avatar_base64').value).toBe('assets/placeholders/consumer.png');
        expect(form.get('organization_cnpj').value).toBe('');
        expect(form.get('organization_social_reason').value).toBe('-');
        expect(form.get('organization_fantasy_name').value).toBe('-');

        // OWNER DATA
        expect(form.get('responsible_phone').value).toBe('');
        expect(form.get('organization_phone').value).toBe('');
        expect(form.get('organization_email').value).toBe('');

        // BUSINESS DATA
        expect(form.get('organization_name').value).toBe('-');
        expect(form.get('organization_mcc_category_id').value).toBe('');
        expect(form.get('ecommerce_store_url').value).toBe('-');
    });

    it('should eventTrackingClicked function', () => {
        const eventTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.eventTrackingClicked('MEUS_DADOS');

        expect(eventTrackingSpy).toHaveBeenCalled();
    });

    it('should checkFormChanges function', () => {
        const form = component.formDocuments;
        expect(form).toBeDefined();

        // changing cnpj value
        form.get('organization_email').patchValue('test@mail.com');
        fixture.detectChanges();
        component.checkFormChanges();

        expect(component.differenceDocumentsData).toEqual({
            organization_email: 'test@mail.com',
        });
        expect(component.hasChangedDataForm).toBe(true);

        // rollback cnpj value
        form.get('organization_email').patchValue('');
        fixture.detectChanges();
        component.checkFormChanges();

        expect(component.differenceDocumentsData).toEqual({});
        expect(component.hasChangedDataForm).toBe(false);
    });

    it('should trigger openChangeImageModalAndCallEvent function when change-image-btn clicked', () => {
        spyOn(component, 'openChangeImageModalAndCallEvent');
        const changeImageBtn = fixture.debugElement.query(By.css('.c-my-documents__photo-wrapper--change-image-btn'));

        changeImageBtn.nativeElement.click();

        expect(component.openChangeImageModalAndCallEvent).toHaveBeenCalled();
    });

    it('should trigger openChangeImageModalAndCallEvent function', () => {
        spyOn(matDialog, 'open').and.callThrough();
        spyOn(component, 'openChangeImageModalAndCallEvent').and.callThrough();

        component.ngOnInit();

        const changeImageBtn = fixture.debugElement.query(By.css('.c-my-documents__photo-wrapper--change-image-btn'))
            .nativeElement;
        changeImageBtn.click();

        expect(matDialog.open).toHaveBeenCalledWith(ChangeImageProfileComponent, {
            panelClass: ['no-internal-padding', 'o-modal-reset'],
            width: '542px',
            data: { image: component.formDocuments.get('avatar_base64').value },
        });

        expect(component.openChangeImageModalAndCallEvent).toHaveBeenCalled();
    });

    it('should onEditDocuments call validateAllFormFields when form is not valid', () => {
        const editDetailsSpy = spyOn(sellerService, 'editDetails').and.callThrough();
        component.ngOnInit();
        component.ngAfterViewInit();

        component.onEditDocuments();

        expect(component.formDocuments.valid).toBeFalsy();
        expect(validateAllFormFields).toBeDefined();
        expect(editDetailsSpy).toHaveBeenCalledTimes(0);
    });

    it('should onEditDocuments function with isChangeAndNavigateToURL = true', () => {
        const editSpy = spyOn(sellerService, 'editDetails').and.callThrough();
        const routerSpy = spyOn(router, 'navigateByUrl');

        component.formDocuments.patchValue({
            organization_email: 'test@mail.test',
            avatar_base64: 'imageProfileTest.jpeg',
        });

        component.isChangeAndNavigateToURL = true;
        component.hasChangedDataForm = true;
        component.nextUrlToNavigate = '/';
        component.onEditDocuments();

        expect(editSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith(component.nextUrlToNavigate);
    });

    it('should onEditDocuments function editDetails when formDocuments is valid  (case success)', () => {
        spyOn(sellerService, 'editDetails').and.callThrough();

        component.formDocuments.patchValue({
            organization_email: 'test@mail.test',
            avatar_base64: 'imageProfileTest.jpeg',
        });

        component.onEditDocuments();

        sellerService
            .editDetails({
                avatar_base64: 'imageProfileTest.jpeg',
                organization: {
                    email: 'test@mail.test',
                },
                responsible: {},
                ecommerce: {},
            })
            .subscribe(() => {
                expect(component.formDocuments.valid).toBe(true);
                expect(sellerService.editDetails).toHaveBeenCalledWith({
                    avatar_base64: 'imageProfileTest.jpeg',
                    organization: {
                        email: 'test@mail.test',
                    },
                    responsible: {},
                    ecommerce: {},
                });
            });
    });

    it('should onEditDocuments function editDetails when formDocuments is valid (case error)', () => {
        const editDetailsSpy = spyOn(sellerService, 'editDetails').and.returnValue(throwError(''));

        component.formDocuments.patchValue({
            organization_email: 'test@mail.test',
            avatar_base64: 'imageProfileTest.jpeg',
        });

        component.onEditDocuments();

        expect(editDetailsSpy).toHaveBeenCalledTimes(1);
        expect(component.formDocuments.enable).toBeDefined();
    });

    it('should onEditDocuments function return validateAllFormFields when formDocuments is invalid', () => {
        component.formDocuments.patchValue({
            organization_cnpj: null,
        });

        fixture.detectChanges();

        component.onEditDocuments();

        expect(component.onEditDocuments()).toEqual(validateAllFormFields(component.formDocuments));
    });

    it('should onOpenConfirm function', () => {
        const openSpy = spyOn(matDialog, 'open').and.callThrough();

        component.onOpenConfirm();

        expect(openSpy).toHaveBeenCalledWith(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            disableClose: true,
            width: '560px',
        });
    });
});
