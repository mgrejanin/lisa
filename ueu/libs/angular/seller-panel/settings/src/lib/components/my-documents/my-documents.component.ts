import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { SellerQuery, SellerResponse, SellerService, EventTrackingService } from '@picpay/seller-panel/services';
import { ChangeImageProfileComponent } from '../change-image-profile/change-image-profile.component';
import { ConfirmComponent } from '@picpay/seller-panel/shared';
import { diffObjects, isEmptyObject, separateInChildren, validateAllFormFields } from '@picpay/angular/shared/helpers';

import { businessCategoriesValue } from '../../models/business-category.value';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'seller-panel-my-documents',
    templateUrl: './my-documents.component.html',
    styleUrls: ['./my-documents.component.scss'],
})
export class MyDocumentsComponent implements OnInit, AfterViewInit, OnDestroy {
    formDocuments: FormGroup;
    documentsData: SellerResponse;
    initialDocumentsData;
    differenceDocumentsData;
    hasChangedDataForm = false;
    isChangeAndNavigateToURL = false;
    nextUrlToNavigate: string;
    businessCategories;
    readonly isLoading$: Observable<boolean>;

    readonly AVATAR_DEFAULT = 'assets/placeholders/consumer.png';

    private unsubscribe$ = new Subject<boolean>();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private sellerService: SellerService,
        public sellerQuery: SellerQuery,
        private notifications: NotificationsService,
        private eventTracking: EventTrackingService,
    ) {
        this.businessCategories = businessCategoriesValue;
        this.documentsData = this.sellerQuery.getValue();
    }

    ngOnInit(): void {
        this.setInitialDocumentsData();
        this.initFormDocuments();
        this.disableSensibleFormFields();
    }

    ngAfterViewInit(): void {
        this.checkFormChanges();
    }

    setInitialDocumentsData() {
        // tslint:disable-next-line: cyclomatic-complexity
        this.initialDocumentsData = {
            // COMPANY DATA
            avatar_base64: this.documentsData?.organization?.image || this.AVATAR_DEFAULT,
            organization_cnpj: this.documentsData?.organization?.cpfCnpj || '',
            organization_social_reason: this.documentsData?.organization?.razaoSocial || '-',
            organization_fantasy_name: this.documentsData?.organization?.nomeFantasia || '-',
            // OWNER DATA
            responsible_phone: this.documentsData?.responsible?.phone || '',
            organization_phone: this.documentsData?.organization?.phone || '',
            organization_email: this.documentsData?.organization?.email || '',
            // BUSINESS DATA
            organization_name: this.documentsData?.organization?.name || '-',
            organization_mcc_category_id: this.documentsData?.organization?.mcc_category_id || '',
            ecommerce_store_url: this.documentsData?.ecommerce?.storeUrl || '-',
        };
    }

    initFormDocuments() {
        this.formDocuments = this.formBuilder.group(this.initialDocumentsData);

        this.siteAddressFieldResolver();
    }

    checkFormChanges() {
        this.formDocuments.valueChanges.pipe(subscribeUntil(this)).subscribe(value => {
            this.differenceDocumentsData = diffObjects(this.initialDocumentsData, value);
            this.hasChangedDataForm = !isEmptyObject(this.differenceDocumentsData);
        });
    }

    openChangeImageModalAndCallEvent() {
        const changeImageDialog = this.dialog.open(ChangeImageProfileComponent, {
            panelClass: ['no-internal-padding', 'o-modal-reset'],
            width: '542px',
            data: { image: this.formDocuments.get('avatar_base64').value },
        });

        this.eventTrackingClicked('ALTERAR_IMAGEM');

        changeImageDialog
            .afterClosed()
            .pipe(subscribeUntil(this))
            .subscribe(data => {
                if (data?.image) {
                    this.formDocuments.patchValue({ avatar_base64: data.image });
                    this.checkFormChanges();
                }
            });
    }

    eventTrackingClicked(buttonName: string): void {
        this.eventTracking.eventTrackingUserCliked(buttonName, 'configuracoes/meus-dados', window, document);
    }

    onEditDocuments(): void {
        if (!this.formDocuments.valid) {
            return validateAllFormFields(this.formDocuments);
        }

        this.formDocuments.disable();
        if (this.hasChangedDataForm) {
            const payload = separateInChildren(
                ['organization', 'responsible', 'ecommerce'],
                this.differenceDocumentsData,
            );

            if (this.differenceDocumentsData.avatar_base64) {
                payload.avatar_base64 = this.formDocuments.get('avatar_base64').value;
            }

            this.sellerService
                .editDetails(payload)
                .pipe(
                    subscribeUntil(this),
                    finalize(() => {
                        if (this.isChangeAndNavigateToURL) {
                            void this.router.navigateByUrl(this.nextUrlToNavigate || '/');
                        }
                    }),
                )
                .subscribe(
                    () => {
                        this.notifications.openSnackbar(
                            'Sucesso ao editar os dados! Os dados públicos já estão disponíveis.',
                            SnackbarTypes.DONE,
                        );

                        this.formDocuments.enable();
                        this.disableSensibleFormFields();
                        this.sellerService.refreshSellerData();

                        this.hasChangedDataForm = false;

                        this.differenceDocumentsData = {};
                        this.initialDocumentsData = this.formDocuments.value;
                    },
                    () => {
                        this.formDocuments.enable();
                        this.disableSensibleFormFields();
                    },
                );
        }
    }

    onOpenConfirm() {
        return this.dialog.open(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            disableClose: true,
            width: '560px',
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }

    private siteAddressFieldResolver() {
        if (this.documentsData?.organization?.type !== 'ecommerce') {
            this.formDocuments.get('ecommerce_store_url').disable();
        }
    }

    private disableSensibleFormFields() {
        this.formDocuments.get('organization_cnpj').disable();
        this.formDocuments.get('organization_social_reason').disable();
        this.formDocuments.get('organization_fantasy_name').disable();
        this.siteAddressFieldResolver();
    }
}
