import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConfirmResponseComponent } from './account-confirm-response.component';

describe('AccountConfirmResponseComponent', () => {
    let component: AccountConfirmResponseComponent;
    let fixture: ComponentFixture<AccountConfirmResponseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountConfirmResponseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountConfirmResponseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
