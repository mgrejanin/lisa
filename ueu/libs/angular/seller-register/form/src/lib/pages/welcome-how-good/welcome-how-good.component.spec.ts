import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockComponents } from 'ng-mocks';
import { StaticContentComponent } from '../../components/static-content/static-content.component';
import { WelcomeHowGoodComponent } from './welcome-how-good.component';

describe('WelcomeHowGoodComponent', () => {
    let component: WelcomeHowGoodComponent;
    let fixture: ComponentFixture<WelcomeHowGoodComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, RouterTestingModule],
            declarations: [WelcomeHowGoodComponent, MockComponents(StaticContentComponent)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WelcomeHowGoodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return correct router on button click', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button')).nativeElement as HTMLButtonElement;

        expect(btnContinue.textContent.trim()).toEqual('Continuar');
        btnContinue.click();

        const routerLink = btnContinue.getAttribute('ng-reflect-router-link');
        expect(routerLink).toBe('/form/dicas');
    });
});
