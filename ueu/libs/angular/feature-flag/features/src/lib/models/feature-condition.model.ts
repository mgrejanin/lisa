import { FeatureConditionExpression } from './feature-condition-expression.model';

export class FeatureCondition {
    constructor(
        public name: string,
        public order: number,
        public percentage: number,
        public value: string,
        public expressions: FeatureConditionExpression[],
        public id?: string,
    ) {}
}
