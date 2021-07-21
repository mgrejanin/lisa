import { Observable, of, Subject } from 'rxjs';

import { BusinessGlossaryDashboards } from '../../../models/business-glossary/dashboards.model';
import { BusinessGlossaryDashboardsList } from '../../../models/business-glossary/dashboards-list.model';
import { BusinessGlossaryDashboardsFavorite } from '../../../models/business-glossary/dashboards-favorite.model';
import { BusinessGlossaryMetrics } from '../../../models/business-glossary/metrics.model';
import { BusinessGlossaryMetricsList } from '../../../models/business-glossary/metrics-list.model';
import { BusinessGlossaryModels } from '../../../models/business-glossary/models.model';
import { BusinessGlossaryModelsList } from '../../../models/business-glossary/models-list.model';
import { mockBussinessGlossary, mockBussinessGlossaryList } from './business-glossary.mock';

export class BusinessGlossaryServiceMock {
    onDashboardsList: Subject<void> = new Subject();

    setDashboards(dashboards: BusinessGlossaryDashboards[]): void {}

    setDashboardsList(list: BusinessGlossaryDashboardsList[]): void {}

    setTitleDashboardsList(setTitleDashboardsList: string): void {}

    setMetrics(metrics: BusinessGlossaryMetrics[]): void {}

    setMetricsList(list: BusinessGlossaryMetricsList[]): void {}

    setTitleMetricsList(titleMetricsList: string): void {}

    setModels(models: BusinessGlossaryModels[]): void {}

    setModelsList(models: BusinessGlossaryModelsList[]): void {}

    setTitleModelsList(titleModelsList: string): void {}

    getDashboardsCards(): Observable<BusinessGlossaryDashboards[]> {
        return of(mockBussinessGlossary);
    }

    getDashboardsListItem(name: string): Observable<BusinessGlossaryDashboards[]> {
        return of(mockBussinessGlossary);
    }

    getDashboardsList(): Observable<BusinessGlossaryDashboardsList[]> {
        return of(mockBussinessGlossaryList);
    }

    updateDashboardsListFavorite(data: boolean, id: number): Observable<BusinessGlossaryDashboardsFavorite[]> {
        return of([{ idFavorite: 1, favorite: true }]);
    }

    getMetricsCards(): Observable<BusinessGlossaryMetrics[]> {
        return of(mockBussinessGlossary);
    }

    getMetricsListItem(name: string): Observable<BusinessGlossaryMetrics[]> {
        return of(mockBussinessGlossary);
    }

    getMetricsList(): Observable<BusinessGlossaryMetricsList[]> {
        return of(mockBussinessGlossaryList);
    }

    getModelsCards(): Observable<BusinessGlossaryModels[]> {
        return of(mockBussinessGlossary);
    }

    getModelsListItem(name: string): Observable<BusinessGlossaryModels[]> {
        return of(mockBussinessGlossary);
    }

    getModelsList(): Observable<BusinessGlossaryModelsList[]> {
        return of(mockBussinessGlossaryList);
    }
}
