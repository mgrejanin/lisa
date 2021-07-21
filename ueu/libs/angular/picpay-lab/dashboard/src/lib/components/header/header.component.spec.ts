import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicpayLabHeaderComponent } from './header.component';

// modules
import { MockModule } from 'ng-mocks';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LabComponentsAngularModule } from '@picpay/lab-components-angular';

describe('PicpayLabHeaderComponent', () => {
    let component: PicpayLabHeaderComponent;
    let fixture: ComponentFixture<PicpayLabHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(DesignSystemAngularModule), MockModule(LabComponentsAngularModule)],
            declarations: [PicpayLabHeaderComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicpayLabHeaderComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onBackRoute function', async () => {
        const backRouteSpy = spyOn(component.backRoute, 'emit');
        await component.onBackRoute();
        expect(backRouteSpy).toBeCalled();
        expect(backRouteSpy).toBeCalledTimes(1);
    });

    it('should have onSave function', async () => {
        const saveSpy = spyOn(component.save, 'emit');
        await component.onSave();
        expect(saveSpy).toBeCalled();
        expect(saveSpy).toBeCalledTimes(1);
    });

    it('should have onSendForApproval function', async () => {
        const sendForApprovalSpy = spyOn(component.sendForApproval, 'emit');
        await component.onSendForApproval();
        expect(sendForApprovalSpy).toBeCalled();
        expect(sendForApprovalSpy).toBeCalledTimes(1);
    });
});
