import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeCertificationComponent } from './badge-certification.component';

// modules
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('BadgeCertificationComponent', () => {
    let component: BadgeCertificationComponent;
    let fixture: ComponentFixture<BadgeCertificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, RouterTestingModule.withRoutes([])],
            declarations: [BadgeCertificationComponent],
            providers: [],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeCertificationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize required @input with default values', () => {
        expect(component.badgeLabel).toBeUndefined();
    });

    it('should have an badge row', () => {
        component.badgeLabel = 'mockBadge';
        fixture.detectChanges();

        const badgeRow = fixture.debugElement.query(By.css('.c-badge-certification__item'));
        expect(badgeRow.nativeElement.textContent.trim()).toBe(component.badgeLabel);
        expect(badgeRow).toBeTruthy();
    });
});
