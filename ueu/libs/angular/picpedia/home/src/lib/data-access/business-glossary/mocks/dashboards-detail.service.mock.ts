import { Observable, of, Subject } from 'rxjs';

import { mockBussinessGlossaryDetail } from './business-glossary.mock';
import { BusinessGlossaryDashboardsDetail } from '../../../models/business-glossary/dashboards-detail/item.model';

export class DashboardsDetailServiceMock {
    setTitleDashboards(titleDashboardsDetail: string): void {}

    setDescriptionDashboards(descriptionDashboardsDetail: string): void {}

    setDateDashboards(dateDashboardsDetail: string): void {}

    setFrequencyDashboards(frequencyDashboardsDetail: string): void {}

    setScopeDashboards(scopeDashboardsDetail: string): void {}

    setTagsDashboards(tagsDashboardsDetail: string): void {}

    setOriginDashboards(originDashboardsDetail: string): void {}

    setStewardDashboards(stewardDashboardsDetail: string): void {}

    setOwnerDashboards(ownerDashboardsDetail: string): void {}

    setUsersDashboards(usersDashboardsDetail: string): void {}

    setBadgeDashboards(badgeDashboardsDetail: string): void {}

    getDashboardsDetail(name: string): Observable<BusinessGlossaryDashboardsDetail[]> {
        return of(mockBussinessGlossaryDetail);
    }
}
