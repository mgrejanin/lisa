import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil, Unsubscriber } from '@picpay/angular/shared/helpers';

import { Observable, Subject } from 'rxjs';
import { filter, finalize, mergeMap, takeUntil, toArray } from 'rxjs/operators';

import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';
import { VariablesGet } from '../../models/variables-get.model';
import { VariablesRequest } from '../../models/variables-request.model';
import { VariablesUpdate } from '../../models/variables-update.model';

import { VariablesQuery } from './variables.query';
import { VariablesStore } from './variables.store';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Injectable()
export class VariablesService {
    private url = `${this.config.getConfig().apiUrl}/env-vars`;
    private urlServices = `${this.config.getConfig().apiUrl}/services`;
    private environment: string;
    private pageIndex: number;
    onServiceUpdate: Subject<void> = new Subject();
    onVariablesUpdate: Subject<void> = new Subject();
    onSidenavClose: Subject<void> = new Subject();
    onVariablesGet: Subject<void> = new Subject();
    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    constructor(
        protected store: VariablesStore,
        private httpClient: HttpClient,
        private config: CoreDataAccessService,
        private variablesQuery: VariablesQuery,
        private matDialog: MatDialog,
        private notifications: NotificationsService,
    ) {
        this.variablesQuery.environment$
            .pipe(subscribeUntil(this))
            .subscribe((environment: string) => (this.environment = environment));

        this.variablesQuery.pageIndex$
            .pipe(subscribeUntil(this))
            .subscribe((pageIndex: number) => (this.pageIndex = pageIndex));
    }

    setEnvironment(environment: string): void {
        this.store.update({
            environment,
        });
    }

    setTotalItems(totalItems: number): void {
        this.store.update({
            totalItems,
        });
    }

    setAssociatedServices(services: Service[]): void {
        this.store.update({
            associatedServices: services,
        });
    }

    setPageIndex(pageIndex: number): void {
        this.store.update({
            pageIndex,
        });
    }

    setActiveVariableKey(key: string): void {
        this.store.setActive(key);
    }

    setValueVariableSecret(valueVariableSecret: string): void {
        this.store.update({
            valueVariableSecret,
        });
    }

    setValueVariable(valueVariable: string): void {
        this.store.update({
            valueVariable,
        });
    }

    setTypeVariable(typeVariable: string): void {
        this.store.update({
            typeVariable,
        });
    }

    getVariables(size: number, query?: string): void {
        this.store.update({ isLoadingListVariables: true });
        const haveQuery = query ? `query=${query}&` : '';

        this.httpClient
            .get<VariablesGet>(`${this.url}?${haveQuery}page=${this.pageIndex}&size=${size}`)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.store.update({ isLoadingListVariables: false })),
            )
            .subscribe(
                (response: VariablesGet) => {
                    this.store.set(response.content);
                    this.setTotalItems(response.totalElements);
                },
                error => {
                    if (error.status === 0) {
                        this.notifications.openSnackbar(
                            'Houve um problema de conexão, verifique se você está conectado à VPN e com o certificado instalado.',
                            SnackbarTypes.ERROR,
                        );
                    }
                },
            );
    }

    // TODO: Conversar com backend pra adicionar o param de environment na request e retornar apenas as envs da environment informada
    getVariableServicesByKey(key: string): void {
        this.httpClient
            .get<Service[]>(`${this.url}/${key}/services`)
            .pipe(
                mergeMap(i => i),
                filter(i => i.stage === this.environment),
                toArray(),
                takeUntil(this.unsubscribe$),
            )
            .subscribe((services: Service[]) => this.setAssociatedServices(services));
    }

    createVariable(data: VariablesRequest): void {
        const body = data;
        this.httpClient
            .post<void>(this.url, body, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.onVariablesUpdate.next()),
            )
            .subscribe(() => this.notifications.openSnackbar('Variável criada com sucesso'));
    }

    deleteVariable(key: string): void {
        this.httpClient
            .delete<void>(`${this.url}/${key}`, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => (this.onSidenavClose.next(), this.matDialog.closeAll())),
            )
            .subscribe();
    }

    getServiceSearch(service: string): void {
        this.store.update({ isLoadingListVariables: true });
        this.httpClient
            .get<Service[]>(`${this.urlServices}/${service}/env-vars`, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.store.update({ isLoadingListVariables: false })),
            )
            .subscribe((services: Service[]) => {
                this.store.set(services);
                this.setTotalItems(services.length);
            });
    }

    showValueVariableSecret(key: string, version: number): void {
        this.store.update({ showValueVariableSecret: false, isLoadingValueVariableSecret: true });
        this.httpClient
            .get<Variable>(`${this.url}/${key}/${version}/decrypt`)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() =>
                    this.store.update({ showValueVariableSecret: true, isLoadingValueVariableSecret: false }),
                ),
            )
            .subscribe((response: Variable) => {
                this.setValueVariableSecret(response.value);
            });
    }

    getVariableKey(key: string): Observable<Variable> {
        return this.httpClient.get<Variable>(`${this.url}/${key}`).pipe(takeUntil(this.unsubscribe$));
    }

    updateVariable(key: string, data: VariablesUpdate): void {
        this.store.update({ isLoadingUpdateVariable: true, disabledSection: true });
        const body = data;
        this.httpClient
            .post<void>(`${this.url}/${key}`, body, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(
                    () => (
                        this.onVariablesGet.next(),
                        this.store.update({ isLoadingUpdateVariable: false, disabledSection: false })
                    ),
                ),
            )
            .subscribe();
    }

    rollbackVariable(key: string, version: number, data: VariablesUpdate): void {
        this.store.update({ isLoadingUpdateVariable: true, disabledSection: true });
        const body = data;
        this.httpClient
            .put<void>(`${this.url}/${key}/${version}/rollback`, body, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(
                    () => (
                        this.onVariablesGet.next(),
                        this.store.update({ isLoadingUpdateVariable: false, disabledSection: false })
                    ),
                ),
            )
            .subscribe();
    }

    getVariableVersion(key: string, version: number): void {
        this.httpClient
            .get<Variable>(`${this.url}/${key}/${version}`)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response: Variable) => {
                this.setValueVariable(response.value);
                this.setTypeVariable(response.type);
            });
    }

    associateService(service: string, data: Service): void {
        this.store.update({ isLoadingService: true, disabledSection: true });
        const body = data;
        this.httpClient
            .put<void>(`${this.urlServices}/${service}/env-vars`, body, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(
                    () => (
                        this.onServiceUpdate.next(),
                        this.store.update({ isLoadingService: false, disabledSection: false })
                    ),
                ),
            )
            .subscribe();
    }

    desassociateService(service: string, key: string): void {
        this.store.update({ isLoadingService: true, disabledSection: true });

        this.httpClient
            .delete<void>(`${this.urlServices}/${service}/env-vars/${key}`, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(
                    () => (
                        this.onServiceUpdate.next(),
                        this.store.update({ isLoadingService: false, disabledSection: false })
                    ),
                ),
            )
            .subscribe();
    }

    deployService(service: string): void {
        this.store.update({ isLoadingButtonDeploy: true });

        this.httpClient
            .put<void>(`${this.url}/deploy?stage=${this.environment}&services=${service}`, {})
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.store.update({ isLoadingButtonDeploy: false })),
            )
            .subscribe(() => this.notifications.openSnackbar('Deploy realizado com sucesso.'));
    }
}
