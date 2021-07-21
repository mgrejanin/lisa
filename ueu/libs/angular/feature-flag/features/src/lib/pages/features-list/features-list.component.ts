import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// material
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';

// services
import { NotificationsService } from '@picpay/angular/shared/core/notifications';
import { FeaturesQuery } from '../../data-access/features/features.query';
import { FeaturesService } from '../../data-access/features/features.service';

// interfaces
import { Feature, FeatureAuditing, FeatureType } from '../../models';
import { createFeatureFlagPermissions, FeatureFlagPermissions } from '@picpay/feature-flag/auth';

// rxjs
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';

@Component({
    selector: 'feature-flag-features-list',
    templateUrl: './features-list.component.html',
    styleUrls: ['./features-list.component.scss'],
})
export class FeaturesListComponent implements OnInit, OnDestroy {
    readonly displayedColumns: string[];
    readonly dataSource$: Observable<MatTableDataSource<Feature>>;

    readonly activeFeature$: Observable<Feature>;
    readonly activeCommits$: Observable<FeatureAuditing[]>;

    @ViewChild('drawer', { static: true }) drawer: MatSidenav;

    private readonly features$: Observable<Feature[]>;

    private readonly filter$: BehaviorSubject<string>;

    private readonly unsubscribe$: Subject<void>;

    canShow: FeatureFlagPermissions;

    constructor(
        private featuresQuery: FeaturesQuery,
        private featuresService: FeaturesService,
        private modalsService: NotificationsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        // Sidebar data
        this.activeFeature$ = this.featuresQuery.activeFeature$;
        this.activeCommits$ = this.featuresQuery.activeCommits$;

        // Setting the displayed columns
        this.displayedColumns = ['name', 'description', 'type'];

        // Here we have both the features observable
        // and the filter BehaviorSubject.
        this.features$ = this.featuresQuery.features$;
        this.filter$ = new BehaviorSubject('');

        // We merge both to create the dataSource observable that will
        // feed the table. Whenever one of them emits, we will map their last
        // emits to a new MatDataTableSource with the current filter.
        this.dataSource$ = combineLatest([this.features$, this.filter$]).pipe(
            debounceTime(250),
            map(([feats, filter]) => {
                const dataSource = new MatTableDataSource(feats);
                dataSource.filter = filter;
                return dataSource;
            }),
        );

        this.unsubscribe$ = new Subject();

        // roles
        this.canShow = createFeatureFlagPermissions({
            availableToAdmin: false,
            availableToEditor: true,
            isAvailableToSquadAdmin: true,
            isAvailableToSquadEditor: true,
        });
    }

    ngOnInit(): void {
        this.getFeatures();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getFeatures(): void {
        this.featuresService.getFeatures();
    }

    async onCreateFeature(): Promise<void> {
        await this.router.navigate(['criar'], { relativeTo: this.route.parent });
    }

    onDeleteFeature(featureId: string): void {
        const modalRef = this.modalsService.openConfirmationModal(
            'Excluir funcionalidade',
            'Ao excluir essa funcionalidade, você não poderá mais visualizá-la. Deseja realmente excluir?',
        );

        modalRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(async reason => {
                if (reason && reason.confirm) {
                    this.featuresService.deleteFeature(featureId);
                    await this.onClose();
                }
            });
    }

    // details utils
    async onClose(): Promise<void> {
        await this.drawer.close();
    }

    // table utils
    async onEditFeature(feature: Feature): Promise<void> {
        this.featuresService.setActiveFeature(feature);
        await this.router.navigate([`editar/${feature.id}`], { relativeTo: this.route.parent });
    }

    async onSeeDetails(feature: Feature): Promise<void> {
        this.featuresService.setActiveFeature(feature);
        this.featuresService.getCommits(feature.id);
        await this.drawer.open();
    }

    getTypeName(type: FeatureType): string {
        return this.featuresService.getTypeName(type);
    }

    applyFilter(value: string): void {
        this.filter$.next(value);
    }
}
