import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { By } from '@angular/platform-browser';
import { FeedBackComponent } from './feedback.component';

describe('FeedBackComponent', () => {
    let component: FeedBackComponent;
    let fixture: ComponentFixture<FeedBackComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeedBackComponent],
            imports: [BrowserAnimationsModule],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(FeedBackComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the template', () => {
        const containerFeedBack = fixture.debugElement.query(By.css('.c-container-feedback'));
        const titleFeedBack = fixture.debugElement.query(By.css('.c-container-feedback__title'));
        const descriptionFeedBack = fixture.debugElement.query(By.css('.c-container-feedback__description'));
        const pathFeedBack = fixture.debugElement.query(By.css('.c-container-feedback__image'));

        expect(containerFeedBack).toBeDefined();
        expect(containerFeedBack.styles).toMatchObject({ height: '60vh' });

        expect(titleFeedBack).toBeDefined();
        expect(descriptionFeedBack).toBeDefined();
        expect(pathFeedBack).toBeDefined();
    });

    it('should display context EMPTY_SEARCH', () => {
        component.title = 'Nenhum resultado para sua busca';
        component.description = 'Confira se sua digitação está correta e tente novamente';
        component.imagePath = './assets/images/empty_search.svg';

        fixture.detectChanges();

        const titleFeedBack = fixture.debugElement.query(By.css('.c-container-feedback__title')).nativeElement;
        const descriptionFeedBack = fixture.debugElement.query(By.css('.c-container-feedback__description'))
            .nativeElement;
        const pathFeedBack = fixture.debugElement.query(By.css('.c-container-feedback__image')).nativeElement;

        expect(titleFeedBack.textContent).toContain('Nenhum resultado para sua busca');
        expect(descriptionFeedBack.textContent).toContain('Confira se sua digitação está correta e tente novamente');
        expect(pathFeedBack.getAttribute('src')).toContain('./assets/images/empty_search.svg');
    });
});
