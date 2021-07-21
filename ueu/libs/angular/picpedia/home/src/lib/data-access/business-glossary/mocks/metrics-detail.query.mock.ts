import { Observable, of } from 'rxjs';

import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

export class MetricsDetailQueryMock {
    isLoadingDisplay$: Observable<boolean>;
    titleMetricsDetail$: Observable<string>;
    descriptionMetricsDetail$: Observable<string>;
    ruleMetricsDetail$: Observable<string>;
    tagsMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    stewardMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeMetricsDetail$: Observable<string>;

    constructor() {
        this.isLoadingDisplay$ = of(true);
        this.titleMetricsDetail$ = of('mockTitleMetricsDetail');
        this.descriptionMetricsDetail$ = of('mockDescriptionMetricsDetail');
        this.ruleMetricsDetail$ = of('mockRuleMetricsDetail');
        this.tagsMetricsDetail$ = of([{ label: 'mockLabel' }]);
        this.stewardMetricsDetail$ = of([{ name: 'mockName', email: 'mockEmail', figure: 'mockFigure' }]);
        this.ownerMetricsDetail$ = of([{ name: 'mockName', email: 'mockEmail', figure: 'mockFigure' }]);
        this.usersMetricsDetail$ = of([{ figure: 'mockFigure' }]);
        this.badgeMetricsDetail$ = of('mockBadgeMetricsDetail');
    }
}
