import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { BusinessGlossaryDashboards } from '../../models/business-glossary/dashboards.model';
import { BusinessGlossaryDashboardsList } from '../../models/business-glossary/dashboards-list.model';
import { BusinessGlossaryDashboardsFavorite } from '../../models/business-glossary/dashboards-favorite.model';
import { BusinessGlossaryModels } from '../../models/business-glossary/models.model';
import { BusinessGlossaryModelsList } from '../../models/business-glossary/models-list.model';
import { BusinessGlossaryMetrics } from '../../models/business-glossary/metrics.model';
import { BusinessGlossaryMetricsList } from '../../models/business-glossary/metrics-list.model';

import { BusinessGlossaryStore } from './business-glossary.store';

@Injectable({ providedIn: 'root' })
export class BusinessGlossaryService {
    private readonly apiUrl: string;
    onDashboardsList: Subject<void> = new Subject();

    constructor(private config: CoreDataAccessService, private store: BusinessGlossaryStore, private http: HttpClient) {
        this.apiUrl = `${this.config.getConfig().apiUrl}/dashboards`;
    }

    setDashboards(dashboards: BusinessGlossaryDashboards[]): void {
        this.store.update({
            dashboards: dashboards,
        });
    }

    setDashboardsList(list: BusinessGlossaryDashboardsList[]): void {
        this.store.update({
            dashboardsList: list,
        });
    }

    setTitleDashboardsList(titleDashboardsList: string): void {
        this.store.update({
            titleDashboardsList,
        });
    }

    setMetrics(metrics: BusinessGlossaryMetrics[]): void {
        this.store.update({
            metrics: metrics,
        });
    }

    setMetricsList(list: BusinessGlossaryMetricsList[]): void {
        this.store.update({
            metricsList: list,
        });
    }

    setTitleMetricsList(titleMetricsList: string): void {
        this.store.update({
            titleMetricsList,
        });
    }

    setModels(models: BusinessGlossaryModels[]): void {
        this.store.update({
            models: models,
        });
    }

    setModelsList(list: BusinessGlossaryModelsList[]): void {
        this.store.update({
            modelsList: list,
        });
    }

    setTitleModelsList(titleModelsList: string): void {
        this.store.update({
            titleModelsList,
        });
    }

    getDashboardsCards(): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryDashboards[]>(`${this.apiUrl}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((dashboards: BusinessGlossaryDashboards[]) => this.setDashboards(dashboards));
    }

    getDashboardsListItem(name: string): void {
        this.http
            .get<BusinessGlossaryDashboards>(`${this.apiUrl}/${name}`)
            .pipe(subscribeUntil(this))
            .subscribe((response: BusinessGlossaryDashboards) => {
                this.setTitleDashboardsList(response.data_domain);
            });
    }

    getDashboardsList(): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryDashboardsList[]>(`${this.apiUrl}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((list: BusinessGlossaryDashboardsList[]) => this.setDashboardsList(list));
    }

    updateDashboardsListFavorite(data: boolean, id: number): void {
        this.http
            .put<BusinessGlossaryDashboardsFavorite>(`${this.apiUrl}/${id}`, data, {})
            .pipe(
                subscribeUntil(this),
                finalize(() => this.onDashboardsList.next()),
            )
            .subscribe();
    }

    getMetricsCards(): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryMetrics[]>(`${this.apiUrl}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((metrics: BusinessGlossaryMetrics[]) => this.setMetrics(metrics));
    }

    getMetricsListItem(name: string): void {
        this.http
            .get<BusinessGlossaryMetrics>(`${this.apiUrl}/${name}`)
            .pipe(subscribeUntil(this))
            .subscribe((response: BusinessGlossaryMetrics) => {
                this.setTitleMetricsList(response.data_domain);
            });
    }

    getMetricsList(): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryMetricsList[]>(`${this.apiUrl}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((list: BusinessGlossaryMetricsList[]) => this.setMetricsList(list));
    }

    getModelsCards(): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryModels[]>(`${this.apiUrl}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((models: BusinessGlossaryModels[]) => this.setModels(models));
    }

    getModelsListItem(name: string): void {
        this.http
            .get<BusinessGlossaryModels>(`${this.apiUrl}/${name}`)
            .pipe(subscribeUntil(this))
            .subscribe((response: BusinessGlossaryModels) => {
                this.setTitleModelsList(response.data_domain);
            });
    }

    getModelsList(): void {
        this.store.update({ isLoadingDisplay: true });
        this.http
            .get<BusinessGlossaryModelsList[]>(`${this.apiUrl}`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.store.update({ isLoadingDisplay: false })),
            )
            .subscribe((list: BusinessGlossaryModelsList[]) => this.setModelsList(list));
    }
}
