import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

// ng-mocks
import { MockComponents } from 'ng-mocks';

// components
import { MatIcon } from '@angular/material/icon';
import { UserDropdownComponent } from '@picpay/ui/components';

// modules
import { RouterTestingModule } from '@angular/router/testing';

// services
import { AuthService, AuthServiceMock } from '@picpay/feature-flag/auth';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent, MockComponents(MatIcon, UserDropdownComponent)],
            imports: [RouterTestingModule],
            providers: [{ provide: AuthService, useValue: new AuthServiceMock(false) }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        component.showReturnBtn = true;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onReturn function', async () => {
        const router = TestBed.inject(Router);
        const routerSpy = spyOn(router, 'navigate');

        await component.onReturn();

        expect(routerSpy).toHaveBeenLastCalledWith(['../']);
    });

    it('should have onLogoutFunction', () => {
        const auth = TestBed.inject(AuthService);
        const logoutSpy = spyOn(auth, 'logout');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should display return button based on showReturnBtn input', () => {
        let btn = fixture.debugElement.query(By.css('.c-header__return-btn'));

        expect(btn).not.toBeNull();

        const returnSpy = spyOn(component, 'onReturn');
        btn.nativeElement.click();

        expect(returnSpy).toHaveBeenCalledTimes(1);

        component.showReturnBtn = false;
        fixture.detectChanges();

        btn = fixture.debugElement.query(By.css('.c-header__return-btn'));
        expect(btn).toBeNull();
    });

    it('should have userDropdown with logout btn', () => {
        const userDropdown = fixture.debugElement.query(By.css('.c-header__user-dropdown'));
        expect(userDropdown).not.toBeNull();

        const logoutBtn = userDropdown.query(By.css('.c-user-dropdown__menu-button'));
        expect(logoutBtn).not.toBeNull();

        const logoutSpy = spyOn(component, 'onLogout');
        logoutBtn.nativeElement.click();
        expect(logoutSpy).toHaveBeenCalledTimes(1);
    });
});
