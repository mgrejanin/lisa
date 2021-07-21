import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockComponents } from 'ng-mocks';

import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';

import { StaticContentComponent } from '../../components/static-content/static-content.component';

import { AdditionalInformationComponent } from './additional-information.component';

describe('AdditionalInformationComponent', () => {
    let component: AdditionalInformationComponent;
    let fixture: ComponentFixture<AdditionalInformationComponent>;

    let stepService: StepService;

    const mockStep = {
        headerTitle: 'Configurações adicionais',
        valueProgressBar: 0,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdditionalInformationComponent, MockComponents(StaticContentComponent)],
            imports: [RouterTestingModule, DesignSystemAngularModule],
            providers: [{ provide: StepService, useClass: StepServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdditionalInformationComponent);
        component = fixture.componentInstance;

        stepService = TestBed.inject(StepService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoud call the ngOnInit() lifecycle', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(mockStep);
    });
});
