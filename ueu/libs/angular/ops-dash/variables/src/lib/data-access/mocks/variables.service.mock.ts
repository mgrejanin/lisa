// rxjs
import { Observable, of, Subject } from 'rxjs';

// interface
import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';
import { VariablesGet } from '../../models/variables-get.model';
import { VariablesRequest } from '../../models/variables-request.model';
import { VariableType } from '../../models/variables-type.model';
import { VariablesUpdate } from '../../models/variables-update.model';

export class VariablesServiceMock {
    onVariablesUpdate: Subject<void> = new Subject();
    onServiceUpdate: Subject<void> = new Subject();
    onSidenavClose: Subject<void> = new Subject();
    onVariablesGet: Subject<void> = new Subject();
    private variablesMock = new Variable('mockKey', 'mockValue', VariableType.PLAIN, 'mockId', 1, 'mockCreatedAt');
    private variablesGetMock = new VariablesGet([], 10);
    private ServicesMock = new Service('mockService', 'mockKey', 'mockAlias', 'mockStage');

    setEnvironment(environment: string): void {}

    setTotalItems(totalItems: number): void {}

    setAssociatedServices(services: Service[]): void {}

    setPageIndex(pageIndex: number): void {}

    setActiveVariableKey(key: string): void {}

    setValueVariableSecret(valueVariableSecret: string): void {}

    setValueVariable(valueVariable: string): void {}

    setTypeVariable(typeVariable: string): void {}

    getVariables(page: any, size: number, query?: string): Observable<VariablesGet> {
        return of(this.variablesGetMock);
    }

    getVariableServicesByKey(key: string): Observable<Service> {
        return of(this.ServicesMock);
    }

    createVariable(data: VariablesRequest): Observable<VariablesRequest> {
        return of(this.variablesMock);
    }

    deleteVariable(key: string): Observable<Variable> {
        return of(this.variablesMock);
    }

    getServiceSearch(service: string): Observable<Service[]> {
        return of([this.ServicesMock]);
    }

    showValueVariableSecret(key: string, version: number): Observable<Variable> {
        return of(this.variablesMock);
    }

    getVariableKey(key: string): Observable<Variable> {
        return of(this.variablesMock);
    }

    updateVariable(key: string, data: VariablesUpdate): Observable<Variable> {
        return of(this.variablesMock);
    }

    rollbackVariable(key: string, version: number, data: VariablesUpdate): Observable<Variable> {
        return of(this.variablesMock);
    }

    getVariableVersion(key: string, version: number): Observable<Variable> {
        return of(this.variablesMock);
    }

    associateService(service: string, data: Service): Observable<Service> {
        return of(this.ServicesMock);
    }

    desassociateService(service: string, key: string): Observable<Service> {
        return of(this.ServicesMock);
    }

    deployService(stage: string, service: string): Observable<Service> {
        return of(this.ServicesMock);
    }
}
