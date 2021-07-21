import { FeatureCondition } from '.';
export class UpdateFeatureParams {
    constructor(
        public description: string,
        public value: string,
        public commitMessage: string,
        public conditions: FeatureCondition[],
    ) {}
}
