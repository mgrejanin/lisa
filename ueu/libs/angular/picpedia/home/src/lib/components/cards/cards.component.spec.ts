import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsComponent } from './cards.component';

// modules
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CardsComponent', () => {
    let component: CardsComponent;
    let fixture: ComponentFixture<CardsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, RouterTestingModule.withRoutes([])],
            declarations: [CardsComponent],
            providers: [],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize required @inputs with default values', () => {
        expect(component.title).toBeUndefined();
        expect(component.icon).toBeUndefined();
        expect(component.routerLink).toBeUndefined();
    });

    it('should have an title row', () => {
        component.title = 'mockTitle';
        fixture.detectChanges();

        const titleRow = fixture.debugElement.query(By.css('.c-card__card-title'));
        expect(titleRow.nativeElement.textContent.trim()).toBe(component.title);
        expect(titleRow).toBeTruthy();
    });
});
