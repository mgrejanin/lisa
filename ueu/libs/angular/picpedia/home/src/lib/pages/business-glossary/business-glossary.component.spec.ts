// ng-mocks
import { MockModule } from 'ng-mocks';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
// modules
import { BusinessGlossaryModule } from '../business-glossary/business-glossary.module';
import { BreadcrumbService, BreadcrumbsServiceMock, SharedModule } from '@picpay/picpedia/shared';

import { CardsModule } from '../../components/cards/cards.module';
import { BusinessGlossaryComponent } from './business-glossary.component';

describe('BusinessGlossaryComponent', () => {
    let component: BusinessGlossaryComponent;
    let fixture: ComponentFixture<BusinessGlossaryComponent>;
    let breadcrumbsService: BreadcrumbService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule.withRoutes([]),
                MockModule(BusinessGlossaryModule),
                MockModule(CardsModule),
                MockModule(SharedModule),
            ],
            declarations: [BusinessGlossaryComponent],
            providers: [{ provide: BreadcrumbService, useClass: BreadcrumbsServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BusinessGlossaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        breadcrumbsService = TestBed.inject(BreadcrumbService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a cardsGlossary on init', () => {
        expect(component.cardsGlossary).toBeTruthy();
    });

    it('should have a titleGlossary on init', () => {
        expect(component.titleGlossary).toBeTruthy();
    });

    it('should have updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });
});
