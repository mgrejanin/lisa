import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { NotificationsService } from './notifications.service';

// ng-mocks
import { MockComponent } from 'ng-mocks';

// components
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { ConfirmationModalComponent } from '../../components/confirmation-modal/confirmation-modal.component';

// modules
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// rxjs
import { of } from 'rxjs';
import { SnackbarTypes } from '../../models';

describe('NotificationsService', () => {
    let service: NotificationsService;

    beforeEach(() => {
        /**
         *  Couldn't figure a way to mock
         *  the Apollo Snackbar because for him to be on
         *  entryComponents I needed the module which he was
         *  part of.
         *  Trying to mock any of them, or both, would
         *  result in error when the service tried to
         *  create the component.
         *
         * TODO: Try to use mocks here.
         */
        TestBed.configureTestingModule({
            declarations: [MockComponent(ConfirmationModalComponent)],
            imports: [DesignSystemAngularModule],
            providers: [
                NotificationsService,
                {
                    provide: MatDialog,
                    useValue: {
                        open: (component, config) => {
                            component;
                            config;
                        },
                    },
                },
            ],
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [ApolloSnackbar],
            },
        });

        service = TestBed.inject(NotificationsService);
    });

    afterEach(() => {
        /**
         *  Calling ngOnDestroy manually to
         *  avoid apending one new element
         *  per test.
         */
        service.ngOnDestroy();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create and add an snackbar to document.body', () => {
        expect(document.querySelectorAll('#pp-root-notifications').length).toBe(1);
    });

    it('should have openConfirmationModal function', () => {
        const dialogService = TestBed.inject(MatDialog);

        const mockConfig: MatDialogConfig = {
            panelClass: 'o-modal',
            data: {
                title: 'mockTitle',
                message: 'mockMessage',
            },
        };

        const mockRef = { afterClosed: () => of(null) };

        const openDialogSpy = spyOn(dialogService, 'open').and.returnValue(mockRef);

        const ref = service.openConfirmationModal('mockTitle', 'mockMessage');

        expect(openDialogSpy).toHaveBeenCalledWith(ConfirmationModalComponent, mockConfig);
        expect(ref).toBe(mockRef);
    });

    it('should have openSnackbar function (default values)', () => {
        const snackbar = service.snackbar.instance;
        const setSnackbarLabelSpy = spyOn(snackbar, 'setLabel');
        const openSnackbarSpy = spyOn(snackbar, 'open');

        const message = 'mockMessage';
        const expectedType = SnackbarTypes.DONE;
        const expectedShowDismissButton = false;
        const expectedEmphasis = false;

        service.openSnackbar(message);

        expect(snackbar.emphasis).toBe(expectedEmphasis);
        expect(snackbar.showDismissButton).toBe(expectedShowDismissButton);
        expect(snackbar.type).toBe(expectedType);
        expect(setSnackbarLabelSpy).toHaveBeenCalledWith(message);
        expect(openSnackbarSpy).toHaveBeenCalled();
    });

    it('should have openSnackbar function', () => {
        const snackbar = service.snackbar.instance;
        const setSnackbarLabelSpy = spyOn(snackbar, 'setLabel');
        const openSnackbarSpy = spyOn(snackbar, 'open');

        const message = 'mockMessage';
        const type = SnackbarTypes.ERROR;
        const showDismissButton = true;
        const emphasis = true;
        service.openSnackbar(message, type, showDismissButton, emphasis);

        expect(snackbar.emphasis).toBe(emphasis);
        expect(snackbar.showDismissButton).toBe(showDismissButton);
        expect(snackbar.type).toBe(type);
        expect(setSnackbarLabelSpy).toHaveBeenCalledWith(message);
        expect(openSnackbarSpy).toHaveBeenCalled();
    });
});
