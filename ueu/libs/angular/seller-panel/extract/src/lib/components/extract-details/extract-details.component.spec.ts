import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { OnboardingExtractComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { ExtractDetailsComponent } from './extract-details.component';

describe('ExtractDetailsComponent', () => {
    let component: ExtractDetailsComponent;
    let fixture: ComponentFixture<ExtractDetailsComponent>;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExtractDetailsComponent],
            imports: [MockModule(DesignSystemAngularModule), MockModule(MatIconModule)],
            providers: [{ provide: MatDialog, useClass: MatDialogMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExtractDetailsComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have knowMore function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();

        component.knowMore();

        expect(matDialogSpy).toHaveBeenCalledWith(OnboardingExtractComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '628px',
            height: '624px',
            disableClose: true,
        });
    });
});
