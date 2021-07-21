import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';
import { WelcomeTipsComponent } from './welcome-tips.component';

describe('WelcomeTipsComponent', () => {
    let component: WelcomeTipsComponent;
    let stepService: StepService;
    let fixture: ComponentFixture<WelcomeTipsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WelcomeTipsComponent],
            imports: [DesignSystemAngularModule, RouterTestingModule],
            providers: [{ provide: StepService, useClass: StepServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeTipsComponent);
        stepService = TestBed.inject(StepService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have ngOnInit', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        const stepMock = {
            headerTitle: 'Dicas para o cadastro',
            activateProgressbar: false,
        };

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(stepMock);
    });

    it('Should create an H1 with the text', () => {
        const title = fixture.debugElement.query(By.css('h1')).nativeElement as HTMLHeadingElement;
        expect(title.textContent.trim()).toEqual('Dicas para o cadastro');
    });

    it('Should create description', () => {
        const description = fixture.debugElement.query(By.css('.c-section__body-description'))
            .nativeElement as HTMLParagraphElement;
        expect(description.textContent.trim()).toEqual(
            `Antes de começar, confira alguns requisitos essenciais para abrir sua conta aqui no PicPay Empresas:`,
        );
    });

    it('should create tips company', () => {
        const titleH5 = fixture.debugElement.query(By.css('.c-section__card-content--company > .c-section__card-title'))
            .nativeElement as HTMLHeadingElement;
        expect(titleH5.textContent.trim()).toEqual('Sua empresa deve ter um CNPJ válido');

        const illustration = fixture.debugElement.query(By.css('.c-section__card-content--company > img'))
            .nativeElement as HTMLImageElement;
        expect(illustration.src).toContain('assets/seller-register/images/bag-icon.svg');
    });

    it('should create tips information', () => {
        const titleH5 = fixture.debugElement.query(
            By.css('.c-section__card-content--informations > .c-section__card-title'),
        ).nativeElement as HTMLHeadingElement;
        expect(titleH5.textContent.trim()).toEqual(
            'As informações cadastradas devem ser da pessoa responsável legal pela empresa',
        );

        const illustration = fixture.debugElement.query(By.css('.c-section__card-content--informations > img'))
            .nativeElement as HTMLImageElement;
        expect(illustration.src).toContain('assets/seller-register/images/user-icon.svg');
    });

    it('Should create text footer', () => {
        const footerDescription = fixture.debugElement.query(By.css('.c-footer__description'))
            .nativeElement as HTMLElement;
        expect(footerDescription.textContent.trim()).toEqual(
            'Clicando em Começar o cadastro, você concorda com nossa política de privacidade e contrato.',
        );

        const linkPrivacyPolicy = fixture.debugElement.query(By.css('.c-footer__link--privacy'))
            .nativeElement as HTMLAnchorElement;
        expect(linkPrivacyPolicy.href.trim()).toEqual('https://picpay.com/site/privacidade');

        const linkContract = fixture.debugElement.query(By.css('.c-footer__link--contract'))
            .nativeElement as HTMLAnchorElement;
        expect(linkContract.href.trim()).toEqual('https://picpay.com/app_webviews/terms_biz/');
    });

    it('should next button', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const btnContinueElement = btnContinue.nativeElement as HTMLButtonElement;

        // checking text
        expect(btnContinueElement.textContent.trim()).toEqual('Começar o cadastro');

        // checking route
        const routerLink = btnContinueElement.getAttribute('ng-reflect-router-link');
        expect(routerLink).toBe('/form/responsavel');
    });
});
