import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { UiComponentsModule } from '@picpay/ui/components';
import { LayoutsModule } from '@picpay/ui/layouts';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LayoutComponent],
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(UiComponentsModule),
                MockModule(LayoutsModule),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
