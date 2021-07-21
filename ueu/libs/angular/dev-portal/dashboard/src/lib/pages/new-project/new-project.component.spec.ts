import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule, projectMock, ProjectsService } from '@picpay/dev-portal/shared';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { AvatarComponent } from '../../components/avatar/avatar.component';
import { NewProjectComponent } from './new-project.component';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { of } from 'rxjs';
import { UiComponentsModule } from '@picpay/ui/components';
import { InfoStepsMobileComponent } from '../../components/info-steps-mobile/info-steps-mobile.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { Router } from '@angular/router';

describe('NewProjectComponent', () => {
    let component: NewProjectComponent;
    let fixture: ComponentFixture<NewProjectComponent>;
    let service: ProjectsService;

    const keycloakConfig: PicpayKeycloakConfig = {
        clientId: 'test_dev-portal',
        realm: 'dev-portal',
        url: 'http://test.com/auth/',
        onLoad: 'check-sso',
        withCallback: true,
        notAllowedRouteRedirectTo: '/',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewProjectComponent, ProjectDetailsComponent, AvatarComponent, InfoStepsMobileComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'projeto/26/teste',
                        component: ProjectDetailsComponent,
                    },
                ]),
                DesignSystemAngularModule,
                DevPortalSharedModule,
                MatDialogModule,
                HttpClientTestingModule,
                UiComponentsModule,
                PicpayKeycloakModule.forRoot(keycloakConfig),
            ],
            providers: [
                ProjectsService,
                { provide: NotificationsService, useValue: new MockNotificationsService({}) },
                { provide: MatDialog, useValue: {} },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa', apiKey: '123' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewProjectComponent);
        service = TestBed.inject(ProjectsService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an onSubmit function', async () => {
        const form = component.newProjectForm;
        const serviceSpy = spyOn(service, 'createProject').and.returnValue(of(projectMock));
        const spy = spyOn(component, 'onSubmit');

        expect(form.invalid).toBeTruthy();
        expect(serviceSpy).not.toHaveBeenCalled();

        fixture.detectChanges();

        component.newProjectForm.patchValue({
            name: projectMock.name,
            description: projectMock.description,
            image: projectMock.image,
            favorite: projectMock.favorite,
        });

        component.onSubmit();

        expect(spy).toBeCalled();

        service.createProject(projectMock).subscribe(result => result);

        expect(serviceSpy).toHaveBeenCalledWith(projectMock);
    });

    it('should have an setAvatar function', async () => {
        const form = component.newProjectForm;
        expect(form.controls.image.value).toEqual('');
        component.setAvatar(projectMock.image);
        expect(form.controls.image.value).toEqual(projectMock.image);
    });

    it('should have an getInitials function', async () => {
        const form = component.newProjectForm;
        expect(form.controls.name.value).toEqual('');
        const response = component.getInitials(projectMock.name);
        expect(response).toEqual('TN');
    });

    it('should call Router.navigateByUrl("projeto/:slug") with the SLUG of the project', inject(
        [Router],
        (router: Router) => {
            component.projects = [projectMock];
            const spy = spyOn(router, 'navigateByUrl');
            component.cancel();
            const url = spy.calls.first().args[0];
            expect(url).toBe('/dashboard/projeto/teste-name');
        },
    ));
});
