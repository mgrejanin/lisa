import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSpinner } from '@angular/material/progress-spinner';

import { LoadingButtonComponent } from './loading-button.component';

import { MockComponent } from 'ng-mocks';

describe('FeedBackComponent', () => {
    let component: LoadingButtonComponent;
    let fixture: ComponentFixture<LoadingButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoadingButtonComponent, MockComponent(MatSpinner)],
            imports: [],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(LoadingButtonComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have @Input() action', () => {
        expect(component.action).toBeDefined();
        expect(component.action).toBe(true);
    });

    it('should have @Input() class', () => {
        expect(component.class).toBeDefined();
        expect(component.class).toBe(false);
    });

    it('should have @Input() loadingText', () => {
        expect(component.loadingText).toBeDefined();
        expect(component.loadingText).toBe('Carregando...');
    });

    it('should have @Input() normalText', () => {
        expect(component.normalText).toBeDefined();
        expect(component.normalText).toBe('Efetuar ação');
    });

    it('should have @Input() side', () => {
        expect(component.side).toBeDefined();
        expect(component.side).toBe('right');
    });
});
