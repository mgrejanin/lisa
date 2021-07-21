import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponents, MockModule } from 'ng-mocks';

import { HeaderComponent, LoadingButtonComponent } from '@picpay/seller-panel/shared';

import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { MyDocumentsComponent } from '../../components/my-documents/my-documents.component';
import { SettingsComponent } from './settings.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

export class LocationMock {
    back(): void {
        /** */
    }
}

describe('SettingsComponent', () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MockModule(MatIconModule),
                MockModule(MatTabsModule),
            ],
            declarations: [
                SettingsComponent,
                MockComponents(HeaderComponent, MyDocumentsComponent, ChangePasswordComponent, LoadingButtonComponent),
            ],
            providers: [
                { provide: Location, useClass: LocationMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should trigger backToPreviousPage function when click at c-settings-page__header--arrow-left', () => {
        const arrowLeftBtn = fixture.debugElement.query(By.css('.c-settings-page__header--arrow-left'));
        spyOn(component, 'backToPreviousPage');

        arrowLeftBtn.nativeElement.click();

        expect(component.backToPreviousPage).toHaveBeenCalled();
    });
});
