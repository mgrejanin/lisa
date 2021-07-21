import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PicpayIfRolesService } from './picpay-if-roles.config';
import { PicpayIfRolesDirective } from './picpay-if-roles.directive';
import { PicpayIfRolesServiceMock } from './mocks/picpay-if-roles.service.mock';

// DUMMY COMPONENT
@Component({
    template: `
        <div *picpayIfRoles="['test']">shown</div>
        <div *picpayIfRoles="['testNot']">hidden</div>
    `,
})
class DummyComponent {}

describe('Directive: picpayIfRoles', () => {
    let fixture: ComponentFixture<DummyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [DummyComponent, PicpayIfRolesDirective],
            providers: [{ provide: PicpayIfRolesService, useValue: new PicpayIfRolesServiceMock(['test']) }],
        });

        fixture = TestBed.createComponent(DummyComponent);
        fixture.detectChanges();
    });

    it('should show the component when the user does have the necessary roles', () => {
        const element = fixture.nativeElement;
        expect(element.innerHTML).toContain('shown');
    });

    it('should not show the component when the user does not have the necessary roles', () => {
        const element = fixture.nativeElement;
        expect(element.innerHTML).not.toContain('hidden');
    });
});
