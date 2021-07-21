// interfaces
import { Application } from './application.model';
import { FeatureAuditing } from './auditing.model';
import { FeatureCondition } from './feature-condition.model';
import { FeatureType } from './feature-type.model';
import { Squad } from './squad.model';

export class Feature {
    constructor(
        public name: string,
        public description: string,
        public type: FeatureType,
        public value: string,
        public application: Application,
        public squad: Squad,
        public id: string,
        public auditing: FeatureAuditing[],
        public conditions: FeatureCondition[],
        public createdAt: string,
        public updatedAt: string,
    ) {}
}
