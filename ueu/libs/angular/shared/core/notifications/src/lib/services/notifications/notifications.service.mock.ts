import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SnackbarTypes } from '../../models';

export class MockNotificationsService {
    constructor(public afterClosedValue: any) {}

    openConfirmationModal(title: string, message: string): any {
        return {
            afterClosed: () => of(this.afterClosedValue),
        };
    }

    openSnackbar(
        message: string,
        type: SnackbarTypes = SnackbarTypes.DONE,
        showDismissButton: boolean = false,
        emphasis: boolean = false,
    ): void {}
}
