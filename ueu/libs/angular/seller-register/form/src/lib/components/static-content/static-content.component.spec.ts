import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { StaticContentComponent } from './static-content.component';

describe('StaticContentComponent', () => {
    let component: StaticContentComponent;
    let fixture: ComponentFixture<StaticContentComponent>;

    const mockData = {
        title: 'Que bom ter você no PicPay Empresas!',
        firstParagraph:
            'O PicPay Empresas é a solução pra todo tipo de empresa, que tem CNPJ, receber e controlar pagamentos.',
        secondParagraph: 'Aproveite: estamos com as taxas zeradas por 30 dias.',
        illustration: 'assets/seller-register/images/welcome.svg',
        illustrationAlt: 'Uma ilustração com 2 pessoas segurando um celular',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StaticContentComponent],
            imports: [DesignSystemAngularModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StaticContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a title @Input()', () => {
        component.title = 'Que bom ter você no PicPay Empresas!';

        expect(component.title).toBeDefined();
        expect(component.title).toMatch(mockData.title);
    });

    it('should have the responsiveTitle class applied', () => {
        component.responsiveTitle = true;
        fixture.detectChanges();

        const title: HTMLElement = fixture.debugElement.query(By.css('.static-content__title')).nativeElement;
        expect(title.classList).toContain('static-content__title--responsive');
    });

    it('should have a firstParagraph @Input()', () => {
        component.firstParagraph =
            'O PicPay Empresas é a solução pra todo tipo de empresa, que tem CNPJ, receber e controlar pagamentos.';

        expect(component.firstParagraph).toBeDefined();
        expect(component.firstParagraph).toMatch(mockData.firstParagraph);
    });

    it('should have a secondParagraph @Input()', () => {
        component.secondParagraph = 'Aproveite: estamos com as taxas zeradas por 30 dias.';

        expect(component.secondParagraph).toBeDefined();
        expect(component.secondParagraph).toMatch(mockData.secondParagraph);
    });

    it('should have the fontWeight prop set to bold on the second paragraph', () => {
        component.boldParagraph = true;
        fixture.detectChanges();

        const paragraphs = fixture.debugElement.queryAll(By.css('.static-content__paragraph'));
        const secondParagraph = paragraphs[1].nativeElement;

        expect(secondParagraph.fontWeight).toBe('bold');
    });

    it('should have a illustration @Input()', () => {
        component.illustration = 'assets/seller-register/images/welcome.svg';

        expect(component.illustration).toBeDefined();
        expect(component.illustration).toMatch(mockData.illustration);
    });

    it('should have a illustrationAlt @Input()', () => {
        component.illustrationAlt = 'Uma ilustração com 2 pessoas segurando um celular';

        expect(component.illustrationAlt).toBeDefined();
        expect(component.illustrationAlt).toMatch(mockData.illustrationAlt);
    });
});
