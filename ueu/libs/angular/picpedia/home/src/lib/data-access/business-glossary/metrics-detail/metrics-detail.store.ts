import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

export interface MetricsDetailState {
    isLoadingDisplay: boolean;
    titleMetricsDetail: string;
    descriptionMetricsDetail: string;
    ruleMetricsDetail: string;
    tagsMetricsDetail: BusinessGlossaryDashboardsDetailTags[];
    stewardMetricsDetail: BusinessGlossaryDashboardsDetailSteward[];
    ownerMetricsDetail: BusinessGlossaryDashboardsDetailOwner[];
    usersMetricsDetail: BusinessGlossaryDashboardsDetailUsers[];
    badgeMetricsDetail: string;
}

export function createInitialState(): MetricsDetailState {
    return {
        isLoadingDisplay: false,
        titleMetricsDetail: '',
        descriptionMetricsDetail: '',
        ruleMetricsDetail: '',
        tagsMetricsDetail: [],
        stewardMetricsDetail: [],
        ownerMetricsDetail: [],
        usersMetricsDetail: [],
        badgeMetricsDetail: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'metricsDetail' })
export class MetricsDetailStore extends EntityStore<MetricsDetailState> {
    constructor() {
        super(createInitialState());
    }
}
