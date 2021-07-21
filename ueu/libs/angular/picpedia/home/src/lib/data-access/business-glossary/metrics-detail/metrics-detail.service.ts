import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { MetricsDetailStore } from './metrics-detail.store';

import { BusinessGlossaryMetricsDetail } from '../../../models/business-glossary/metrics-detail/item.model';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';

@Injectable({ providedIn: 'root' })
export class MetricsDetailService {
    private readonly apiUrl: string;

    constructor(
        private config: CoreDataAccessService,
        private store: MetricsDetailStore,
        private http: HttpClient,
        private router: Router,
    ) {
        this.apiUrl = this.config.getConfig().apiUrl;
    }

    setTitleMetrics(titleMetricsDetail: string): void {
        this.store.update({
            titleMetricsDetail,
        });
    }

    setDescriptionMetrics(descriptionMetricsDetail: string): void {
        this.store.update({
            descriptionMetricsDetail,
        });
    }

    setRuleMetrics(ruleMetricsDetail: string): void {
        this.store.update({
            ruleMetricsDetail,
        });
    }

    setTagsMetrics(tagsMetricsDetail: BusinessGlossaryDashboardsDetailTags[]): void {
        this.store.update({
            tagsMetricsDetail,
        });
    }

    setStewardMetrics(stewardMetricsDetail: BusinessGlossaryDashboardsDetailSteward[]): void {
        this.store.update({
            stewardMetricsDetail,
        });
    }

    setOwnerMetrics(ownerMetricsDetail: BusinessGlossaryDashboardsDetailOwner[]): void {
        this.store.update({
            ownerMetricsDetail,
        });
    }

    setUsersMetrics(usersMetricsDetail: BusinessGlossaryDashboardsDetailUsers[]): void {
        this.store.update({
            usersMetricsDetail,
        });
    }

    setBadgeMetrics(badgeMetricsDetail: string): void {
        this.store.update({
            badgeMetricsDetail,
        });
    }

    getMetricsDetail(name: number): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryMetricsDetail>(`${this.apiUrl}/${name}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe(
                (response: BusinessGlossaryMetricsDetail) => {
                    this.setTitleMetrics(response.name);
                    this.setDescriptionMetrics(response.description);
                    this.setRuleMetrics(response.rule);
                    this.setTagsMetrics(response.tags);
                    this.setStewardMetrics(response.steward);
                    this.setOwnerMetrics(response.owner);
                    this.setUsersMetrics(response.users);
                    this.setBadgeMetrics(response.badge);
                },
                error => {
                    if (error.status === 404) {
                        this.router.navigateByUrl('/404/not-found');
                    }
                },
            );
    }
}
