import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';

// ng-mocks
import { MockModule } from 'ng-mocks';

// modules
import { OpsDashSharedModule } from '@picpay/ops-dash/shared';

describe('HelpComponent', () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(OpsDashSharedModule)],
            declarations: [HelpComponent],
            providers: [],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
