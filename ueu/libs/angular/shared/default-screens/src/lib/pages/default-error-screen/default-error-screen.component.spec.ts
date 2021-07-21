import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DefaultErrorScreenComponent } from './default-error-screen.component';
import { DefaultErrorScreenMock } from '../../models/default-error-screen.mock';

describe('DefaultErrorScreenComponent', () => {
    let component: DefaultErrorScreenComponent;
    let fixture: ComponentFixture<DefaultErrorScreenComponent>;

    beforeEach(async(async () => {
        await TestBed.configureTestingModule({
            declarations: [DefaultErrorScreenComponent],
            imports: [RouterTestingModule.withRoutes([]), DesignSystemAngularModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultErrorScreenComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render main page when data is received', () => {
        component.receivedData = DefaultErrorScreenMock;
        fixture.detectChanges();
        const page = fixture.debugElement.query(By.css('.default-error-screen__wrapper'));

        expect(page).not.toBeNull();
    });

    it('should not render main page when data isnt received', () => {
        const page = fixture.debugElement.query(By.css('.default-error-screen__wrapper'));

        expect(page).toBeNull();
    });

    it('should render basic page when data isnt received', () => {
        const page = fixture.debugElement.query(By.css('.default-error-screen__no-data'));

        expect(page).not.toBeNull();
    });

    it('should not render basic page when data is received', () => {
        component.receivedData = DefaultErrorScreenMock;
        fixture.detectChanges();
        const page = fixture.debugElement.query(By.css('.default-error-screen__no-data'));

        expect(page).toBeNull();
    });
});
