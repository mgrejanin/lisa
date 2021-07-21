import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ShipmentComponent } from './shipment.component';
import { MockComponent, MockModule } from 'ng-mocks';
import { MatIcon } from '@angular/material/icon';

describe('ShipmentComponent', () => {
    let component: ShipmentComponent;
    let fixture: ComponentFixture<ShipmentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MockModule(DesignSystemAngularModule), RouterTestingModule],
            declarations: [ShipmentComponent, MockComponent(MatIcon)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShipmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
