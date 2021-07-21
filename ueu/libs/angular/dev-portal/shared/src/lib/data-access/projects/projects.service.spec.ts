import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

import { ProjectsService } from './projects.service';
import { ProjectsStore } from './projects.store';

describe('ProjectsService', () => {
    let service: ProjectsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProjectsService,
                ProjectsStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
                { provide: NotificationsService, useValue: new MockNotificationsService(null) },
            ],
            imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), DesignSystemAngularModule],
            declarations: [],
        });
        service = TestBed.inject(ProjectsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
