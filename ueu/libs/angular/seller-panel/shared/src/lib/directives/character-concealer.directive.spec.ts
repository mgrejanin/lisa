import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CharacterConcealerDirective } from './character-concealer.directive';

@Component({
    template: `
        <input #firstInput type="text" sellerPanelCharacterConcealer value="Test sample" />
        <input #secondInput type="text" sellerPanelCharacterConcealer="6" value="This is a sample" />
    `,
})
class TestComponent {}

describe('CharacterConcealerDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: CharacterConcealerDirective;
    let inputsWithCharacterConcealer: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [CharacterConcealerDirective, TestComponent],
        }).createComponent(TestComponent);

        inputsWithCharacterConcealer = fixture.debugElement.queryAll(By.directive(CharacterConcealerDirective));
    });

    it('should create an instance', () => {
        directive = new CharacterConcealerDirective(inputsWithCharacterConcealer[0]);
        expect(directive).toBeTruthy();
    });

    it('should have two sellerPanelAutoTrim elements', () => {
        expect(inputsWithCharacterConcealer.length).toBe(2);
    });

    it('should have onInit function', () => {
        directive = new CharacterConcealerDirective(inputsWithCharacterConcealer[0]);
        const concealerSpy = spyOn(directive, 'concealer');

        directive.ngOnInit();

        expect(concealerSpy).toHaveBeenCalled();
    });

    it('should concealer all after third character when dont have interval param', () => {
        directive = new CharacterConcealerDirective(inputsWithCharacterConcealer[0]);

        directive.concealer();

        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.directive(CharacterConcealerDirective))[0].nativeElement.value).toEqual(
            'Tes* ******',
        );
    });

    it('should concealer after third character next 6 characteres when have interval param', () => {
        directive = new CharacterConcealerDirective(inputsWithCharacterConcealer[1]);

        fixture.detectChanges();

        directive.concealer();

        expect(fixture.debugElement.queryAll(By.directive(CharacterConcealerDirective))[1].nativeElement.value).toEqual(
            'Thi* ** * sample',
        );
    });
});
