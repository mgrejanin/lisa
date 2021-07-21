import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { UiComponentsModule } from '@picpay/ui/components';
import { LayoutsModule, MenuQueryMock } from '@picpay/ui/layouts';

import { MenuQuery } from '@picpay/ui/layouts';

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
                MockModule(MatTooltipModule),
            ],
            providers: [{ provide: MenuQuery, useClass: MenuQueryMock }],
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
