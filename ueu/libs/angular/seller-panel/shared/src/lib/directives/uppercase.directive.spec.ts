import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { UppercaseDirective } from './uppercase.directive';

@Component({
    template: `
        <input #firstInput type="text" sellerPanelUppercase value="sample" />
        <input #secondInput type="text" sellerPanelUppercase value="test" />
    `,
})
class TestComponent {}

describe('UppercaseDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: UppercaseDirective;
    let inputsWithUppercase: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [UppercaseDirective, TestComponent],
        }).createComponent(TestComponent);

        inputsWithUppercase = fixture.debugElement.queryAll(By.directive(UppercaseDirective));
    });

    it('should create an instance', () => {
        directive = new UppercaseDirective(inputsWithUppercase[0]);
        expect(directive).toBeTruthy();
    });

    it('should have two sellerPanelNumeric elements', () => {
        expect(inputsWithUppercase.length).toBe(2);
    });

    it('should uppercase input value', () => {
        directive = new UppercaseDirective(inputsWithUppercase[0]);

        directive.onInput('test');

        expect(fixture.debugElement.queryAll(By.directive(UppercaseDirective))[0].nativeElement.value).toEqual('TEST');

        directive.onBlur('12d34f');

        expect(fixture.debugElement.queryAll(By.directive(UppercaseDirective))[0].nativeElement.value).toEqual(
            '12D34F',
        );
    });
});
