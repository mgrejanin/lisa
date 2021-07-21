import { Observable, of } from 'rxjs';

import { BusinessGlossaryDashboards } from '../../../models/business-glossary/dashboards.model';
import { BusinessGlossaryDashboardsList } from '../../../models/business-glossary/dashboards-list.model';
import { BusinessGlossaryMetrics } from '../../../models/business-glossary/metrics.model';
import { BusinessGlossaryMetricsList } from '../../../models/business-glossary/metrics-list.model';
import { BusinessGlossaryModels } from '../../../models/business-glossary/models.model';
import { BusinessGlossaryModelsList } from '../../../models/business-glossary/models-list.model';
import { mockBussinessGlossary, mockBussinessGlossaryList } from './business-glossary.mock';

export class BusinessGlossaryQueryMock {
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

    constructor() {
        this.isLoadingDisplay$ = of(true);

        this.dashboards$ = of(mockBussinessGlossary);
        this.dashboardsList$ = of(mockBussinessGlossaryList);
        this.titleDashboardsList$ = of('mockTitleDashboardsList');

        this.metrics$ = of(mockBussinessGlossary);
        this.metricsList$ = of(mockBussinessGlossaryList);
        this.titleModelsList$ = of('mockTitleMetricsList');

        this.models$ = of(mockBussinessGlossary);
        this.modelsList$ = of(mockBussinessGlossaryList);
        this.titleModelsList$ = of('titleModelsList');
    }
}
