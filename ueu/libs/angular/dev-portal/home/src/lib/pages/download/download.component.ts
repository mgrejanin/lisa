import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dev-portal-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadComponent {}
