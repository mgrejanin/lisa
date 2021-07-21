import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { DashboardsDetailState, DashboardsDetailStore } from './dashboards-detail.store';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';
import { BusinessGlossaryDashboardsDetailLooker } from '../../../models/business-glossary/dashboards-detail/looker.model';

@Injectable({ providedIn: 'root' })
export class DashboardsDetailQuery extends QueryEntity<DashboardsDetailState> {
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
    lookerDashboardsDetail$: Observable<BusinessGlossaryDashboardsDetailLooker[]>;

    constructor(protected store: DashboardsDetailStore) {
        super(store);

        this.isLoadingDisplay$ = this.select('isLoadingDisplay');
        this.titleDashboardsDetail$ = this.select('titleDashboardsDetail');
        this.descriptionDashboardsDetail$ = this.select('descriptionDashboardsDetail');
        this.dateDashboardsDetail$ = this.select('dateDashboardsDetail');
        this.frequencyDashboardsDetail$ = this.select('frequencyDashboardsDetail');
        this.scopeDashboardsDetail$ = this.select('scopeDashboardsDetail');
        this.tagsDashboardsDetail$ = this.select('tagsDashboardsDetail');
        this.originDashboardsDetail$ = this.select('originDashboardsDetail');
        this.stewardDashboardsDetail$ = this.select('stewardDashboardsDetail');
        this.ownerDashboardsDetail$ = this.select('ownerDashboardsDetail');
        this.usersDashboardsDetail$ = this.select('usersDashboardsDetail');
        this.badgeDashboardsDetail$ = this.select('badgeDashboardsDetail');
        this.lookerDashboardsDetail$ = this.select('lookerDashboardsDetail');
    }
}
