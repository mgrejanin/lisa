import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

export interface ModelsDetailState {
    isLoadingDisplay: boolean;
    titleModelsDetail: string;
    descriptionModelsDetail: string;
    resultModelsDetail: string;
    projectModelsDetail: string;
    timesIaModelsDetail: string;
    timeImpactedModelsDetail: string;
    tagsModelsDetail: BusinessGlossaryDashboardsDetailTags[];
    stewardModelsDetail: BusinessGlossaryDashboardsDetailSteward[];
    ownerModelsDetail: BusinessGlossaryDashboardsDetailOwner[];
    usersModelsDetail: BusinessGlossaryDashboardsDetailUsers[];
    badgeModelsDetail: string;
}

export function createInitialState(): ModelsDetailState {
    return {
        isLoadingDisplay: false,
        titleModelsDetail: '',
        descriptionModelsDetail: '',
        resultModelsDetail: '',
        projectModelsDetail: '',
        timesIaModelsDetail: '',
        timeImpactedModelsDetail: '',
        tagsModelsDetail: [],
        stewardModelsDetail: [],
        ownerModelsDetail: [],
        usersModelsDetail: [],
        badgeModelsDetail: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'modelsDetail' })
export class ModelsDetailStore extends EntityStore<ModelsDetailState> {
    constructor() {
        super(createInitialState());
    }
}
