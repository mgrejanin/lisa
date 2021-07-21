import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NumericDirective } from './numeric.directive';

@Component({
    template: `
        <input #firstInput type="text" sellerPanelNumeric value="12345678910" />
        <input #secondInput type="text" sellerPanelNumeric value="test" />
    `,
})
class TestComponent {}

describe('NumericDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: NumericDirective;
    let inputsWithNumeric: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NumericDirective, TestComponent],
        }).createComponent(TestComponent);

        inputsWithNumeric = fixture.debugElement.queryAll(By.directive(NumericDirective));
    });

    it('should create an instance', () => {
        directive = new NumericDirective(inputsWithNumeric[0]);
        expect(directive).toBeTruthy();
    });

    it('should have two sellerPanelNumeric elements', () => {
        expect(inputsWithNumeric.length).toBe(2);
    });

    it('should replace all alphanumeric characteres to empty value', () => {
        directive = new NumericDirective(inputsWithNumeric[0]);

        directive.onKeyUp('12345t678910');

        expect(fixture.debugElement.queryAll(By.directive(NumericDirective))[0].nativeElement.value).toEqual(
            '12345678910',
        );

        directive.onBlur('12d345');

        expect(fixture.debugElement.queryAll(By.directive(NumericDirective))[0].nativeElement.value).toEqual('12345');
    });

    it('should dont replace all alphanumeric when apply is false', () => {
        directive = new NumericDirective(inputsWithNumeric[1]);
        directive.apply = false;

        directive.onKeyUp('this is a test');

        expect(fixture.debugElement.queryAll(By.directive(NumericDirective))[1].nativeElement.value).toEqual('test');

        fixture.detectChanges();

        directive.onBlur('test sample');

        expect(fixture.debugElement.queryAll(By.directive(NumericDirective))[1].nativeElement.value).toEqual('test');
    });
});
