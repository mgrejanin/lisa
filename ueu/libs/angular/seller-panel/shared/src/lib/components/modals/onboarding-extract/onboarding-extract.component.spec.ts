import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { OnboardingExtractComponent } from './onboarding-extract.component';

describe('OnboardingExtractComponent', () => {
    let component: OnboardingExtractComponent;
    let fixture: ComponentFixture<OnboardingExtractComponent>;
    let dialogRef: MatDialogRef<OnboardingExtractComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule), MockModule(MatDialogModule), MockModule(DesignSystemAngularModule)],
            declarations: [OnboardingExtractComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useClass: MatDialogRefMock,
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {},
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardingExtractComponent);
        component = fixture.componentInstance;

        dialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClose function', () => {
        const closeSpy = spyOn(dialogRef, 'close');

        component.onClose();

        expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onBack function', () => {
        component.onBack();

        expect(component.direction).toBe(false);
        expect(component.currentStepper).toBe(0);
    });

    it('should have onBack function', () => {
        component.onNext();

        expect(component.direction).toBe(true);
        expect(component.currentStepper).toBe(2);
    });

    it('should have onStepper function', () => {
        component.onStepper();

        expect(component.currentStepper).toBe(1);
    });

    it('should have onCompleteOnboarding function', () => {
        const closeSpy = spyOn(dialogRef, 'close');

        component.onCompleteOnboarding();

        expect(closeSpy).toHaveBeenCalledTimes(1);
    });
});
