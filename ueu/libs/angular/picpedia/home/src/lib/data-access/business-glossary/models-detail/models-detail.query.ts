import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';
import { ModelsDetailState, ModelsDetailStore } from './models-detail.store';

@Injectable({ providedIn: 'root' })
export class ModelsDetailQuery extends QueryEntity<ModelsDetailState> {
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

    constructor(protected store: ModelsDetailStore) {
        super(store);

        this.isLoadingDisplay$ = this.select('isLoadingDisplay');
        this.titleModelsDetail$ = this.select('titleModelsDetail');
        this.descriptionModelsDetail$ = this.select('descriptionModelsDetail');
        this.resultModelsDetail$ = this.select('resultModelsDetail');
        this.projectModelsDetail$ = this.select('projectModelsDetail');
        this.timesIaModelsDetail$ = this.select('timesIaModelsDetail');
        this.timeImpactedModelsDetail$ = this.select('timeImpactedModelsDetail');
        this.tagsModelsDetail$ = this.select('tagsModelsDetail');
        this.stewardModelsDetail$ = this.select('stewardModelsDetail');
        this.ownerModelsDetail$ = this.select('ownerModelsDetail');
        this.usersModelsDetail$ = this.select('usersModelsDetail');
        this.badgeModelsDetail$ = this.select('badgeModelsDetail');
    }
}
