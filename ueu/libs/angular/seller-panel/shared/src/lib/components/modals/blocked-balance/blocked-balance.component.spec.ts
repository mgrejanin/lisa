import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { MockModule } from 'ng-mocks';

import { MatDialogRefMock } from '@picpay/angular/shared/helpers';
import { BlockedBalanceComponent } from './blocked-balance.component';

describe('BlockedBalanceComponent', () => {
    let component: BlockedBalanceComponent;
    let fixture: ComponentFixture<BlockedBalanceComponent>;
    let dialogRef: MatDialogRef<BlockedBalanceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatDialogModule), MockModule(MatIconModule)],
            declarations: [BlockedBalanceComponent],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BlockedBalanceComponent);
        component = fixture.componentInstance;
        dialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should Close function', () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        const cancelSpy = spyOn(component, 'onClose').and.callThrough();

        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(By.css('.c-blocked-balance__footer--btn')).nativeElement;
        closeButton.click();

        expect(cancelSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith();
    });
});
