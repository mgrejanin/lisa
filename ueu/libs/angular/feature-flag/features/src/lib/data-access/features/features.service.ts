import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// store components
import { FeaturesStore } from './features.store';

// rxjs
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// services
import { NotificationsService } from '@picpay/angular/shared/core/notifications';

// interfaces
import {
    FeatureType,
    Application,
    Feature,
    FeatureAuditing,
    Squad,
    UpdateFeatureParams,
    ClientGroup,
    FeatureCreate,
} from '../../models';

@Injectable({ providedIn: 'root' })
export class FeaturesService implements OnDestroy {
    private readonly applicationsUnsubscribe$: Subject<void>;
    private readonly squadsUnsubscribe$: Subject<void>;
    private readonly clientGroupsUnsubscribe$: Subject<void>;
    private readonly unsubscribe$: Subject<void>;

    constructor(
        private config: CoreDataAccessService,
        private featuresStore: FeaturesStore,
        private http: HttpClient,
        private router: Router,
        private notifications: NotificationsService,
    ) {
        this.applicationsUnsubscribe$ = new Subject();
        this.squadsUnsubscribe$ = new Subject();
        this.clientGroupsUnsubscribe$ = new Subject();
        this.unsubscribe$ = new Subject();
    }

    ngOnDestroy() {
        this.applicationsUnsubscribe$.next();
        this.applicationsUnsubscribe$.complete();

        this.squadsUnsubscribe$.next();
        this.squadsUnsubscribe$.complete();

        this.clientGroupsUnsubscribe$.next();
        this.clientGroupsUnsubscribe$.complete();

        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // FEATURES
    getFeature(id: string): void {
        this.startRequest();

        const url = `${this.config.getConfig().apiUrl}/flags/features/${id}`;

        this.http
            .get(url)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.closeRequest()),
            )
            .subscribe((response: Feature) => {
                this.setActiveFeature(response);
            });
    }

    getFeatures(): void {
        this.startRequest();

        const url = `${this.config.getConfig().apiUrl}/flags/features`;

        this.http
            .get(url)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.closeRequest()),
            )
            .subscribe((response: Feature[]) => {
                this.featuresStore.updateFeatures(response);
                this.setActiveFeature(response[0]);
            });
    }

    createFeature(feature: FeatureCreate): void {
        this.startRequest();

        const url = `${this.config.getConfig().apiUrl}/flags/features`;

        this.http
            .post(url, feature)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.closeRequest();
                }),
            )
            .subscribe(async () => {
                this.notifications.openSnackbar('Funcionalidade criada com sucesso.');

                this.getFeatures();
                await this.navigateToRoot();
            });
    }

    updateFeature(id: string, params: UpdateFeatureParams): void {
        this.startRequest();

        const url = `${this.config.getConfig().apiUrl}/flags/features/${id}`;

        this.http
            .put(url, params)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.closeRequest()),
            )
            .subscribe(async () => {
                this.notifications.openSnackbar('Funcionalidade editada com sucesso.');

                this.getFeatures();
                await this.navigateToRoot();
            });
    }

    deleteFeature(id: string): void {
        this.startRequest();

        const url = `${this.config.getConfig().apiUrl}/flags/features/${id}`;

        this.http
            .delete(url)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.closeRequest()),
            )
            .subscribe(async () => {
                this.notifications.openSnackbar('Funcionalidade excluída com sucesso.');

                this.getFeatures();
            });
    }

    setActiveFeature(feature: Feature): void {
        this.featuresStore.updateActiveFeature(feature);
    }

    getCommits(id: string): void {
        this.startRequest();

        // cleans the previous stored commits
        this.featuresStore.updateActiveCommits(null);

        const url = `${this.config.getConfig().apiUrl}/flags/features/${id}/commits`;

        this.http
            .get(url)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.closeRequest()),
            )
            .subscribe((response: FeatureAuditing[]) => {
                this.featuresStore.updateActiveCommits(response);
            });
    }

    getApplications(): void {
        this.applicationsUnsubscribe$.next();

        const url = `${this.config.getConfig().apiUrl}/flags/applications`;

        this.http
            .get(url)
            .pipe(
                takeUntil(this.applicationsUnsubscribe$),
                finalize(() => this.applicationsUnsubscribe$.next()),
            )
            .subscribe((response: Application[]) => {
                this.featuresStore.updateApplications(response);
            });
    }

    getSquads(): void {
        // TODO MOVER PARA A LIB DE SQUADS QUE SERÁ CRIADA
        this.squadsUnsubscribe$.next();

        const url = `${this.config.getConfig().apiUrl}/flags/users/squads`;

        this.http
            .get(url)
            .pipe(
                takeUntil(this.squadsUnsubscribe$),
                finalize(() => this.squadsUnsubscribe$.next()),
            )
            .subscribe((response: Squad[]) => {
                this.featuresStore.updateSquads(response);
            });
    }

    getClientGroups(applicationId: string): void {
        this.clientGroupsUnsubscribe$.next();

        const url = `${this.config.getConfig().apiUrl}/flags/client-groups`;
        const app = new HttpParams().append('app', applicationId);

        this.http
            .get(url, { params: app })
            .pipe(
                takeUntil(this.clientGroupsUnsubscribe$),
                finalize(() => this.clientGroupsUnsubscribe$.next()),
            )
            .subscribe((response: ClientGroup[]) => {
                this.featuresStore.updateClientGroups(response);
            });
    }

    // service utils
    getTypeName(type: FeatureType): string {
        switch (type) {
            case FeatureType.BOOLEAN:
                return 'Boolean';
            case FeatureType.JSON:
                return 'Json';
            case FeatureType.STRING:
                return 'String';
            default:
                return 'Undefined';
        }
    }

    // private helpers
    private startRequest(): void {
        this.unsubscribe$.next();

        this.featuresStore.update({ isLoading: true });
    }

    private closeRequest(): void {
        this.unsubscribe$.next();

        this.featuresStore.update({ isLoading: false });
    }

    private async navigateToRoot(): Promise<void> {
        await this.router.navigate(['../']);
    }
}
