import { BusinessGlossaryDashboardsDetailTags } from './tags.model';
import { BusinessGlossaryDashboardsDetailSteward } from './steward.model';
import { BusinessGlossaryDashboardsDetailOwner } from './owner.model';
import { BusinessGlossaryDashboardsDetailUsers } from './users.model';
import { BusinessGlossaryDashboardsDetailLooker } from './looker.model';

export class BusinessGlossaryDashboardsDetail {
    constructor(
        public name: string,
        public description: string,
        public date: string,
        public frequency: string,
        public scope: string,
        public tags: BusinessGlossaryDashboardsDetailTags[],
        public origin: string,
        public steward: BusinessGlossaryDashboardsDetailSteward[],
        public owner: BusinessGlossaryDashboardsDetailOwner[],
        public users: BusinessGlossaryDashboardsDetailUsers[],
        public badge: string,
        public dashboards: BusinessGlossaryDashboardsDetailLooker[],
    ) {}
}
