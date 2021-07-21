import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AutoTrimDirective } from './auto-trim.directive';

@Component({
    template: `
        <input #firstInput type="text" sellerPanelAutoTrim value=" Test" />
        <input #secondInput type="text" sellerPanelAutoTrim value="    " />
        <input #thirdInput type="text" sellerPanelAutoTrim value="" />
    `,
})
class TestComponent {}

describe('AutoTrimDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: AutoTrimDirective;
    let inputsWithAutoTrim: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [AutoTrimDirective, TestComponent],
        }).createComponent(TestComponent);

        inputsWithAutoTrim = fixture.debugElement.queryAll(By.directive(AutoTrimDirective));

        fixture.detectChanges();
    });

    it('should create an instance', () => {
        directive = new AutoTrimDirective(inputsWithAutoTrim[0]);
        expect(directive).toBeTruthy();
    });

    it('should have three sellerPanelAutoTrim elements', () => {
        expect(inputsWithAutoTrim.length).toBe(3);
    });

    it('should trim value', () => {
        const inputMock = inputsWithAutoTrim[0];

        directive = new AutoTrimDirective(inputMock);

        directive.onKeyUp(inputMock.nativeElement);

        expect(fixture.debugElement.queryAll(By.directive(AutoTrimDirective))[0].nativeElement.value).toEqual('Test');
    });

    it('should reset when input value is only spaces', () => {
        const inputMock = inputsWithAutoTrim[1];

        directive = new AutoTrimDirective(inputMock);

        directive.onKeyUp(inputMock.nativeElement);

        expect(fixture.debugElement.queryAll(By.directive(AutoTrimDirective))[1].nativeElement.value).toEqual('');
    });

    it('should empty input value when input dont have value', () => {
        const inputMock = inputsWithAutoTrim[2];

        directive = new AutoTrimDirective(inputMock);

        directive.onKeyUp(inputMock.nativeElement);

        expect(fixture.debugElement.queryAll(By.directive(AutoTrimDirective))[2].nativeElement.value).toEqual('');
    });
});
