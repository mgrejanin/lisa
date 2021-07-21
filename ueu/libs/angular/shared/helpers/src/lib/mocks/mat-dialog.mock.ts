import { of } from 'rxjs';
/**
 * @description - When the component calls this.dialog.open(...) we'll return an object
 * with an afterClosed method that allows to subscribe to the dialog result observable.
 */
export class MatDialogMock {
    open() {
        return {
            afterClosed: () => of({ action: true, confirm: true }),
        };
    }
}
