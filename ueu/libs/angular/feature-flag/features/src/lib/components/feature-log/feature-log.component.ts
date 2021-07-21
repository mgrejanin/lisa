import { Component, Input } from '@angular/core';

// interfaces
import { FeatureAuditing } from '../../models';

@Component({
    selector: 'feature-flag-features-feature-log',
    templateUrl: './feature-log.component.html',
    styleUrls: ['./feature-log.component.scss'],
})
export class FeatureLogComponent {
    @Input() commits: FeatureAuditing[];
}
