import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dev-portal-error-container',
    templateUrl: './error-container.component.html',
    styleUrls: ['./error-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorContainerComponent {}
