import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
// ng-mocks
import { MockComponents, MockModule } from 'ng-mocks';

import { HeaderComponent } from '../../components/header/header.component';
import { RechargeSolicitationsComponent } from '../../containers/recharge-solicitations/recharge-solicitations.component';
import { RechargesComponent } from './recharges.component';

describe('RechargesComponent', () => {
    let component: RechargesComponent;
    let fixture: ComponentFixture<RechargesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                RechargesComponent,
                MockComponents(HeaderComponent, MatTab, MatTabGroup, RechargeSolicitationsComponent),
            ],
            imports: [
                MockModule(DesignSystemAngularModule),
                MockModule(MatIconModule),
                MockModule(MatTableModule),
                MockModule(MatPaginatorModule),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RechargesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
