import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SharedModule } from '@picpay/feature-flag/shared';
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';

// ng-mocks
import { MockComponents, MockModule } from 'ng-mocks';

// components
import { GroupListComponent } from '../../components/group-list/group-list.component';
import { SearchComponent } from '../../components/search/search.component';
import { SquadsComponent } from './squads.component';

// store components
import { SquadsQuery, SquadsQueryMock, SquadsService, SquadsServiceMock } from '../../data-access/squads';

describe('SquadsComponent', () => {
    let component: SquadsComponent;
    let fixture: ComponentFixture<SquadsComponent>;

    let squadsQuery: SquadsQuery;
    let squadsService: SquadsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SquadsComponent, MockComponents(GroupListComponent, SquadsComponent, SearchComponent)],
            imports: [
                MockModule(MatIconModule),
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(MatSidenavModule),
                MockModule(MatListModule),
                MockModule(DesignSystemAngularModule),
                MockModule(SharedModule),
                MockModule(FeatureFlagAuthDirectivesModule),
            ],
            providers: [
                { provide: SquadsService, useClass: SquadsServiceMock },
                { provide: SquadsQuery, useClass: SquadsQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SquadsComponent);
        component = fixture.componentInstance;

        squadsQuery = TestBed.inject(SquadsQuery);
        squadsService = TestBed.inject(SquadsService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // CONTROLLER
    it('should have filteredSquads$ observable', () => {
        expect(component.filteredSquads$).toBeDefined();
        expect(component.filteredSquads$).toEqual(squadsQuery.filteredSquads$);
    });

    it('should call getSquads on init', () => {
        const spy = spyOn(component, 'getSquads');

        component.ngOnInit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have a getSquads function', () => {
        const spy = spyOn(squadsService, 'getSquads');

        component.getSquads();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have a updateFilter function', () => {
        const spy = spyOn(squadsService, 'updateFilter');

        const mockFilter = 'mockValue';

        component.updateFilter(mockFilter);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(mockFilter);
    });

    // TEMPLATE
    it('should have title "Gestão de Acessos" ', () => {
        const h1 = fixture.debugElement.query(By.css('.c-access-levels__title'));
        expect(h1).not.toBeNull();
        expect(h1.nativeElement.textContent).toEqual('Gestão de Acessos');
    });

    it('should have search component ', () => {
        const search = fixture.debugElement.query(By.css('feature-flag-search'));
        expect(search).not.toBeNull();
    });

    it('should call updateFilter function when typing search', () => {
        const spy = spyOn(component, 'updateFilter');

        const searchElement = fixture.debugElement.query(By.css('feature-flag-search'));

        const mockValue = 'mockValue';

        searchElement.triggerEventHandler('updateFilter', mockValue);

        expect(spy).toHaveBeenCalledWith(mockValue);
    });

    it('should clearFilter on destroy', () => {
        const spy = spyOn(squadsService, 'clearFilter');

        component.ngOnDestroy();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
