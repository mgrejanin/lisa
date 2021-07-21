import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

import { CpfCnpjPipe, CpfPipe } from '@picpay/angular/shared/pipes';
import { MockedDebugElement, ngMocks } from 'ng-mocks';

import { CpfCnpjFormatterDirective } from './cpf-cnpj-formatter.directive';

@Component({
    template: `<form>
        <input id="blankInput" type="number" [formControl]="control" sellerPanelCpfCnpjFormatter />
    </form>`,
})
class TestComponent {
    form: FormGroup;
    control: FormControl;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            document: [''],
        });

        this.control = this.formBuilder.control('');
    }
}

// TODO: descomentar estes testes quando resolvido o problema com NgControl
describe('CpfCnpjFormatterDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: MockedDebugElement;
    // let directive: CpfCnpjFormatterDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CpfCnpjFormatterDirective, TestComponent],
            providers: [CpfCnpjPipe, CpfPipe, { provide: NgControl }],
            imports: [FormsModule, ReactiveFormsModule],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = ngMocks.find(fixture, '#blankInput');
        // directive = ngMocks.findInstance(component, CpfCnpjFormatterDirective);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should format CNPJ value on keyup', () => {
    //     // const blankComponent = ngMocks.find(fixture, '#blankInput');
    //     // const directive = ngMocks.findInstance(blankComponent, CpfCnpjFormatterDirective);

    //     const keyUpSpy = jest.spyOn(directive, 'onKeyUp');
    //     const nonFormattedValue = '18348524000133';
    //     const formattedValue = '18.348.524/0001-33';

    //     const keyUpEvent = {
    //         target: {
    //             value: nonFormattedValue,
    //         },
    //         preventDefault: () => {
    //             //
    //         },
    //     };

    //     component.triggerEventHandler('keyup', keyUpEvent);
    //     fixture.detectChanges();

    //     expect(keyUpSpy).toHaveBeenCalledWith(keyUpEvent.target.value);
    //     expect(component.nativeElement.value).toEqual(formattedValue);
    // });

    // it('should format CNPJ value on blur', () => {
    //     const blankComponent = ngMocks.find(fixture, '#blankInput');
    //     const directive = ngMocks.findInstance(blankComponent, CpfCnpjFormatterDirective);

    //     const keyUpSpy = jest.spyOn(directive, 'onBlur');
    //     const nonFormattedValue = '18348524000133';
    //     const formattedValue = '18.348.524/0001-33';

    //     const blurEvent = {
    //         target: {
    //             value: nonFormattedValue,
    //         },
    //         preventDefault: () => {
    //             //
    //         },
    //     };

    //     blankComponent.triggerEventHandler('blur', blurEvent);
    //     fixture.detectChanges();

    //     expect(keyUpSpy).toHaveBeenCalledWith(blurEvent.target.value);
    //     expect(blankComponent.nativeElement.value).toEqual(formattedValue);
    // });

    // it('should format CPF value on keyup', () => {
    //     const blankComponent = ngMocks.find(fixture, '#blankInput');
    //     const directive = ngMocks.findInstance(blankComponent, CpfCnpjFormatterDirective);

    //     const keyUpSpy = jest.spyOn(directive, 'onKeyUp');
    //     const nonFormattedValue = '83950784047';
    //     const formattedValue = '839.507.840-47';

    //     const keyUpEvent = {
    //         target: {
    //             value: nonFormattedValue,
    //         },
    //         preventDefault: () => {
    //             //
    //         },
    //     };

    //     blankComponent.triggerEventHandler('keyup', keyUpEvent);
    //     fixture.detectChanges();

    //     expect(keyUpSpy).toHaveBeenCalledWith(keyUpEvent.target.value);
    //     expect(blankComponent.nativeElement.value).toEqual(formattedValue);
    // });

    // it('should format CPF value on blur', () => {
    //     const blankComponent = ngMocks.find(fixture, '#blankInput');
    //     const directive = ngMocks.findInstance(blankComponent, CpfCnpjFormatterDirective);

    //     const keyUpSpy = jest.spyOn(directive, 'onBlur');
    //     const nonFormattedValue = '83950784047';
    //     const formattedValue = '839.507.840-47';

    //     const blurEvent = {
    //         target: {
    //             value: nonFormattedValue,
    //         },
    //         preventDefault: () => {
    //             //
    //         },
    //     };

    //     blankComponent.triggerEventHandler('blur', blurEvent);
    //     fixture.detectChanges();

    //     expect(keyUpSpy).toHaveBeenCalledWith(blurEvent.target.value);
    //     expect(blankComponent.nativeElement.value).toEqual(formattedValue);
    // });

    // it('should format CNPJ value on paste', () => {
    //     // procurando o componente, depois a diretiva nele.
    //     // se não achar, já vai dar erro.
    //     const blankComponent = ngMocks.find(fixture, '#blankInput');
    //     const directive = ngMocks.findInstance(blankComponent, CpfCnpjFormatterDirective);

    //     // spy na função para ter certeza que chamou a correta
    //     const pasteSpy = jest.spyOn(directive, 'onPaste');

    //     // usa esse pra simular o evento
    //     const nonFormattedValue = '35282008400020';

    //     // usa esse para comparar no final
    //     const formattedValue = '35.282.008/4000-20';

    //     // criando o evento de paste
    //     const pasteEvent = {
    //         target: {
    //             value: null,
    //         },
    //         clipboardData: {
    //             types: ['text/plain'],
    //             getData() {
    //                 return nonFormattedValue;
    //             },
    //         },
    //         preventDefault: () => {
    //             //
    //         },
    //     };

    //     // trigger no evento para disparar a função
    //     blankComponent.triggerEventHandler('paste', pasteEvent);

    //     // ativar o change detection pra mudar o valor do input
    //     fixture.detectChanges();

    //     // vejo se o evento foi chamado e se
    //     // o valor foi alterado no input.
    //     expect(pasteSpy).toHaveBeenCalledWith(pasteEvent);
    //     expect(blankComponent.nativeElement.value).toEqual(formattedValue);

    //     // @TO DO: Teste as outras funções dessa forma e documente isso para a nossa wiki
    // });

    // it('should format CPF value on paste', () => {
    //     // procurando o componente, depois a diretiva nele.
    //     // se não achar, já vai dar erro.
    //     const blankComponent = ngMocks.find(fixture, '#blankInput');
    //     const directive = ngMocks.findInstance(blankComponent, CpfCnpjFormatterDirective);

    //     // spy na função para ter certeza que chamou a correta
    //     const pasteSpy = jest.spyOn(directive, 'onPaste');

    //     // usa esse pra simular o evento
    //     const nonFormattedValue = '83950784047';

    //     // usa esse para comparar no final
    //     const formattedValue = '839.507.840-47';

    //     // criando o evento de paste
    //     const pasteEvent = {
    //         target: {
    //             value: null,
    //         },
    //         clipboardData: {
    //             types: ['text/plain'],
    //             getData() {
    //                 return nonFormattedValue;
    //             },
    //         },
    //         preventDefault: () => {
    //             //
    //         },
    //     };

    //     // trigger no evento para disparar a função
    //     blankComponent.triggerEventHandler('paste', pasteEvent);

    //     // ativar o change detection pra mudar o valor do input
    //     fixture.detectChanges();

    //     // vejo se o evento foi chamado e se
    //     // o valor foi alterado no input.
    //     expect(pasteSpy).toHaveBeenCalledWith(pasteEvent);
    //     expect(blankComponent.nativeElement.value).toEqual(formattedValue);

    //     // @TO DO: Teste as outras funções dessa forma e documente isso para a nossa wiki
    // });
});
