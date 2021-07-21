import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { VariablesHomeComponent } from './variables.component';

// data-access
import { variablesGetMock } from '../../data-access/mocks/variables.mock';
import { VariablesServiceMock } from '../../data-access/mocks/variables.service.mock';

// ng-mocks
import { MockComponent, MockModule } from 'ng-mocks';

// modules
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { OpsDashSharedModule } from '@picpay/ops-dash/shared';
import { UiComponentsModule } from '@picpay/ui/components';
import { VariablesUpdateComponent } from '../../components/variables-update/variables-update.component';
import { VariablesService } from '../../data-access/variables/variables.service';

describe('VariablesHomeComponent', () => {
    let component: VariablesHomeComponent;
    let fixture: ComponentFixture<VariablesHomeComponent>;

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(DesignSystemAngularModule),
                MatPaginatorModule,
                MockModule(MatInputModule),
                MockModule(MatTableModule),
                MockModule(MatIconModule),
                MockModule(MatButtonModule),
                MockModule(MatDialogModule),
                MockModule(MatSidenavModule),
                MockModule(UiComponentsModule),
                MockModule(MatProgressSpinnerModule),
                MockModule(OpsDashSharedModule),
            ],
            declarations: [VariablesHomeComponent, MockComponent(VariablesUpdateComponent)],
            providers: [
                { provide: VariablesService, useClass: VariablesServiceMock },
                { provide: MatDialog, useValue: mockDialog },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VariablesHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a getVariables function on init', () => {
        const initSpy = spyOn(component, 'getVariables');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a startUpdateSubscription function on init', () => {
        const initSpy = spyOn(component, 'startUpdateSubscription');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a closeSidenavSubscription function on init', () => {
        const initSpy = spyOn(component, 'closeSidenavSubscription');
        component.ngOnInit();
        expect(initSpy).toHaveBeenCalled();
    });

    it('should have a getVariables function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const expectedVariables = new MatTableDataSource([variablesGetMock]);
        const serviceSpy = spyOn(variablesServiceStub, 'getVariables').and.returnValue(of(variablesGetMock));

        component.getVariables();
        expect(serviceSpy).toHaveBeenCalled();
        expect(component.variables$.toString()).toEqual(expectedVariables.toString());
    });

    it('should have a applyFilter function', () => {
        component.searchForm.controls.searchString.setValue('t');
        const searchString = component.searchForm.controls.searchString;
        expect(searchString.invalid).toBeTruthy();

        component.applyFilter(true);
    });

    it('should set value empty on applyFilter function', () => {
        const value = false;
        component.applyFilter(value);
    });

    it('should set value on applyFilter function', () => {
        const value = true;
        component.searchForm.controls.searchString.setValue('');
        component.applyFilter(value);
    });

    it('should set searchString on applyFilter function', () => {
        const value = true;
        component.searchForm.controls.searchString.setValue('name');
        component.searchForm.controls.filterOption.setValue('');

        component.applyFilter(value);
    });

    it('should set else searchString on applyFilter function', () => {
        const value = true;
        component.searchForm.controls.searchString.setValue('');
        component.searchForm.controls.filterOption.setValue('name');

        component.applyFilter(value);
    });

    it('should have a startUpdateSubscription function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const expectedVariables = new MatTableDataSource([variablesGetMock]);
        const serviceSpy = spyOn(variablesServiceStub.onVariablesUpdate, 'subscribe').and.returnValue(
            of(variablesGetMock),
        );
        const getSpy = spyOn(variablesServiceStub, 'getVariables').and.returnValue(of(variablesGetMock));

        component.startUpdateSubscription();
        component.getVariables();
        expect(serviceSpy).toHaveBeenCalled();
        expect(getSpy).toHaveBeenCalled();
        expect(component.variables$.toString()).toEqual(expectedVariables.toString());
    });

    it('should have a closeSidenavSubscription function', async () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub.onSidenavClose, 'subscribe').and.returnValue(
            of(variablesGetMock),
        );

        component.closeSidenavSubscription();
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should have a getPageItems function', () => {
        const variablesServiceStub: VariablesService = TestBed.inject(VariablesService);
        const serviceSpy = spyOn(variablesServiceStub, 'getVariables').and.returnValue(of(variablesGetMock));
        const page = 1;

        component.searchForm.controls.searchString.setValue('');
        component.searchForm.controls.filterOption.setValue('mock');

        component.getPageItems(page);
        expect(serviceSpy).toHaveBeenCalled();
    });

    it('should set return on getPageItems function', () => {
        const page = 1;
        component.searchForm.controls.searchString.setValue('mock');
        component.searchForm.controls.filterOption.setValue('service');

        component.getPageItems(page);
    });

    it('should have a openDialog function', () => {
        component.openDialog();
        expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should have a drawerClose function', async () => {
        const spy = spyOn(component.drawer, 'close');
        await component.drawerClose();
        expect(spy).toHaveBeenCalled();
    });

    it('should have a selectedItems function', async () => {
        const spy = spyOn(component.drawer, 'open');
        const key = 'mock';

        await component.selectedItems(key);
        expect(spy).toHaveBeenCalled();
    });

    it('should have a deleteDialog function', () => {
        const key = 'mock';
        component.searchForm.controls.searchString.setValue('mock');

        component.deleteDialog(key);
        expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should have a deleteDialog function', () => {
        const key = 'mock';
        component.searchForm.controls.searchString.setValue('');
        component.deleteDialog(key);
    });
});
