import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { ChangePanelService } from './change-panel.service';

describe('ChangePanelService', () => {
    let changePanelService: ChangePanelService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        });

        changePanelService = TestBed.inject(ChangePanelService);
    });

    it('should be created', () => {
        expect(changePanelService).toBeTruthy();
    });

    it('should have getForeignPanelUrl function', () => {
        expect(changePanelService.getForeignPanelUrl()).toEqual('http://localhost:4200/');
    });
});
