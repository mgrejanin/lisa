import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MockModule } from 'ng-mocks';

import { GrowthDashSharedModule } from '@picpay/growth-dash/shared';
import { CampaignsListComponent } from './campaigns-list.component';

describe('CampaignsListComponent', () => {
    let component: CampaignsListComponent;
    let fixture: ComponentFixture<CampaignsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CampaignsListComponent],
            imports: [MockModule(MatSidenavModule), MockModule(GrowthDashSharedModule)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CampaignsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
