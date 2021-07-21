import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
    let component: BadgeComponent;
    let fixture: ComponentFixture<BadgeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BadgeComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize description with valid values', () => {
        component.description = 'badge_test';
        expect(component.description).toBeTruthy();
    });

    it('should display description on c-badge__description', () => {
        component.description = 'badge_test';
        fixture.detectChanges();
        const badgeDescription = fixture.debugElement.query(By.css('.c-badge__description'));
        const badgeDescriptionElement = badgeDescription.nativeElement as HTMLSpanElement;
        expect(badgeDescriptionElement.textContent.trim()).toEqual(component.description);
    });
});
