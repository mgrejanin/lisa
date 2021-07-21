import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';
import { BusinessGlossaryDashboardsDetailLooker } from '../../../models/business-glossary/dashboards-detail/looker.model';

export interface DashboardsDetailState {
    isLoadingDisplay: boolean;
    titleDashboardsDetail: string;
    descriptionDashboardsDetail: string;
    dateDashboardsDetail: string;
    frequencyDashboardsDetail: string;
    scopeDashboardsDetail: string;
    tagsDashboardsDetail: BusinessGlossaryDashboardsDetailTags[];
    originDashboardsDetail: string;
    stewardDashboardsDetail: BusinessGlossaryDashboardsDetailSteward[];
    ownerDashboardsDetail: BusinessGlossaryDashboardsDetailOwner[];
    usersDashboardsDetail: BusinessGlossaryDashboardsDetailUsers[];
    badgeDashboardsDetail: string;
    lookerDashboardsDetail: BusinessGlossaryDashboardsDetailLooker[];
}

export function createInitialState(): DashboardsDetailState {
    return {
        isLoadingDisplay: false,
        titleDashboardsDetail: '',
        descriptionDashboardsDetail: '',
        dateDashboardsDetail: '',
        frequencyDashboardsDetail: '',
        scopeDashboardsDetail: '',
        tagsDashboardsDetail: [],
        originDashboardsDetail: '',
        stewardDashboardsDetail: [],
        ownerDashboardsDetail: [],
        usersDashboardsDetail: [],
        badgeDashboardsDetail: '',
        lookerDashboardsDetail: [],
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dashboardsDetail' })
export class DashboardsDetailStore extends EntityStore<DashboardsDetailState> {
    constructor() {
        super(createInitialState());
    }
}
