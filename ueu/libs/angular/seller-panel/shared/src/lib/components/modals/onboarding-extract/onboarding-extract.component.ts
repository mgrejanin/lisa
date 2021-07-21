import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'seller-panel-onboarding-extract',
    templateUrl: './onboarding-extract.component.html',
    styleUrls: ['./onboarding-extract.component.scss'],
})
export class OnboardingExtractComponent {
    currentStepper = 1;
    direction = true;

    constructor(private dialogRef: MatDialogRef<OnboardingExtractComponent>) {}

    onClose(): void {
        this.dialogRef.close();
    }

    onBack(): void {
        this.direction = false;
        this.currentStepper >= 1 ? this.currentStepper-- : false;
    }

    onNext(): void {
        this.direction = true;
        this.currentStepper <= 2 ? this.currentStepper++ : false;
    }

    onStepper(): number {
        return this.currentStepper;
    }

    onCompleteOnboarding(): void {
        this.dialogRef.close();
    }
}
