import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LogoComponent } from '../logo/logo.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent, LogoComponent],
            imports: [DesignSystemAngularModule, RouterTestingModule, MatIconModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have headerTitle, valueProgressBar, activateProgressbar variables', () => {
        expect(component.headerTitle).toBeDefined();
        expect(component.valueProgressBar).toBeDefined();
        expect(component.activateProgressbar).toBeDefined();
    });

    it('should have goBack function', () => {
        expect(component.goBack).toBeDefined();
    });

    it('should call goBack() function', () => {
        const headerIcon = fixture.debugElement.query(By.css('.c-header__return')).nativeElement;
        headerIcon.click();
    });
});
