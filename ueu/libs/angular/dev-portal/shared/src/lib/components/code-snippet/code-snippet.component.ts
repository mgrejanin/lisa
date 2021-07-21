import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, ViewChild } from '@angular/core';
import { CodeSnippet } from './code-snippet.model';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
@Component({
    selector: 'dev-portal-code-snippet',
    templateUrl: './code-snippet.component.html',
    styleUrls: ['./code-snippet.component.scss'],
})
export class CodeSnippetComponent {
    @Input() infoCodes: CodeSnippet[] = [
        {
            active: true,
            language: '',
            type: '',
            code: '',
            platform: '',
        },
    ];
    @ViewChild('snackbarSuccessClipboard') snackBarSucessClipboard: ApolloSnackbar;

    constructor(private clipboard: Clipboard) {}

    selectTab(index: number) {
        this.infoCodes = this.infoCodes.map((tab, i) =>
            i === index ? { ...tab, active: true } : { ...tab, active: false },
        );
    }

    async copyToClipboard(item: CodeSnippet) {
        if (item.active) {
            this.clipboard.copy(item.code);
            await this.snackBarSucessClipboard.open();
        }
    }
}
