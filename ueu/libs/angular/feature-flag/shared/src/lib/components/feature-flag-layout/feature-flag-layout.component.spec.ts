import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFlagLayoutComponent } from './feature-flag-layout.component';

import { RouterTestingModule } from '@angular/router/testing';
import { LayoutsModule } from '@picpay/ui/layouts';
import { MockModule } from 'ng-mocks';

describe('FeatureFlagLayoutComponent', () => {
    let component: FeatureFlagLayoutComponent;
    let fixture: ComponentFixture<FeatureFlagLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeatureFlagLayoutComponent],
            imports: [RouterTestingModule.withRoutes([]), MockModule(LayoutsModule)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeatureFlagLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
