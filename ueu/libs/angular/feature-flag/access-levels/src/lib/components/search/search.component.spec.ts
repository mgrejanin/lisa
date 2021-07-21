import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SearchComponent],
            imports: [MockModule(MatIconModule), MockModule(MatFormFieldModule), MockModule(MatInputModule)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a update function', () => {
        const emitSpy = spyOn(component.updateFilter, 'emit');

        const mockData = 'mockText';

        component.update(mockData);

        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith(mockData);
    });

    // TEMPLATE
    it('should label title', () => {
        const label = fixture.debugElement.query(By.css('.o-filter__label'));

        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toEqual('Buscar');
    });

    it('should input field', () => {
        const input = fixture.debugElement.query(By.css('.o-filter__input'));

        expect(input).not.toBeNull();
        expect(input.name).toEqual('input');
    });

    it('should have filter input', () => {
        const input = fixture.debugElement.query(By.css('.o-filter__input'));

        expect(input).not.toBeNull();

        const filterSpy = spyOn(component, 'update');

        input.triggerEventHandler('keyup', { target: { value: 'mockValue' } });

        expect(filterSpy).toHaveBeenCalledWith('mockValue');
    });

    it('should display the provided icon', () => {
        const icon = fixture.debugElement.query(By.css('.o-filter__icon'));
        expect(icon).not.toBeNull();
        expect(icon.nativeElement.textContent).toEqual('search');
    });
});
