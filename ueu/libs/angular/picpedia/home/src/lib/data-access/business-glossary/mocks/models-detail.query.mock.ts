import { Observable, of } from 'rxjs';

import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

export class ModelsDetailQueryMock {
    isLoadingDisplay$: Observable<boolean>;
    titleModelsDetail$: Observable<string>;
    descriptionModelsDetail$: Observable<string>;
    resultModelsDetail$: Observable<string>;
    projectModelsDetail$: Observable<string>;
    timesIaModelsDetail$: Observable<string>;
    timeImpactedModelsDetail$: Observable<string>;
    tagsModelsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    stewardModelsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerModelsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersModelsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeModelsDetail$: Observable<string>;

    constructor() {
        this.isLoadingDisplay$ = of(true);
        this.titleModelsDetail$ = of('mockTitleModelsDetail');
        this.descriptionModelsDetail$ = of('mockDescriptionModelsDetail');
        this.resultModelsDetail$ = of('mockResultModelsDetail');
        this.projectModelsDetail$ = of('mockProjectModelsDetail');
        this.timesIaModelsDetail$ = of('mockTimesIaModelsDetail');
        this.tagsModelsDetail$ = of([{ label: 'mockLabel' }]);
        this.stewardModelsDetail$ = of([{ name: 'mockName', email: 'mockEmail', figure: 'mockFigure' }]);
        this.ownerModelsDetail$ = of([{ name: 'mockName', email: 'mockEmail', figure: 'mockFigure' }]);
        this.usersModelsDetail$ = of([{ figure: 'mockFigure' }]);
        this.badgeModelsDetail$ = of('mockBadgeModelsDetail');
    }
}
