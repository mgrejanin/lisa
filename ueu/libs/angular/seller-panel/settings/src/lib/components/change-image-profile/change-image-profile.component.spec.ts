import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MatDialogMock, MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ChangeImageProfileComponent } from './change-image-profile.component';

import { MockModule } from 'ng-mocks';
import { of } from 'rxjs/internal/observable/of';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('ChangeImageProfileComponent', () => {
    let component: ChangeImageProfileComponent;
    let fixture: ComponentFixture<ChangeImageProfileComponent>;
    let matDialog: MatDialog;
    let matDialogRef: MatDialogRef<ChangeImageProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatDialogModule), MockModule(MatIconModule)],
            declarations: [ChangeImageProfileComponent],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MatDialog, useClass: MatDialogMock },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        image: 'assets/placeholders/consumer.png',
                    },
                },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeImageProfileComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        matDialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should run setImageProfilePreview in ngOnInit', () => {
        const setImageProfilePreviewFunctionSpy = spyOn(component, 'setImageProfilePreview');

        component.ngOnInit();

        expect(setImageProfilePreviewFunctionSpy).toHaveBeenLastCalledWith(component.data.image);
    });

    it('should setImageProfilePreview function with a custom image', () => {
        const imageMock = '/images/image-mock.jpg';

        component.setImageProfilePreview(imageMock);

        expect(component.avatarUrl).toEqual(imageMock);
    });

    it('should setImageProfilePreview function with a default image', () => {
        const imageMock = null;

        component.setImageProfilePreview(imageMock);

        expect(component.avatarUrl).toEqual(component.DEFAULT_AVATAR);
    });

    it('should onChangeImageProfile function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () => of({ image: 'image/image_mock.jpeg' }),
        });
        const file = new File([new ArrayBuffer(2e5)], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });

        component.onChangeImageProfile([file]);

        expect(matDialogSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onCloseChangeImageModal function', () => {
        const onCloseSpy = spyOn(matDialogRef, 'close');

        component.onCloseChangeImageModal();

        expect(onCloseSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onCloseChangeImageModal function', () => {
        const onCloseSpy = spyOn(matDialogRef, 'close');

        component.onApplyNewImageProfile();

        expect(onCloseSpy).toHaveBeenCalledWith({ image: component.data.image });
    });
});
