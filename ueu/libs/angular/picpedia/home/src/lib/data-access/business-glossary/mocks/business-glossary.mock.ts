import { BusinessGlossaryDashboards } from '../../../models/business-glossary/dashboards.model';
import { BusinessGlossaryDashboardsList } from '../../../models/business-glossary/dashboards-list.model';
import { BusinessGlossaryDashboardsDetail } from '../../../models/business-glossary/dashboards-detail/item.model';
import { BusinessGlossaryModelsDetail } from '../../../models/business-glossary/models-detail/item.model';
import { BusinessGlossaryMetricsDetail } from '../../../models/business-glossary/metrics-detail/item.model';

export const mockBussinessGlossary: BusinessGlossaryDashboards[] = [
    { data_domain: 'Name_mock_1', id: 1 },
    { data_domain: 'Name_mock_2', id: 2 },
];

export const mockBussinessGlossaryList: BusinessGlossaryDashboardsList[] = [
    {
        name: 'name_mock_1',
        description: 'description_mock_1',
        dataDomain: 'dataDomain_mock_1',
        tag: 'tag_mock_1',
        badge: 'badge_mock_1',
        idFavorite: { idFavorite: 1, favorite: true },
        favorite: { idFavorite: 1, favorite: true },
        id: 1,
    },
];

export const mockBussinessGlossaryDetail: BusinessGlossaryDashboardsDetail[] = [
    {
        name: 'name_mock_1',
        description: 'description_mock_1',
        date: 'date_mock_1',
        frequency: 'frequency_mock_1',
        scope: 'scope_mock_1',
        tags: [],
        origin: 'origin_mock_1',
        steward: [],
        owner: [],
        users: [],
        badge: 'badge_mock_1',
        dashboards: [],
    },
];

export const mockBussinessGlossaryModelsDetail: BusinessGlossaryModelsDetail[] = [
    {
        name: 'name_mock_1',
        description: 'description_mock_1',
        result: 'result_mock_1',
        project: 'project_mock_1',
        timesIa: 'timesIa_mock_1',
        timeImpacted: 'timeImpacted_mock_1',
        tags: [],
        steward: [],
        owner: [],
        users: [],
        badge: 'badge_mock_1',
    },
];

export const mockBussinessGlossaryMetricsDetail: BusinessGlossaryMetricsDetail[] = [
    {
        name: 'name_mock_1',
        description: 'description_mock_1',
        rule: 'rule_mock_1',
        tags: [],
        steward: [],
        owner: [],
        users: [],
        badge: 'badge_mock_1',
    },
];
