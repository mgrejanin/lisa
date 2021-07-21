import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';
import { LogoComponent } from '../logo/logo.component';
import { ProductsService } from '../../data-access/products/products.service';
import { ProductsServiceMock } from '../../mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EventTracking } from '@picpay/event-tracking';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { MockModule } from 'ng-mocks';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FooterComponent, LogoComponent],
            imports: [RouterTestingModule, MockModule(DesignSystemAngularModule)],
            providers: [
                { provide: ProductsService, useClass: ProductsServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have call eventTracking function', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        const btn_name = 'FOOTER';
        const ctx = 'B2P';
        const page_name = '';
        component.eventTracking(btn_name, ctx);

        expect(evtTracking).toHaveBeenCalledWith('Button Clicked', {
            button_name: `BOTAO_${btn_name}_${ctx}`,
            page_name: `STUDIO_PICPAY${page_name}`,
            context: ctx,
        });
    });
});
