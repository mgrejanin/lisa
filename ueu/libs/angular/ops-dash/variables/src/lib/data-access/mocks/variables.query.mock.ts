import { of, Observable } from 'rxjs';
import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';

export class VariablesQueryMock {
    readonly environment$: Observable<string>;
    readonly associatedServices$: Observable<Service[]>;
    readonly variables$: Observable<(Variable | Service)[]>;
    readonly totalItems$: Observable<number>;

    readonly isLoadingListVariables$: Observable<boolean>;
    readonly isLoadingUpdateVariable$: Observable<boolean>;
    readonly isLoadingService$: Observable<boolean>;
    readonly isLoadingValueVariableSecret$: Observable<boolean>;
    readonly isLoadingButtonDeploy$: Observable<boolean>;

    readonly showValueVariableSecret$: Observable<boolean>;
    readonly disabledSection$: Observable<boolean>;

    readonly pageIndex$: Observable<number>;
    readonly activeVariableKey$: Observable<string>;
    readonly valueVariableSecret$: Observable<string>;
    readonly valueVariable$: Observable<string>;
    readonly typeVariable$: Observable<string>;

    constructor() {
        this.environment$ = of('mockEnvironment');
        this.associatedServices$ = of([new Service('mockService', 'mockKey', 'mockAlias', 'mockStage')]);
        this.variables$ = of([]);
        this.totalItems$ = of(2);

        this.isLoadingListVariables$ = of(true);
        this.isLoadingUpdateVariable$ = of(true);
        this.isLoadingService$ = of(true);
        this.isLoadingValueVariableSecret$ = of(true);
        this.isLoadingButtonDeploy$ = of(true);

        this.showValueVariableSecret$ = of(true);
        this.disabledSection$ = of(true);

        this.pageIndex$ = of(2);
        this.activeVariableKey$ = of('mockKey');
        this.valueVariableSecret$ = of('mockSecret');
        this.valueVariable$ = of('mockVariable');
        this.typeVariable$ = of('mockType');
    }
}
