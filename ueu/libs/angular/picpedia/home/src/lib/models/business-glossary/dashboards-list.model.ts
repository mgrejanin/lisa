import { BusinessGlossaryDashboardsFavorite } from './dashboards-favorite.model';

export class BusinessGlossaryDashboardsList {
    constructor(
        public name: string,
        public description: string,
        public dataDomain: string,
        public tag: string,
        public badge: string,
        public idFavorite: BusinessGlossaryDashboardsFavorite,
        public favorite: BusinessGlossaryDashboardsFavorite,
        public id: number,
    ) {}
}
