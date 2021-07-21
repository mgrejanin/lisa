import { Comparator } from './comparators.model';

export class FeatureConditionExpression {
    constructor(public param: string, public comparator: Comparator, public value: string) {}
}
