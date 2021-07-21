import { BusinessGlossaryDashboardsDetailTags } from '../dashboards-detail/tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from '../dashboards-detail/steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from '../dashboards-detail/owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from '../dashboards-detail/users.model';

export class BusinessGlossaryModelsDetail {
    constructor(
        public name: string,
        public description: string,
        public result: string,
        public project: string,
        public timesIa: string,
        public timeImpacted: string,
        public tags: BusinessGlossaryDashboardsDetailTags[],
        public steward: BusinessGlossaryDashboardsDetailSteward[],
        public owner: BusinessGlossaryDashboardsDetailOwner[],
        public users: BusinessGlossaryDashboardsDetailUsers[],
        public badge: string,
    ) {}
}
