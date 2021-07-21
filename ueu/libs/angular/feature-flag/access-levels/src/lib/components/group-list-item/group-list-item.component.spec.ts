// @angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// modules
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// ng-mocks
import { MockModule } from 'ng-mocks';

// components
import { GroupListItemComponent } from './group-list-item.component';

describe('GroupListItemComponent', () => {
    let component: GroupListItemComponent;
    let fixture: ComponentFixture<GroupListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupListItemComponent],
            imports: [MockModule(DesignSystemAngularModule), RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupListItemComponent);
        component = fixture.componentInstance;

        // setting default input values
        component.title = 'mockTitle';
        component.label = 'mockLabel';
        component.iconName = 'mockIconName';
        component.link = 'mockLink';
        component.id = 'mockId';
        component.active = true;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TEMPLATE
    it('should set routerLink', () => {
        const container = fixture.debugElement.query(By.css('.c-group-list-item__container'));
        expect(container.properties.href).toEqual(`/${component.link}`);
    });

    it('should set provided id', () => {
        const container = fixture.debugElement.query(By.css('.c-group-list-item__container'));
        expect(container.properties.id).toEqual(component.id);
    });

    it('should set active class based on active input value', () => {
        const container = fixture.debugElement.query(By.css('.c-group-list-item__container'));
        expect(container.classes.active).toBeTruthy();

        component.active = false;
        fixture.detectChanges();

        expect(container.classes.active).toBeFalsy();
    });

    it('should display the provided icon', () => {
        const icon = fixture.debugElement.query(By.css('apollo-icon'));
        expect(icon).not.toBeNull();
        expect(icon.attributes.size).toEqual('md');
        expect(icon.attributes['ng-reflect-svg-icon']).toEqual(component.iconName);
    });

    it('should not display label (if it is not provided)', () => {
        component.label = null;
        fixture.detectChanges();
        const label = fixture.debugElement.query(By.css('.c-group-list-item__description span'));

        expect(label).toBeNull();
    });

    it('should display label (if it is provided)', () => {
        const label = fixture.debugElement.query(By.css('.c-group-list-item__description span'));

        expect(label).not.toBeNull();
        expect(label.nativeElement.textContent).toEqual(component.label);
    });

    it('should display title', () => {
        const title = fixture.debugElement.query(By.css('.c-group-list-item__description h2'));

        expect(title).not.toBeNull();
        expect(title.nativeElement.textContent).toEqual(component.title);
    });
});
