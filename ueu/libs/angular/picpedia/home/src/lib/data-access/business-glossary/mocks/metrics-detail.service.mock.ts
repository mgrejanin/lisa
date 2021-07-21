import { Observable, of } from 'rxjs';

import { mockBussinessGlossaryMetricsDetail } from './business-glossary.mock';
import { BusinessGlossaryMetricsDetail } from '../../../models/business-glossary/metrics-detail/item.model';

export class MetricsDetailServiceMock {
    setTitleMetrics(titleMetricsDetail: string): void {}

    setDescriptionMetrics(descriptionMetricsDetail: string): void {}

    setRuleMetrics(ruleMetricsDetail: string): void {}

    setTagsMetrics(tagsMetricsDetail: string): void {}

    setStewardMetrics(stewardMetricsDetail: string): void {}

    setOwnerMetrics(ownerMetricsDetail: string): void {}

    setUsersMetrics(usersMetricsDetail: string): void {}

    setBadgeMetrics(badgeMetricsDetail: string): void {}

    getMetricsDetail(name: string): Observable<BusinessGlossaryMetricsDetail[]> {
        return of(mockBussinessGlossaryMetricsDetail);
    }
}
