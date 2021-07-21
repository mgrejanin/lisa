import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { LayoutsModule } from '@picpay/ui/layouts';

import { GrowthDashLayoutComponent } from './growth-dash-layout.component';

describe('GrowthDashLayoutComponent', () => {
    let component: GrowthDashLayoutComponent;
    let fixture: ComponentFixture<GrowthDashLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(LayoutsModule)],
            declarations: [GrowthDashLayoutComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowthDashLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
