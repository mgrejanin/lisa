import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MockModule } from 'ng-mocks';

import { SidenavService } from '@picpay/seller-panel/services';

import { SidenavDetailsComponent } from './sidenav-details.component';

describe('SidenavDetailsComponent', () => {
    let component: SidenavDetailsComponent;
    let fixture: ComponentFixture<SidenavDetailsComponent>;

    let sidenavService: SidenavService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatSidenavModule), MockModule(MatIconModule)],
            declarations: [SidenavDetailsComponent],
            providers: [SidenavService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        sidenavService = TestBed.inject(SidenavService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClosed function', () => {
        const serviceCloseSpy = spyOn(sidenavService, 'close');
        const serviceClosedSpy = spyOn(sidenavService, 'closed');

        component.onClosed();

        expect(serviceCloseSpy).toHaveBeenCalledTimes(1);
        expect(serviceClosedSpy).toHaveBeenCalledTimes(1);
    });
});
