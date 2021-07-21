import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dev-portal-info-steps-mobile',
    templateUrl: './info-steps-mobile.component.html',
    styleUrls: ['./info-steps-mobile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoStepsMobileComponent {
    step$ = new BehaviorSubject<number>(1);

    setStep(step: number): void {
        this.step$.next(step);
    }
}
