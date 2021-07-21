import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from './logo.component';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

describe('LogoComponent', () => {
    let component: LogoComponent;
    let fixture: ComponentFixture<LogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogoComponent],
            imports: [RouterTestingModule.withRoutes([]), DesignSystemAngularModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
