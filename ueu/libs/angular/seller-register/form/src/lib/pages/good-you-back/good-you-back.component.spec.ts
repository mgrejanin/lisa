import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockComponents } from 'ng-mocks';
import { StaticContentComponent } from '../../components/static-content/static-content.component';
import { of } from 'rxjs';
import { FirstNamePipe } from '../../pipes/first-name/first-name.pipe';
import { GoodYouBackComponent } from './good-you-back.component';

describe('GoodYouBackComponent', () => {
    let component: GoodYouBackComponent;
    let fixture: ComponentFixture<GoodYouBackComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, RouterTestingModule],
            declarations: [GoodYouBackComponent, FirstNamePipe, MockComponents(StaticContentComponent)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GoodYouBackComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should click button continue registration', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'))
            .nativeElement as HTMLButtonElement;

        expect(btnContinue.textContent.trim()).toEqual('Continuar cadastro');
        btnContinue.click();
    });

    it('should click button start new registration', () => {
        const btnReset = fixture.debugElement.query(By.css('.c-footer__button--reset'))
            .nativeElement as HTMLButtonElement;

        expect(btnReset.textContent.trim()).toEqual('Iniciar novo cadastro');
        btnReset.click();
    });

    it('should call continueRegistration() funtion', () => {
        const routerSpy = spyOn(router, 'navigate');
        Object.defineProperty(component, 'step$', { value: of(1) });

        fixture.detectChanges();
        component['continueRegistration']();

        expect(routerSpy).toHaveBeenLastCalledWith(['/form/responsavel']);
    });
});
