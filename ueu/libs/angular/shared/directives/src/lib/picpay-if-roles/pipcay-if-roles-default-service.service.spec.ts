import { TestBed } from '@angular/core/testing';
import { PicpayIfRolesDefaultService } from './pipcay-if-roles-default-service.service';

describe('Directive: picpayIfRoles', () => {
    let service: PicpayIfRolesDefaultService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [PicpayIfRolesDefaultService],
        });

        service = TestBed.inject(PicpayIfRolesDefaultService);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should have a getRoles function', () => {
        expect(service.getUserRoles()).toEqual([]);
    });
});
