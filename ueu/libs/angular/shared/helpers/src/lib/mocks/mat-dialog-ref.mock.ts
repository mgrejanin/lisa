/**
 * @description When the component calls this.dialog.close(...) we'll return the result or empty string
 */
export class MatDialogRefMock {
    close(result?: any) {
        return result || '';
    }
}
