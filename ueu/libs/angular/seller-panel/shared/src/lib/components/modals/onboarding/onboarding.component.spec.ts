import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { MockModule } from 'ng-mocks';

import { SellerQuery, SellerQueryMock } from '@picpay/seller-panel/services';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { OnboardingComponent } from './onboarding.component';

describe('OnboardingComponent', () => {
    let component: OnboardingComponent;
    let fixture: ComponentFixture<OnboardingComponent>;
    let dialogRef: MatDialogRef<OnboardingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule)],
            declarations: [OnboardingComponent],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: SellerQuery, useClass: SellerQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardingComponent);
        component = fixture.componentInstance;

        dialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClose function', () => {
        const dialogRefSpy = spyOn(dialogRef, 'close');

        component.onClose();

        expect(dialogRefSpy).toHaveBeenCalled();
    });
});
