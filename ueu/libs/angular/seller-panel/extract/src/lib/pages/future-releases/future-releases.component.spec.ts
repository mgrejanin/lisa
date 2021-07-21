import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { MockComponent, MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ExtractService, ExtractServiceMock } from '@picpay/seller-panel/services';
import { FeedBackComponent, LoadingSpinnerComponent, OnboardingExtractComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock, WINDOW } from '@picpay/angular/shared/helpers';

import { FutureReleasesComponent } from './future-releases.component';
import { TableFutureReleasesComponent } from '../../components/table-future-releases/table-future-releases.component';

describe('FutureReleasesComponent', () => {
    let component: FutureReleasesComponent;
    let fixture: ComponentFixture<FutureReleasesComponent>;
    let windowToken: Window;
    let extractService: ExtractService;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                FutureReleasesComponent,
                MockComponent(LoadingSpinnerComponent),
                MockComponent(TableFutureReleasesComponent),
                MockComponent(FeedBackComponent),
            ],
            imports: [
                MockModule(DesignSystemAngularModule),
                MockModule(MatIconModule),
                MockModule(MatChipsModule),
                MockModule(MatTableModule),
            ],
            providers: [
                CurrencyPipe,
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: ExtractService, useClass: ExtractServiceMock },
                { provide: Window, useValue: WINDOW },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FutureReleasesComponent);
        component = fixture.componentInstance;

        windowToken = TestBed.inject(WINDOW);
        extractService = TestBed.inject(ExtractService);
        matDialog = TestBed.inject(MatDialog);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should getFutureReleases throw error and set stateError at component', () => {
        const getFutureReleasesSpy = spyOn(extractService, 'getFutureReleases').and.returnValue(throwError(404));
        const setEmptyStateDataSpy = spyOn(component, 'setEmptyStateData');

        component.ngOnInit();

        expect(getFutureReleasesSpy).toHaveBeenCalled();

        extractService.getFutureReleases().subscribe(
            response => {
                expect(component.tableData).toEqual(response);
                expect(component.isLoading).toBe(false);
            },
            () => {
                expect(component.isLoading).toBe(false);
                expect(setEmptyStateDataSpy).toHaveBeenCalledWith(true);
            },
        );
    });

    it('should have onScroll function', () => {
        component.onScroll();

        expect(component.scrollToTopVisible).toBe(false);
    });

    it('should have scrollToTop function', () => {
        const scrollTopSpy = spyOn(windowToken, 'scroll');

        component.scrollToTop();

        expect(scrollTopSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('should have setEmptyStateData function', () => {
        component.setEmptyStateData(false);

        expect(component.emptyStateData).toEqual({
            description: 'Acompanhe aqui seus pagamentos e saques.',
            svgPath: './assets/images/empty_state.svg',
            title: 'Você ainda não possui movimentações',
        });

        component.setEmptyStateData(true);

        expect(component.emptyStateData).toEqual({
            description: 'Algo aconteceu e não conseguimos carregar as informações.',
            svgPath: './assets/images/empty_extract.svg',
            title: 'Opa, isso não deu certo!',
        });
    });

    it('should have knowMore function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();

        component.knowMore();

        expect(matDialogSpy).toHaveBeenCalledWith(OnboardingExtractComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '628px',
            height: '624px',
            disableClose: true,
        });
    });
});
