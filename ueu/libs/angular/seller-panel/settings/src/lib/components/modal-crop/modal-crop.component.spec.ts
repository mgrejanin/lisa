import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MockComponent, MockModule } from 'ng-mocks';
import { ImageCropperComponent } from 'ngx-img-cropper';

import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ModalCropComponent } from './modal-crop.component';

describe('ModalCropComponent', () => {
    let component: ModalCropComponent;
    let fixture: ComponentFixture<ModalCropComponent>;
    let matDialogRef: MatDialogRef<ModalCropComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule)],
            declarations: [ModalCropComponent, MockComponent(ImageCropperComponent)],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        file: new File(
                            [new Blob(['a', 'b', '%', 'c', 'd', '@', 'objDate', '(D:20200728120039-03-00)'])],
                            '',
                        ),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalCropComponent);
        component = fixture.componentInstance;

        matDialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have saveImage function', () => {
        const dialogSpy = spyOn(matDialogRef, 'close');

        component.saveImage();

        expect(dialogSpy).toHaveBeenCalledWith({ image: component.imageData.image });
    });
});
