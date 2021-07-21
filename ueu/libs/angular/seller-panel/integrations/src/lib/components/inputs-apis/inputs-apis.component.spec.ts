import { ClipboardModule } from '@angular/cdk/clipboard';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
    MockNotificationsService,
    NotificationsService,
    SnackbarTypes,
} from '@picpay/angular/shared/core/notifications';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { MockModule } from 'ng-mocks';

import { InputsApisComponent } from './inputs-apis.component';

describe('InputsApisComponent', () => {
    let component: InputsApisComponent;
    let fixture: ComponentFixture<InputsApisComponent>;
    let notificationsService: NotificationsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NoopAnimationsModule,
                MockModule(ClipboardModule),
                MockModule(MatIconModule),
                MockModule(DesignSystemAngularModule),
            ],
            declarations: [InputsApisComponent],
            providers: [
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputsApisComponent);
        component = fixture.componentInstance;

        notificationsService = TestBed.inject(NotificationsService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onCopyInputTokenCallback function (Case true)', () => {
        const notificationsServiceSpy = spyOn(notificationsService, 'openSnackbar');

        component.onCopyInputTokenCallback(true, 'TokenTypeTest');

        expect(notificationsServiceSpy).toHaveBeenCalledWith(
            'Token TokenTypeTest copiado com sucesso!',
            SnackbarTypes.DONE,
        );
    });

    it('should have onCopyInputTokenCallback function (Case false)', () => {
        const notificationsServiceSpy = spyOn(notificationsService, 'openSnackbar');

        component.onCopyInputTokenCallback(false, 'TokenTypeTest');

        expect(notificationsServiceSpy).toHaveBeenCalledWith(
            'Não foi possível copiar o token TokenTypeTest!',
            SnackbarTypes.DONE,
        );
    });
});
