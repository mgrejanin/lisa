import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { ModelsDetailStore } from './models-detail.store';

import { BusinessGlossaryModelsDetail } from '../../../models/business-glossary/models-detail/item.model';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

@Injectable({ providedIn: 'root' })
export class ModelsDetailService {
    private readonly apiUrl: string;

    constructor(
        private config: CoreDataAccessService,
        private store: ModelsDetailStore,
        private http: HttpClient,
        private router: Router,
    ) {
        this.apiUrl = this.config.getConfig().apiUrl;
    }

    setTitleModels(titleModelsDetail: string): void {
        this.store.update({
            titleModelsDetail,
        });
    }

    setDescriptionModels(descriptionModelsDetail: string): void {
        this.store.update({
            descriptionModelsDetail,
        });
    }

    setResultModels(resultModelsDetail: string): void {
        this.store.update({
            resultModelsDetail,
        });
    }

    setProjectModels(projectModelsDetail: string): void {
        this.store.update({
            projectModelsDetail,
        });
    }

    setTimesIaModels(timesIaModelsDetail: string): void {
        this.store.update({
            timesIaModelsDetail,
        });
    }

    setTimeImpactedModels(timeImpactedModelsDetail: string): void {
        this.store.update({
            timeImpactedModelsDetail,
        });
    }

    setTagsModels(tagsModelsDetail: BusinessGlossaryDashboardsDetailTags[]): void {
        this.store.update({
            tagsModelsDetail,
        });
    }

    setStewardModels(stewardModelsDetail: BusinessGlossaryDashboardsDetailSteward[]): void {
        this.store.update({
            stewardModelsDetail,
        });
    }

    setOwnerModels(ownerModelsDetail: BusinessGlossaryDashboardsDetailOwner[]): void {
        this.store.update({
            ownerModelsDetail,
        });
    }

    setUsersModels(usersModelsDetail: BusinessGlossaryDashboardsDetailUsers[]): void {
        this.store.update({
            usersModelsDetail,
        });
    }

    setBadgeModels(badgeModelsDetail: string): void {
        this.store.update({
            badgeModelsDetail,
        });
    }

    getModelsDetail(name: string): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryModelsDetail>(`${this.apiUrl}/${name}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe(
                (response: BusinessGlossaryModelsDetail) => {
                    this.setTitleModels(response.name);
                    this.setDescriptionModels(response.description);
                    this.setResultModels(response.result);
                    this.setProjectModels(response.project);
                    this.setTimesIaModels(response.timesIa);
                    this.setTimeImpactedModels(response.timeImpacted);
                    this.setTagsModels(response.tags);
                    this.setStewardModels(response.steward);
                    this.setOwnerModels(response.owner);
                    this.setUsersModels(response.users);
                    this.setBadgeModels(response.badge);
                },
                error => {
                    if (error.status === 404) {
                        this.router.navigateByUrl('/404/not-found');
                    }
                },
            );
    }
}
