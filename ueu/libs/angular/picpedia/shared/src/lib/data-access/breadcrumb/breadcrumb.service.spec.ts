import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';
import { BreadcrumbStore } from './breadcrumb.store';
import { mockBreadcrumbs } from './mocks/breadcrumb.mock';

describe('BreadcrumbService', () => {
    let breadcrumbService: BreadcrumbService;
    let breadcrumbStore: BreadcrumbStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BreadcrumbService, BreadcrumbStore],
            imports: [HttpClientTestingModule],
        });

        breadcrumbService = TestBed.inject(BreadcrumbService);
        breadcrumbStore = TestBed.inject(BreadcrumbStore);
    });

    it('should be created', () => {
        expect(breadcrumbService).toBeDefined();
        expect(breadcrumbStore).toBeDefined();
    });

    it('should have update function', () => {
        expect(breadcrumbService.update).toBeDefined();
    });

    it('should call update from store on update function', () => {
        const updateSpy = spyOn(breadcrumbStore, 'update');

        breadcrumbService.update({ breadcrumbs: mockBreadcrumbs });

        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledWith({ breadcrumbs: mockBreadcrumbs });
    });
});
