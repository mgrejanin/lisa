import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockComponents, MockModule } from 'ng-mocks';
import { RangeSliderComponent } from '../../components/range-slider/range-slider.component';
import { StepService } from '../../data-access';
import { StepServiceMock } from '../../data-access/step/step.service.mock';
import { FeesServiceMock } from '../../mocks/fees.service.mock';
import { FeesService } from '../../services/fees/fees.service';
import { FeesComponent } from './fees.component';

describe('FeesComponent', () => {
    let component: FeesComponent;
    let fixture: ComponentFixture<FeesComponent>;
    let stepService: StepService;
    let feesService: FeesService;

    const mockStep = {
        headerTitle: 'Taxas e prazo',
        valueProgressBar: 6,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeesComponent, MockComponents(RangeSliderComponent)],
            imports: [MockModule(DesignSystemAngularModule), HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ showDismissButton: false }),
                },
                { provide: StepService, useClass: StepServiceMock },
                { provide: FeesService, useClass: FeesServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeesComponent);
        component = fixture.componentInstance;
        stepService = TestBed.inject(StepService);
        feesService = TestBed.inject(FeesService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the ngOnInit() lifecycle', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(mockStep);
    });

    it('should create an H1 with the text', () => {
        const title = fixture.debugElement.query(By.css('.c-section__title')).nativeElement as HTMLHeadingElement;
        expect(title.textContent.trim()).toEqual(component.title);
    });

    it('should open dialog when click at the feedback button', () => {
        const openCheckOutDialogSpy = spyOn(component, 'openCheckOutDialog');
        const apolloBtn = fixture.debugElement.query(By.css('apollo-button'));
        const apolloBtnElement = apolloBtn.nativeElement as HTMLButtonElement;

        apolloBtnElement.click();
        fixture.detectChanges();

        expect(openCheckOutDialogSpy).toHaveBeenCalledWith();
    });

    it('should have open openCheckOutDialog dialog', () => {
        const { debugElement } = fixture;

        component.openCheckOutDialog();
        fixture.detectChanges();

        const dialog = debugElement.queryAll(By.css('apollo-dialog'))[0];

        expect(dialog).toBeTruthy();
    });

    it('should call on submit button click', () => {
        const onSubmitSpy = spyOn(component, 'onSubmit');
        const button = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const buttonElement = button.nativeElement as HTMLButtonElement;

        buttonElement.click();
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should postFees and submit tax', () => {
        const postCompanyDataSpy = spyOn(feesService, 'postFees').and.callThrough();
        const routerSpy = spyOn(component['router'], 'navigate').and.returnValue(true);

        component['selectedTax'] = 1;
        component.onSubmit();

        expect(postCompanyDataSpy).toHaveBeenCalledWith({ company_fees: 1 });
        expect(routerSpy).toHaveBeenCalledWith(['/form/taxas']);
    });

    it('should call the selectedValueEvent event seller-register-range-slider', () => {
        const rangeSlider = fixture.debugElement.query(By.css('.range-slider'));
        const selectTaxSpy = spyOn(component, 'selectTax');

        rangeSlider.triggerEventHandler('selectedValueEvent', 1);

        expect(selectTaxSpy).toHaveBeenCalledTimes(1);
        expect(selectTaxSpy).toHaveBeenCalledWith(1);
    });

    it('should call selectTax() function', () => {
        expect(component.selectTax).toBeTruthy();

        component.selectTax(1);
    });
});
