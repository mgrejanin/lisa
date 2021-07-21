import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';
import { MetricsDetailState, MetricsDetailStore } from './metrics-detail.store';

@Injectable({ providedIn: 'root' })
export class MetricsDetailQuery extends QueryEntity<MetricsDetailState> {
    isLoadingDisplay$: Observable<boolean>;
    titleMetricsDetail$: Observable<string>;
    descriptionMetricsDetail$: Observable<string>;
    ruleMetricsDetail$: Observable<string>;
    tagsMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailTags[]>;
    stewardMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailSteward[]>;
    ownerMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailOwner[]>;
    usersMetricsDetail$: Observable<BusinessGlossaryDashboardsDetailUsers[]>;
    badgeMetricsDetail$: Observable<string>;

    constructor(protected store: MetricsDetailStore) {
        super(store);

        this.isLoadingDisplay$ = this.select('isLoadingDisplay');
        this.titleMetricsDetail$ = this.select('titleMetricsDetail');
        this.descriptionMetricsDetail$ = this.select('descriptionMetricsDetail');
        this.ruleMetricsDetail$ = this.select('ruleMetricsDetail');
        this.tagsMetricsDetail$ = this.select('tagsMetricsDetail');
        this.stewardMetricsDetail$ = this.select('stewardMetricsDetail');
        this.ownerMetricsDetail$ = this.select('ownerMetricsDetail');
        this.usersMetricsDetail$ = this.select('usersMetricsDetail');
        this.badgeMetricsDetail$ = this.select('badgeMetricsDetail');
    }
}
