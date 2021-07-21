import { ComponentFixture, TestBed } from '@angular/core/testing';

//modulos
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MatIconModule } from '@angular/material/icon';
import { MockModule } from 'ng-mocks';
import { LabComponentsAngularModule } from '@picpay/lab-components-angular';

//components
import { PicpayLabSideMenuComponent } from './side-menu.component';
import { By } from '@angular/platform-browser';

describe('PicpayLabSideMenuComponent', () => {
    let component: PicpayLabSideMenuComponent;
    let fixture: ComponentFixture<PicpayLabSideMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(DesignSystemAngularModule),
                MockModule(MatIconModule),
                MockModule(LabComponentsAngularModule),
            ],
            declarations: [PicpayLabSideMenuComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicpayLabSideMenuComponent);
        component = fixture.componentInstance;

        component.items = [
            {
                id: 1,
                icon: 'mockIcon1',
                text: 'Telas',
                isActive: false,
                component: 'MockComponent',
                description: 'São os elementos para você montar sua loja.',
            },
            {
                id: 2,
                icon: 'mockIcon2',
                text: 'Gerenciar',
                isActive: false,
                component: 'MockComponent',
                description: 'Acompanhe o status de aprovação da sua loja.',
            },
            {
                id: 3,
                icon: 'mockIcon3',
                text: 'Ajuda',
                isActive: false,
                component: 'MockComponent',
                description: 'Dúvidas frequentes, tutorial, fale com a gente.',
            },
        ];

        component.disabledOptions = false;

        spyOn(component, 'onActiveOrInactiveMenuOption').and.callThrough();

        fixture.detectChanges();
    });

    it('should create the component side menu', () => {
        expect(component).toBeTruthy();
    });

    it('should render items options menu', () => {
        const items = fixture.debugElement.queryAll(By.css('.c-side-menu-item'));
        expect(items.length).toEqual(3);

        expect(items[0].nativeElement.querySelector('.c-side-menu-item__icon').textContent).toMatch('mockIcon1');
        expect(items[0].nativeElement.querySelector('.c-side-menu-item__text').textContent).toMatch('Telas');

        expect(items[1].nativeElement.querySelector('.c-side-menu-item__icon').textContent).toMatch('mockIcon2');
        expect(items[1].nativeElement.querySelector('.c-side-menu-item__text').textContent).toMatch('Gerenciar');

        expect(items[2].nativeElement.querySelector('.c-side-menu-item__icon').textContent).toMatch('mockIcon3');
        expect(items[2].nativeElement.querySelector('.c-side-menu-item__text').textContent).toMatch('Ajuda');
    });

    it('should activeOption when click', () => {
        const item = fixture.debugElement.queryAll(By.css('.c-side-menu-item'))[0];

        item.nativeElement.dispatchEvent(new Event('click'));

        expect(component.onActiveOrInactiveMenuOption).toHaveBeenCalled();
    });

    it('should active option when item is inactive', () => {
        const openMenuOptionSpy = spyOn(component.openMenuOption, 'emit');
        const item = {
            id: 1,
            icon: 'mockIcon1',
            text: 'Telas',
            isActive: false,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        };

        component.onActiveOrInactiveMenuOption(item);

        fixture.detectChanges();

        expect(item.isActive).toEqual(true);
        expect(openMenuOptionSpy).toBeCalledWith({
            id: 1,
            icon: 'mockIcon1',
            text: 'Telas',
            isActive: true,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        });
    });

    it('should unactive option when item is active', () => {
        const openMenuOptionSpy = spyOn(component.openMenuOption, 'emit');
        const item = {
            id: 1,
            icon: 'mockIcon1',
            text: 'Telas',
            isActive: true,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        };

        component.onActiveOrInactiveMenuOption(item);

        fixture.detectChanges();

        expect(item.isActive).toEqual(false);
        expect(openMenuOptionSpy).toBeCalledWith({
            id: 1,
            icon: 'mockIcon1',
            text: 'Telas',
            isActive: false,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        });
    });

    it('should unactive option when other option have a click', () => {
        const itemActive1 = {
            id: 1,
            icon: 'mockIcon1',
            text: 'Telas',
            isActive: false,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        };
        const itemActive2 = {
            id: 2,
            icon: 'mockIcon2',
            text: 'Gerenciar',
            isActive: false,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        };

        component.onActiveOrInactiveMenuOption(itemActive1);
        component.onActiveOrInactiveMenuOption(itemActive2);
        fixture.detectChanges();

        expect(component.items[0].isActive).toEqual(false);
        expect(itemActive2.isActive).toEqual(true);
    });

    it('should unactive option when click two times in option', () => {
        component.items[0] = {
            id: 1,
            icon: 'mockIcon',
            text: 'Telas',
            isActive: false,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        };
        const itemActive = fixture.debugElement.queryAll(By.css('.c-side-menu-item'))[0];

        itemActive.nativeElement.dispatchEvent(new Event('click'));
        itemActive.nativeElement.dispatchEvent(new Event('click'));

        expect(component.items[0].isActive).toEqual(false);
    });

    it('should unactive option when click two times in option', () => {
        component.items[0] = {
            id: 1,
            icon: 'mockIcon',
            text: 'Telas',
            isActive: true,
            component: 'MockComponent',
            description: 'Lorem is tristique',
        };

        const itemActive = fixture.debugElement.queryAll(By.css('.c-side-menu-item'))[0];

        itemActive.nativeElement.dispatchEvent(new Event('click'));
        itemActive.nativeElement.dispatchEvent(new Event('click'));

        expect(component.items[0].isActive).toEqual(true);
    });
});
