import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserDropdownComponent } from './user-dropdown.component';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('UserDropdownComponent', () => {
    let component: UserDropdownComponent;
    let fixture: ComponentFixture<UserDropdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatMenuModule), MockModule(MatIconModule)],
            declarations: [UserDropdownComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display an text (or not)', () => {
        component.username = null;
        component.accountChange = false;
        fixture.detectChanges();

        let textUsername = fixture.debugElement.query(By.css('.c-user-dropdown__user-header-name'));
        expect(textUsername).toBe(null);

        let textAccount = fixture.debugElement.query(By.css('.c-user-dropdown__link-account'));
        expect(textAccount).toBe(null);

        component.username = 'mockUsername';
        component.accountChange = true;
        fixture.detectChanges();

        textUsername = fixture.debugElement.query(By.css('.c-user-dropdown__user-header-name'));
        expect(textUsername).toBeDefined();
        expect(textUsername).not.toBe(null);
        expect(textUsername.nativeElement.textContent).toBe(component.username);

        textAccount = fixture.debugElement.query(By.css('.c-user-dropdown__link-account'));
        expect(textAccount).toBeDefined();
        expect(textAccount).not.toBe(null);
        expect(textAccount.nativeElement.textContent.trim()).toBe('Mudar de conta');
    });

    it('should have image default value', () => {
        expect(component.userImage).toEqual('/assets/ui/header/profile_default.svg');
    });

    it('should emit event on click on "Mudar de conta"', () => {
        component.accountChange = true;
        fixture.detectChanges();

        const spy = jest.spyOn(component.changeProfile, 'emit');
        const changeAccountBtn = fixture.debugElement.query(By.css('.c-user-dropdown__link-account')).nativeElement;
        changeAccountBtn.click();

        expect(spy).toHaveBeenCalled();
    });
});
