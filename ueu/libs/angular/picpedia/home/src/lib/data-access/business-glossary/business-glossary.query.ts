import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { BusinessGlossaryState, BusinessGlossaryStore } from './business-glossary.store';
import { BusinessGlossaryDashboards } from '../../models/business-glossary/dashboards.model';
import { BusinessGlossaryDashboardsList } from '../../models/business-glossary/dashboards-list.model';
import { BusinessGlossaryModels } from '../../models/business-glossary/models.model';
import { BusinessGlossaryModelsList } from '../../models/business-glossary/models-list.model';
import { BusinessGlossaryMetrics } from '../../models/business-glossary/metrics.model';
import { BusinessGlossaryMetricsList } from '../../models/business-glossary/metrics-list.model';

@Injectable({ providedIn: 'root' })
export class BusinessGlossaryQuery extends QueryEntity<BusinessGlossaryState> {
    isLoadingDisplay$: Observable<boolean>;

    dashboards$: Observable<BusinessGlossaryDashboards[]>;
    dashboardsList$: Observable<BusinessGlossaryDashboardsList[]>;
    titleDashboardsList$: Observable<string>;

    metrics$: Observable<BusinessGlossaryMetrics[]>;
    metricsList$: Observable<BusinessGlossaryMetricsList[]>;
    titleMetricsList$: Observable<string>;

    models$: Observable<BusinessGlossaryModels[]>;
    modelsList$: Observable<BusinessGlossaryModelsList[]>;
    titleModelsList$: Observable<string>;

    constructor(protected store: BusinessGlossaryStore) {
        super(store);

        this.isLoadingDisplay$ = this.select('isLoadingDisplay');

        this.dashboards$ = this.select('dashboards');
        this.dashboardsList$ = this.select('dashboardsList');
        this.titleDashboardsList$ = this.select('titleDashboardsList');

        this.metrics$ = this.select('metrics');
        this.metricsList$ = this.select('metricsList');
        this.titleMetricsList$ = this.select('titleMetricsList');

        this.models$ = this.select('models');
        this.modelsList$ = this.select('modelsList');
        this.titleModelsList$ = this.select('titleModelsList');
    }
}
