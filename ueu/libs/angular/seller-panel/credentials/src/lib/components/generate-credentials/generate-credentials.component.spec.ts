import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CredentialsService, CredentialsServiceMock, projectMock } from '@picpay/seller-panel/services';
import { MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { GenerateCredentialsComponent } from './generate-credentials.component';

describe('GenerateCredentialsComponent', () => {
    let component: GenerateCredentialsComponent;
    let fixture: ComponentFixture<GenerateCredentialsComponent>;
    let service: CredentialsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, RouterTestingModule, MockModule(DesignSystemAngularModule)],
            declarations: [GenerateCredentialsComponent],
            providers: [
                { provide: CredentialsService, useClass: CredentialsServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenerateCredentialsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(CredentialsService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have createProject function called', () => {
        const onSaveSpy = spyOn(component, 'createProject').and.callThrough();
        component.createProject();
        expect(onSaveSpy).toHaveBeenCalled();
    });

    it('should have and formRef get accessor', () => {
        expect(component.formRef).toBeDefined();
    });

    it('should have form invalid', () => {
        const form = component.form;

        component.createProject();
        fixture.detectChanges();

        form.controls.name.setValue(projectMock.project_name);
        form.controls.url.setValue(projectMock.callback_url);
        form.updateValueAndValidity();

        expect(form.valid).toBeFalsy;
    });

    it('should have an createProject function', () => {
        const form = component.form;
        const projectSpy = spyOn(service, 'saveProjectCredential').and.returnValue(of(projectMock));

        component.createProject();
        fixture.detectChanges();

        form.controls.name.setValue(projectMock.project_name);
        form.controls.url.setValue(projectMock.callback_url);
        form.updateValueAndValidity();

        expect(form.valid).toBeTruthy;

        component.createProject();
        service.saveProjectCredential(projectMock).subscribe(result => result);

        expect(projectSpy).toHaveBeenCalledWith(projectMock);
        expect(component.isLoading).toBeFalsy;
    });

    it('should have error an createProject function', () => {
        const onErrorService = spyOn(service, 'saveProjectCredential').and.returnValue(throwError({ status: 404 }));
        const form = component.form;

        fixture.detectChanges();

        form.controls.name.setValue(projectMock.project_name);
        form.controls.url.setValue(projectMock.callback_url);
        form.updateValueAndValidity();

        component.createProject();
        service.saveProjectCredential(projectMock).subscribe(result => result);
        expect(component.isLoading).toBeFalsy;
        expect(onErrorService).toBeCalled();
    });

    it('should toggle loading button', async () => {
        const button = fixture.debugElement.queryAll(By.css('apollo-button'))[1];
        component.isLoading = true;

        await fixture.whenStable();
        fixture.detectChanges();
        expect(button.attributes['ng-reflect-disabled']).toBeTruthy();
        expect(button.attributes['ng-reflect-loading']).toBeTruthy();
    });
});
