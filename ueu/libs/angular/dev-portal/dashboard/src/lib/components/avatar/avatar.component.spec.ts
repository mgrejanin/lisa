import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { projectMock, UploadAvatarComponent } from '@picpay/dev-portal/shared';
import { of } from 'rxjs';
import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
    let component: AvatarComponent;
    let fixture: ComponentFixture<AvatarComponent>;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AvatarComponent],
            imports: [DesignSystemAngularModule, MatDialogModule],
            providers: [{ provide: MatDialog, useClass: MatDialogMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarComponent);
        component = fixture.componentInstance;
        matDialog = TestBed.inject(MatDialog);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call changing avatar function (open mat dialog and return success)', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () => of((component.image = projectMock.image)),
        });
        const configDialog = {
            maxWidth: '100vw',
            maxHeight: '100vh',
            panelClass: 'modal-control',
            data: { image: component.image },
        };
        component.changeAvatar();
        expect(matDialogSpy).toHaveBeenCalledWith(UploadAvatarComponent, configDialog);
        expect(component.image).toEqual(projectMock.image);
    });
});
