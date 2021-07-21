import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { MockModule } from 'ng-mocks';

import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ShareLinksComponent } from './share-links.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('ShareLinksComponent', () => {
    let component: ShareLinksComponent;
    let fixture: ComponentFixture<ShareLinksComponent>;
    let matDialogRef: MatDialogRef<ShareLinksComponent>;
    let notificationService: NotificationsService;
    const data = {
        title: 'Compartilhe seu link',
        contentToCopy: 'content-to-copy-test',
        links: [
            {
                label: 'WhatsApp',
                icon: 'whatsapp',
                href: () => '',
            },
            {
                label: 'Facebook',
                icon: 'facebook',
                href: () => '',
            },
            {
                label: 'Twitter',
                icon: 'twitter',
                href: () => '',
            },
        ],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule), MockModule(ClipboardModule)],
            declarations: [ShareLinksComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShareLinksComponent);
        component = fixture.componentInstance;

        notificationService = TestBed.inject(NotificationsService);
        matDialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check title', () => {
        const el = fixture.debugElement.query(By.css('.c-charge-value-links-modal__header--title'));
        expect(el.nativeElement.innerHTML).toBe('Compartilhe seu link');
    });

    it('should have onClose function', () => {
        const dialogRefSpy = spyOn(matDialogRef, 'close');

        component.onClose();

        expect(dialogRefSpy).toHaveBeenCalled();
        expect(dialogRefSpy).toHaveBeenCalledTimes(1);
    });

    it('should check social networks render', () => {
        fixture.detectChanges();

        const socialNetworks = fixture.debugElement.queryAll(By.css('.c-charge-value-links-modal__body--item'));

        expect(socialNetworks.length).toBe(4);
    });

    it('should have onCopyLinkCallback function', () => {
        const notificationSpy = spyOn(notificationService, 'openSnackbar');

        component.onCopyLinkCallback(true);

        expect(notificationSpy).toHaveBeenCalledWith('Link de cobrança copiado com sucesso!', 'done');

        component.onCopyLinkCallback(false);

        expect(notificationSpy).toHaveBeenCalledWith(
            'Ocorreu um erro ao copiar o link de cobrança, tente novamente.',
            'error',
        );
    });
});
