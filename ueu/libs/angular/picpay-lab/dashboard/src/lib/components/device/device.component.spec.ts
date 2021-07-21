import { ApolloButton, ApolloIcon } from '@picpay/design-system-angular-components';
import { MockComponents } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicpayLabDeviceComponent } from './device.component';

describe('PicpayLabHeaderComponent', () => {
    let component: PicpayLabDeviceComponent;
    let fixture: ComponentFixture<PicpayLabDeviceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PicpayLabDeviceComponent, MockComponents(ApolloButton, ApolloIcon)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicpayLabDeviceComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onAddSectionClick function', async () => {
        const addSectionSpy = spyOn(component.addSectionClick, 'emit');
        await component.onAddSectionClick();
        expect(addSectionSpy).toBeCalled();
        expect(addSectionSpy).toBeCalledTimes(1);
    });

    it('should render the addSection button', () => {
        const sidepanelComponent = fixture.nativeElement.querySelector('.device__scroll-content-btn');
        expect(sidepanelComponent).toBeTruthy();
    });

    it('should not render the addSection button', () => {
        component.addSectionVisible = false;
        fixture.detectChanges();
        const sidepanelComponent = fixture.nativeElement.querySelector('.device__scroll-content-btn');
        expect(sidepanelComponent).toBeFalsy();
    });
});
