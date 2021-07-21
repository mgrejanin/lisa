import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MockComponents } from 'ng-mocks';

import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';

import { StaticContentComponent } from '../../components/static-content/static-content.component';
import { RegisterCompletedComponent } from './register-completed.component';

describe('RegisterCompletedComponent', () => {
    let component: RegisterCompletedComponent;
    let fixture: ComponentFixture<RegisterCompletedComponent>;

    let stepService: StepService;

    const mockStep = {
        headerTitle: 'Cadastro concluído',
        valueProgressBar: 10,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterCompletedComponent, MockComponents(StaticContentComponent)],
            imports: [DesignSystemAngularModule],
            providers: [{ provide: StepService, useClass: StepServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterCompletedComponent);
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
