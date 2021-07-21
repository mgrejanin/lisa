import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// interfaces
import { UpdateRoleUserResponse } from '../../models';

// store components
import { UsersService, UsersStore } from '.';

describe('UsersService', () => {
    let usersService: UsersService;

    let configService: CoreDataAccessService;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UsersService,
                UsersStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule],
        });

        usersService = TestBed.inject(UsersService);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(usersService).toBeTruthy();
    });

    it('should have a getUsers function', () => {
        const usersUrl = `${configService.getConfig().apiUrl}/flags/users/search`;

        const mockResponse: UpdateRoleUserResponse[] = [
            { id: 'mockId', name: 'mockTitle', picture: 'mockTitle', role: 'mockRole' },
        ];

        const filter = 'mockFilter';
        usersService.getUsers(filter);

        const request = httpMock.expectOne(usersUrl);
        request.flush(mockResponse);

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual({
            filter: {
                contains: filter,
            },
        });
    });
});
