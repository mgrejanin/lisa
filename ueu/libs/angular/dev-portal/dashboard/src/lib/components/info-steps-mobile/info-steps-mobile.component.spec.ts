import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { InfoStepsMobileComponent } from './info-steps-mobile.component';

describe('InfoStepsMobileComponent', () => {
    let component: InfoStepsMobileComponent;
    let fixture: ComponentFixture<InfoStepsMobileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InfoStepsMobileComponent],
            imports: [DesignSystemAngularModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InfoStepsMobileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
