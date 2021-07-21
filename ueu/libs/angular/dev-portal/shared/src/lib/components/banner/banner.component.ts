import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { UiQuery } from '../../data-access/ui/ui.query';
@Component({
    selector: 'dev-portal-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
    @Input() height = '435px';
    @Input() backgroundColor = '#1A1A1A';
    @Input() backgroundImage = '';
    @Input() reverse = false;
    @Input() col_image = 4;
    @Input() col_content = 4;
    @Input() offset = 0;
    @Input() justify_content = 'center';

    readonly isMobile$: Observable<boolean>;

    constructor(private query: UiQuery) {
        this.isMobile$ = this.query.isMobile$;
    }
}
