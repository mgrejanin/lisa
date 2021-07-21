import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { DashboardsDetailStore } from './dashboards-detail.store';

import { BusinessGlossaryDashboardsDetail } from '../../../models/business-glossary/dashboards-detail/item.model';
import { BusinessGlossaryDashboardsDetailTags } from '../../../models/business-glossary/dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../../../models/business-glossary/dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../../../models/business-glossary/dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../../../models/business-glossary/dashboards-detail/users.model';
import { BusinessGlossaryDashboardsDetailLooker } from '../../../models/business-glossary/dashboards-detail/looker.model';

@Injectable({ providedIn: 'root' })
export class DashboardsDetailService {
    private readonly apiUrl: string;

    constructor(
        private config: CoreDataAccessService,
        private store: DashboardsDetailStore,
        private http: HttpClient,
    ) {
        this.apiUrl = `${this.config.getConfig().apiUrl}/dashboards`;
    }

    setTitleDashboards(titleDashboardsDetail: string): void {
        this.store.update({
            titleDashboardsDetail,
        });
    }

    setDescriptionDashboards(descriptionDashboardsDetail: string): void {
        this.store.update({
            descriptionDashboardsDetail,
        });
    }

    setDateDashboards(dateDashboardsDetail: string): void {
        this.store.update({
            dateDashboardsDetail,
        });
    }

    setFrequencyDashboards(frequencyDashboardsDetail: string): void {
        this.store.update({
            frequencyDashboardsDetail,
        });
    }

    setScopeDashboards(scopeDashboardsDetail: string): void {
        this.store.update({
            scopeDashboardsDetail,
        });
    }

    setTagsDashboards(tagsDashboardsDetail: BusinessGlossaryDashboardsDetailTags[]): void {
        this.store.update({
            tagsDashboardsDetail,
        });
    }

    setOriginDashboards(originDashboardsDetail: string): void {
        this.store.update({
            originDashboardsDetail,
        });
    }

    setStewardDashboards(stewardDashboardsDetail: BusinessGlossaryDashboardsDetailSteward[]): void {
        this.store.update({
            stewardDashboardsDetail,
        });
    }

    setOwnerDashboards(ownerDashboardsDetail: BusinessGlossaryDashboardsDetailOwner[]): void {
        this.store.update({
            ownerDashboardsDetail,
        });
    }

    setUsersDashboards(usersDashboardsDetail: BusinessGlossaryDashboardsDetailUsers[]): void {
        this.store.update({
            usersDashboardsDetail,
        });
    }

    setBadgeDashboards(badgeDashboardsDetail: string): void {
        this.store.update({
            badgeDashboardsDetail,
        });
    }

    setLookerDashboards(lookerDashboardsDetail: BusinessGlossaryDashboardsDetailLooker[]): void {
        this.store.update({
            lookerDashboardsDetail,
        });
    }

    getDashboardsDetail(name: string): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryDashboardsDetail>(`${this.apiUrl}/${name}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((response: BusinessGlossaryDashboardsDetail) => {
                this.setTitleDashboards(response.name);
                this.setDescriptionDashboards(response.description);
                this.setDateDashboards(response.date);
                this.setFrequencyDashboards(response.frequency);
                this.setScopeDashboards(response.scope);
                this.setTagsDashboards(response.tags);
                this.setOriginDashboards(response.origin);
                this.setStewardDashboards(response.steward);
                this.setOwnerDashboards(response.owner);
                this.setUsersDashboards(response.users);
                this.setBadgeDashboards(response.badge);
                this.setLookerDashboards(response.dashboards);
            });
    }
}
