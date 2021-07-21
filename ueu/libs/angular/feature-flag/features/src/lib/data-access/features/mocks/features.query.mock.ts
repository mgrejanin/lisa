import { Observable, of } from 'rxjs';

// interfaces
import {
    Application,
    Feature,
    Squad,
    FeatureAuditing,
    FeatureType,
    FeatureCondition,
    FeatureConditionExpression,
    Comparator,
} from '../../../models';

export const mockApplication = new Application('appId', 'appName');
export const mockSquad = new Squad('squadId', 'squadName');

export const mockFeature = new Feature(
    'mockName',
    'mockDescription',
    FeatureType.BOOLEAN,
    'true',
    mockApplication,
    mockSquad,
    'mockId',
    [],
    [
        new FeatureCondition(
            'mockName',
            1,
            50,
            'false',
            [new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android')],
            'mockId',
        ),
        new FeatureCondition('mockLess', 2, 50, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            new FeatureConditionExpression('appVersion', Comparator.LESS, 'mockVersion'),
        ]),
        new FeatureCondition('mockLess', 3, 50, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            new FeatureConditionExpression('appVersion', Comparator.LESS_OR_EQUAL, 'mockVersion'),
        ]),
        new FeatureCondition('mockGreater', 4, 50, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            new FeatureConditionExpression('appVersion', Comparator.GREATER, 'mockVersion'),
        ]),
        new FeatureCondition('mockGreater', 5, 50, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            new FeatureConditionExpression('appVersion', Comparator.GREATER_OR_EQUAL, 'mockVersion'),
        ]),
        new FeatureCondition('mockEqual', 6, 50, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            new FeatureConditionExpression('appVersion', Comparator.EQUAL, 'mockVersion'),
        ]),
        new FeatureCondition('mockBetween', 7, 50, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
            new FeatureConditionExpression('appVersion', Comparator.GREATER_OR_EQUAL, 'maxMockVersion'),
            new FeatureConditionExpression('appVersion', Comparator.LESS_OR_EQUAL, 'minMockVersion'),
        ]),
        new FeatureCondition('mockGroup', 8, 50, 'false', [
            new FeatureConditionExpression('groups', Comparator.CONTAINS, 'PicPayLovers'),
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'android'),
        ]),
    ],
    'mockDate',
    'mockDate',
);

export class FeaturesQueryMock {
    applications$: Observable<Application[]>;
    activeFeature$: Observable<Feature>;
    activeCommits$: Observable<FeatureAuditing[]>;
    features$: Observable<Feature[]>;
    isLoading$: Observable<boolean>;

    constructor() {
        this.applications$ = of([mockApplication]);
        this.activeFeature$ = of(mockFeature);
        this.activeCommits$ = of([]);
        this.features$ = of([mockFeature]);
        this.isLoading$ = of(false);
    }
}
