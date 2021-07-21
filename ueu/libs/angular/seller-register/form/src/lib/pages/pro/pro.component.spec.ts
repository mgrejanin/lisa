import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';

import { ProComponent } from './pro.component';

describe('ProComponent', () => {
    let component: ProComponent;
    let fixture: ComponentFixture<ProComponent>;

    let stepService: StepService;
    let userAgentGetter: jest.SpyInstance;

    const mockStep = {
        headerTitle: 'PicPay Pro',
        activateProgressbar: false,
    };

    // Android device userAgent
    const androidDevice =
        'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko)' +
        'Chrome/80.0.3987.162 Mobile Safari/537.36';

    // iOS device userAgent
    const iosDevice =
        'Mozilla/5.0 (iPod; CPU iPhone OS 12_0 like macOS) AppleWebKit/602.1.50 (KHTML, like' +
        'Gecko) Version/12.0 Mobile/14A5335d Safari/602.1.50';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProComponent],
            imports: [DesignSystemAngularModule, RouterTestingModule],
            providers: [{ provide: StepService, useClass: StepServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProComponent);
        component = fixture.componentInstance;

        stepService = TestBed.inject(StepService);
        userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoud call initStep() on ngOnInit() lifecycle', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(mockStep);
    });

    it('should call defineUrl() method', () => {
        const defineUrlSpy = spyOn(component, 'defineUrl');

        component.ngOnInit();

        expect(defineUrlSpy).toHaveBeenCalled();
    });

    it('should call defineUrl() method and apply androidApp url', () => {
        userAgentGetter.mockReturnValue(androidDevice);

        component.defineUrl();

        expect(component.appUrl).toEqual(component.androidApp);
    });

    it('should call defineUrl() method and apply iosApp url', () => {
        userAgentGetter.mockReturnValue(iosDevice);

        component.defineUrl();

        expect(component.appUrl).toEqual(component.iosApp);
    });
});
