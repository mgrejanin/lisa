import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoTabDirective } from './auto-tab.directive';

@Component({
    template: `
        <input
            #first
            type="text"
            [sellerPanelAutoTab]="second"
            maxlength="10"
            value="This is a simple test to trigger maxlength"
        />
        <input #second type="text" [sellerPanelAutoTab]="third" maxlength="8" disabled value="Sample test" />
        <input #third type="text" [sellerPanelAutoTab]="fourth" />
        <input #fourth type="text" />
    `,
})
class TestComponent {}

describe('AutoTabDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let inputsWithAutoTab: DebugElement[];
    let directive: AutoTabDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [AutoTabDirective, TestComponent],
        }).createComponent(TestComponent);

        directive = new AutoTabDirective();

        fixture.detectChanges();

        inputsWithAutoTab = fixture.debugElement.queryAll(By.directive(AutoTabDirective));
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should have three sellerPanelAutoTab elements', () => {
        expect(inputsWithAutoTab.length).toBe(3);
    });

    it('should throw error when nextInput does not exists', () => {
        expect(() => directive.onInput(inputsWithAutoTab[0].nativeElement)).toThrowError(
            'Next target to tab undefined!',
        );
    });

    it('should auto tab when value length equals to maxLength attribute', () => {
        directive.nextInput = inputsWithAutoTab[0].nativeElement;

        fixture.detectChanges();

        const nextInputFocusedSpy = spyOn(directive.nextInput, 'focus');

        directive.onInput(inputsWithAutoTab[0].nativeElement);

        expect(nextInputFocusedSpy).toHaveBeenCalled();
    });

    it('should auto tab when input is disabled', () => {
        directive.nextInput = inputsWithAutoTab[1].nativeElement;

        fixture.detectChanges();

        const nextInputFocusedSpy = spyOn(directive.nextInput, 'focus');

        directive.onInput(inputsWithAutoTab[1].nativeElement);

        expect(nextInputFocusedSpy).toHaveBeenCalled();
    });

    it('should set to 255 when input does not have maxlengh and disabled attributes', () => {
        directive.nextInput = inputsWithAutoTab[2].nativeElement;

        fixture.detectChanges();

        const nextInputFocusedSpy = spyOn(directive.nextInput, 'focus');

        directive.onInput(inputsWithAutoTab[2].nativeElement);

        expect(nextInputFocusedSpy).not.toHaveBeenCalled();
    });
});
