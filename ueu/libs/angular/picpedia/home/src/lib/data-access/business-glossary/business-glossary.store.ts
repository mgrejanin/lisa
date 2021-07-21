import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { BusinessGlossaryDashboards } from '../../models/business-glossary/dashboards.model';
import { BusinessGlossaryDashboardsList } from '../../models/business-glossary/dashboards-list.model';
import { BusinessGlossaryModels } from '../../models/business-glossary/models.model';
import { BusinessGlossaryModelsList } from '../../models/business-glossary/models-list.model';
import { BusinessGlossaryMetrics } from '../../models/business-glossary/metrics.model';
import { BusinessGlossaryMetricsList } from '../../models/business-glossary/metrics-list.model';

export interface BusinessGlossaryState {
    isLoadingDisplay: boolean;

    dashboards: BusinessGlossaryDashboards[];
    dashboardsList: BusinessGlossaryDashboardsList[];
    titleDashboardsList: string;

    metrics: BusinessGlossaryMetrics[];
    metricsList: BusinessGlossaryMetricsList[];
    titleMetricsList: string;

    models: BusinessGlossaryModels[];
    modelsList: BusinessGlossaryModelsList[];
    titleModelsList: string;
}

export function createInitialState(): BusinessGlossaryState {
    return {
        isLoadingDisplay: false,

        dashboards: [],
        dashboardsList: [],
        titleDashboardsList: '',

        metrics: [],
        metricsList: [],
        titleMetricsList: '',

        models: [],
        modelsList: [],
        titleModelsList: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'BusinessGlossary' })
export class BusinessGlossaryStore extends EntityStore<BusinessGlossaryState> {
    constructor() {
        super(createInitialState());
    }
}
