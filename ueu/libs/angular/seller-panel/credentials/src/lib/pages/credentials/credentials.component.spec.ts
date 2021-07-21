import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { MockComponents, MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { HeaderComponent } from '@picpay/seller-panel/shared';
import {
    credentialsMock,
    CredentialsService,
    CredentialsServiceEmptyMock,
    CredentialsServiceFailedMock,
    CredentialsServiceMock,
    secretMock,
} from '@picpay/seller-panel/services';

import { CredentialsComponent } from './credentials.component';
import { GenerateCredentialsComponent } from '../../components/generate-credentials/generate-credentials.component';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';

describe('CredentialsComponent', () => {
    let component: CredentialsComponent;
    let fixture: ComponentFixture<CredentialsComponent>;
    let notificationService: NotificationsService;
    let authService: SellerPanelAuthService;
    let clipboard: Clipboard;

    const mockClientID = '30168b8f-8db0-41a2-b29d-da8a0776054a';

    const mockClientSecret = '30168b8f-8db0-41a2-b29d-da8a0776054a';

    const testSetup = {
        imports: [MockModule(DesignSystemAngularModule), MockModule(ClipboardModule), RouterTestingModule],
        declarations: [CredentialsComponent, MockComponents(GenerateCredentialsComponent, HeaderComponent)],
        providers: [
            { provide: CredentialsService, useClass: CredentialsServiceMock },
            { provide: CredentialsServiceEmptyMock },
            { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
            {
                provide: NotificationsService,
                useValue: new MockNotificationsService({ showDismissButton: false }),
            },
            {
                provide: CoreDataAccessService,
                useValue: {
                    getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                },
            },
        ],
    };

    const testSetupEmpty = {
        ...testSetup,
        providers: [...testSetup.providers, { provide: CredentialsService, useClass: CredentialsServiceEmptyMock }],
    };

    const testSetupFailed = {
        ...testSetup,
        providers: [...testSetup.providers, { provide: CredentialsService, useClass: CredentialsServiceFailedMock }],
    };

    describe('Fail scenarios', () => {
        beforeEach(() => {
            TestBed.configureTestingModule(testSetupFailed).compileComponents();
            fixture = TestBed.createComponent(CredentialsComponent);
            authService = TestBed.inject(SellerPanelAuthService);
            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        it('should display error page when failed to retrieve credentials', () => {
            component.getCredentials();
            fixture.detectChanges();

            const errorMsg = fixture.debugElement.query(By.css('apollo-feedback-page'));

            expect(errorMsg.nativeElement.textContent.trim()).toBe('Voltar para inicial');
        });

        it('should have display message when enableCredential function fails', () => {
            notificationService = TestBed.inject(NotificationsService);
            const spyEnableCredential = spyOn(component, 'enableCredential').and.callThrough();
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

            component.enableCredential();

            expect(spyEnableCredential).toHaveBeenCalled();
            expect(notificationServiceSpy).toHaveBeenCalledWith(
                'Não foi possível reativar a credencial. Tente novamente dentro de alguns minutos.',
                'error',
            );
        });

        it('should have display message when onDisableSubmit function fails', () => {
            notificationService = TestBed.inject(NotificationsService);
            const spyDisableSubmit = spyOn(component, 'onDisableSubmit').and.callThrough();
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

            component.onDisableSubmit();

            expect(spyDisableSubmit).toHaveBeenCalled();
            expect(notificationServiceSpy).toHaveBeenCalledWith(
                'Não foi possível desativar a credencial. Tente novamente dentro de alguns minutos.',
                'error',
            );
        });

        it('should have display message when onUpdateSubmit function fails', () => {
            notificationService = TestBed.inject(NotificationsService);
            const spyUpdateSubmit = spyOn(component, 'onUpdateSubmit').and.callThrough();
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

            component.onUpdateSubmit();

            expect(spyUpdateSubmit).toHaveBeenCalled();
            expect(notificationServiceSpy).toHaveBeenCalledWith(
                'Não foi possível alterar o Client_Secret. Tente novamente dentro de alguns minutos.',
                'error',
            );
        });
    });

    describe("Don't have credentials", () => {
        beforeEach(() => {
            TestBed.configureTestingModule(testSetupEmpty).compileComponents();
            fixture = TestBed.createComponent(CredentialsComponent);
            authService = TestBed.inject(SellerPanelAuthService);

            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should call the getCredentials function with undefined clientId', () => {
            const onGetCredentialsSpy = spyOn(component, 'getCredentials').and.callThrough();

            component.getCredentials();

            expect(component.isLoading).toBeFalsy();
            expect(component.projectName).toBeUndefined();
            expect(component.haveCredential).toBe('initial');
            expect(onGetCredentialsSpy).toHaveBeenCalledTimes(1);
        });

        it('should display initial page', () => {
            component.isLoading = false;
            component.haveCredential = 'initial';

            fixture.detectChanges();

            const projectName = fixture.debugElement.query(By.css('.c-new-credential-page__content--title'));

            expect(projectName.nativeElement.textContent.trim()).toBe('Crie sua credencial para integrar a API');
        });
    });

    describe('Have credentials', () => {
        beforeEach(() => {
            TestBed.configureTestingModule(testSetup).compileComponents();
            fixture = TestBed.createComponent(CredentialsComponent);
            authService = TestBed.inject(SellerPanelAuthService);
            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should initialize with getCredentials', () => {
            const onGetCredentialsSpy = spyOn(component, 'getCredentials').and.callThrough();

            component.ngOnInit();

            expect(component.isLoading).toBeFalsy();
            expect(onGetCredentialsSpy).toHaveBeenCalledTimes(1);
        });

        it('should call the getCredentials function', () => {
            const credentials = credentialsMock;
            const onGetCredentialsSpy = spyOn(component, 'getCredentials').and.callThrough();

            component.getCredentials();

            expect(component.isLoading).toBeFalsy();
            expect(component.clientId).toBe(credentials.client_id);
            expect(component.projectName).toBe(credentials.name);
            expect(component.haveCredential).toBe('config');
            expect(onGetCredentialsSpy).toHaveBeenCalledTimes(1);
        });

        it('should call the getClientSecret function', () => {
            const credentials = credentialsMock;
            const onGetCredentialsSpy = spyOn(component, 'getClientSecret').and.callThrough();

            component.getClientSecret(credentials).subscribe(() => {
                expect(component.clientSecret).toBe(secretMock.client_secret);
            });

            expect(component.isLoading).toBeFalsy();
            expect(onGetCredentialsSpy).toHaveBeenCalledTimes(1);
        });

        it('should have call enableCredential function', () => {
            notificationService = TestBed.inject(NotificationsService);
            const spyEnableCredential = spyOn(component, 'enableCredential').and.callThrough();
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

            component.enableCredential();

            expect(spyEnableCredential).toHaveBeenCalled();
            expect(notificationServiceSpy).toHaveBeenCalledWith('Credencial ativada com sucesso', 'done');
        });

        it('should have call onCancel function', () => {
            const spyCancel = spyOn(component, 'onCancel').and.callThrough();

            component.onCancel();

            expect(spyCancel).toHaveBeenCalled();
        });

        it('should have call onDisableSubmit function', () => {
            notificationService = TestBed.inject(NotificationsService);
            const spyonDisableSubmit = spyOn(component, 'onDisableSubmit').and.callThrough();
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

            component.onDisableSubmit();

            expect(spyonDisableSubmit).toHaveBeenCalled();
            expect(notificationServiceSpy).toHaveBeenCalledWith('Credencial desativada com sucesso', 'done');
        });

        it('should have call onUpdateSubmit function', () => {
            notificationService = TestBed.inject(NotificationsService);
            const spyUpdateSubmit = spyOn(component, 'onUpdateSubmit').and.callThrough();
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

            component.onUpdateSubmit();

            expect(spyUpdateSubmit).toHaveBeenCalled();
            expect(notificationServiceSpy).toHaveBeenCalledWith('Client_Secret alterado', 'done');
        });

        it('should have open openDisableCredential dialog', () => {
            const { debugElement } = fixture;

            component.openDisableCredential();
            fixture.detectChanges();

            const dialog = debugElement.queryAll(By.css('apollo-dialog'))[0];

            expect(dialog).toBeTruthy();
            expect(dialog.nativeElement.textContent.trim()).toBe(
                'Antes de desativar a credencial, certifique-se que ela não está sendo utilizado em nenhuma campanha ativa. Se quiser, você pode reativar a credencial.',
            );
        });

        it('should have open openUpdateSecret dialog', () => {
            const { debugElement } = fixture;

            component.openUpdateSecret();
            fixture.detectChanges();

            const dialog = debugElement.queryAll(By.css('apollo-dialog'))[1];

            expect(dialog).toBeTruthy();
            expect(dialog.nativeElement.textContent.trim()).toBe(
                'Ao gerar uma nova senha, você suspenderá todos os pagamentos ativos e vai precisar realizar novamente a integração para que ela volte a funcionar.',
            );
        });

        it('should call function copyToClipboard', () => {
            component.clientSecret = mockClientSecret;
            const clipboardSpy = spyOn(component, 'copyToClipboard');

            component.copyToClipboard(mockClientSecret);

            expect(clipboardSpy).toHaveBeenCalledWith(mockClientSecret);
        });

        it('should copy clientId', () => {
            notificationService = TestBed.inject(NotificationsService);
            clipboard = TestBed.inject(Clipboard);

            component.clientId = mockClientID;
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
            const clipboardSpy = spyOn(clipboard, 'copy');

            component.copyToClipboard(mockClientID);

            expect(clipboardSpy).toHaveBeenCalledWith(`O Client_ID é: ${mockClientID}`);
            expect(notificationServiceSpy).toHaveBeenCalledWith('Copiado com sucesso!', 'done');
        });

        it('should copy clientSecret', () => {
            notificationService = TestBed.inject(NotificationsService);
            clipboard = TestBed.inject(Clipboard);

            component.clientSecret = mockClientSecret;
            const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
            const clipboardSpy = spyOn(clipboard, 'copy');

            component.copyToClipboard(mockClientSecret);

            expect(clipboardSpy).toHaveBeenCalledWith(`O Client_Secret é: ${mockClientSecret}`);
            expect(notificationServiceSpy).toHaveBeenCalledWith('Copiado com sucesso!', 'done');
        });

        it('should hide credential text when loading', () => {
            component.isLoading = false;

            fixture.detectChanges();

            const projectName = fixture.debugElement.query(By.css('.c-credential-page__header--title'));

            expect(projectName.nativeElement.textContent.trim()).toBe('Configurar integrações (token de acesso)');
        });

        it('should display config page', () => {
            component.isLoading = false;
            component.haveCredential = 'config';

            fixture.detectChanges();

            const projectName = fixture.debugElement.query(By.css('.c-config-credential-page__content--header-title'));

            expect(projectName.nativeElement.textContent.trim()).toBe('Suas credenciais da API:');
        });

        it('should display project name on config page', () => {
            component.isLoading = false;
            component.haveCredential = 'config';
            component.projectName = 'LeProjeto';

            fixture.detectChanges();

            const projectName = fixture.debugElement.query(By.css('.c-config-credential-page__content--apis-title'));

            expect(projectName.nativeElement.textContent.trim()).toBe('LeProjeto');
        });
    });

    describe('Logout', () => {
        it('should have onLogout function', () => {
            const logoutSpy = spyOn(authService, 'logout');

            component.onLogout();

            expect(logoutSpy).toHaveBeenCalled();
        });
    });
});
