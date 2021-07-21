import { TestBed } from '@angular/core/testing';
import { CoreDataAccessConfig } from './core-data-access.config';
import { CoreDataAccessModule } from './core-data-access.module';
import { CoreDataAccessService } from './core-data-access.service';

const coreConfig: CoreDataAccessConfig = {
    apiUrl: 'testUrl',
};

describe('CoreDataAccessService', () => {
    let coreDataAccessConfigService: CoreDataAccessService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CoreDataAccessModule.forRoot(coreConfig)],
        }).compileComponents();

        coreDataAccessConfigService = TestBed.inject(CoreDataAccessService);
    });

    it('should create', () => {
        expect(coreDataAccessConfigService).toBeDefined();
    });

    it('should have getConfig function', () => {
        const config = coreDataAccessConfigService.getConfig();

        expect(config).toEqual(coreConfig);
    });
});
