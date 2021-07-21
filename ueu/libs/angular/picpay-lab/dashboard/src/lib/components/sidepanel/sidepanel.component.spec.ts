import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { PicpayLabSidePanelComponent } from './sidepanel.component';

describe('PicpayLabSidepanelComponent', () => {
    let component: PicpayLabSidePanelComponent;
    let fixture: ComponentFixture<PicpayLabSidePanelComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, MockModule(DesignSystemAngularModule)],
            declarations: [PicpayLabSidePanelComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicpayLabSidePanelComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.debugElement.nativeElement;

        component.title = 'mocktitle';
        component.description = 'mockdescription';
        component.icon = 'mockicon';

        spyOn(component, 'handleClick').and.callThrough();

        fixture.detectChanges();
    });

    it('should create the component sidepanel', () => {
        expect(component).toBeTruthy();
    });

    it('should render with title', () => {
        const titleElement = nativeElement.querySelector('.sidepanel__title');
        expect(titleElement.textContent).toEqual(component.title);
    });

    it('should render with description', () => {
        const descriptionElement = nativeElement.querySelector('.sidepanel__description');
        expect(descriptionElement.textContent).toEqual(component.description);
    });

    describe('side property', () => {
        it('should render with default (left) side', () => {
            const sidepanelComponent = nativeElement.querySelector('.sidepanel');
            expect(sidepanelComponent.classList).not.toContain('sidepanel__right');
        });

        it('should render with right side', () => {
            component.side = 'right';
            fixture.detectChanges();

            const sidepanelComponent = nativeElement.querySelector('.sidepanel');
            expect(sidepanelComponent.classList).toContain('sidepanel__right');
        });
    });
    it('should handle click', () => {
        const button = nativeElement.querySelector('apollo-icon-button');
        button.dispatchEvent(new Event('click'));
        expect(component.handleClick).toHaveBeenCalled();
    });
});
