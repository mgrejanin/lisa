import { Observable, of } from 'rxjs';

import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';
import { BusinessGlossaryDashboardsDetailLooker } from '../../../models/business-glossary/dashboards-detail/looker.model';

export class DashboardsDetailQueryMock {
    isLoadingDisplay$: Observable<boolean>;

    titleDashboardsDetail$: Observable<string>;
    descriptionDashboardsDetail$: Observable<string>;
    dateDashboardsDetail$: Observable<string>;
    frequencyDashboardsDetail$: Observable<string>;
    scopeDashboardsDetail$: Observable<string>;
    tagsDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    originDashboardsDetail$: Observable<string>;
    stewardDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeDashboardsDetail$: Observable<string>;
    lookerDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailLooker[]>

    constructor() {
        this.isLoadingDisplay$ = of(true);

        this.titleDashboardsDetail$ = of('mockTitleDashboardsDetail');
        this.descriptionDashboardsDetail$ = of('mockDescriptionDashboardsDetail');
        this.dateDashboardsDetail$ = of('mockDateDashboardsDetail');
        this.frequencyDashboardsDetail$ = of('mockFrequencyDashboardsDetail');
        this.scopeDashboardsDetail$ = of('mockScopeDashboardsDetail');
        this.tagsDashboardsDetail$ = of([{ label: 'mockLabel' }]);
        this.originDashboardsDetail$ = of('mockOriginDashboardsDetail');
        this.stewardDashboardsDetail$ = of([{ name: 'mockName', email: 'mockEmail', figure: 'mockFigure' }]);
        this.ownerDashboardsDetail$ = of([{ name: 'mockName', email: 'mockEmail', figure: 'mockFigure' }]);
        this.usersDashboardsDetail$ = of([{ figure: 'mockFigure' }]);
        this.badgeDashboardsDetail$ = of('mockBadgeDashboardsDetail');
        this.lookerDashboardsDetail$ = of([{ dashboard_name: 'mockName', link_url: 'mockUrl', platform: 'mockPlatform' }]);
    }
}
