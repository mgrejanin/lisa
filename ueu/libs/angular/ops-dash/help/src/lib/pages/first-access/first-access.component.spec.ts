import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAccessComponent } from './first-access.component';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { OpsDashSharedModule } from '@picpay/ops-dash/shared';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

describe('FirstAccessComponent', () => {
    let component: FirstAccessComponent;
    let fixture: ComponentFixture<FirstAccessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, MockModule(OpsDashSharedModule)],
            declarations: [FirstAccessComponent],
            providers: [],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FirstAccessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a goToConfluence function', () => {
        const spy = spyOn(window, 'open');
        component.goToConfluence();
        expect(spy).toHaveBeenCalled();
    });
});
