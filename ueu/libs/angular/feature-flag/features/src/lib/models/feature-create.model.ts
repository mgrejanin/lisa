// interfaces
import { FeatureCondition } from './feature-condition.model';
import { FeatureType } from './feature-type.model';

export class FeatureCreate {
    constructor(
        public name: string,
        public description: string,
        public type: FeatureType,
        public value: string,
        public application: string,
        public squad: string,
        public conditions: FeatureCondition[],
    ) {}
}
