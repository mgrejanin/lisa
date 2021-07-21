import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

// components
import { ConfirmationModalComponent } from './confirmation-modal.component';

// modules
import { MatIconModule } from '@angular/material/icon';

// ng-mocks
import { MockModule } from 'ng-mocks';

describe('ConfirmationModalComponent', () => {
    let component: ConfirmationModalComponent;
    let fixture: ComponentFixture<ConfirmationModalComponent>;

    const mockData = { title: 'mockTitle', message: 'mockMessage' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmationModalComponent],
            imports: [MockModule(MatIconModule)],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                { provide: MatDialogRef, useValue: { close: () => {} } },
            ],
        }).compileComponents();
    });

    describe('generic', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(ConfirmationModalComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        it('should have close btn', () => {
            const btn = fixture.debugElement.query(By.css('.c-confirmation-modal__close-btn'));

            expect(btn).not.toBeNull();

            const closeSpy = spyOn(component, 'onClose');

            btn.nativeElement.click();

            expect(closeSpy).toHaveBeenCalledWith(false);
        });

        it('should have cancel btn', () => {
            const btn = fixture.debugElement.query(By.css('.c-confirmation-modal__cancel-btn'));

            expect(btn).not.toBeNull();

            const closeSpy = spyOn(component, 'onClose');

            btn.nativeElement.click();

            expect(closeSpy).toHaveBeenCalledWith(false);
        });

        it('should have confirm btn', () => {
            const btn = fixture.debugElement.query(By.css('.c-confirmation-modal__confirm-btn'));

            expect(btn).not.toBeNull();

            const closeSpy = spyOn(component, 'onClose');

            btn.nativeElement.click();

            expect(closeSpy).toHaveBeenCalledWith(true);
        });

        // CONTROLLER
        it('should have onClose function', () => {
            const dialogRef = TestBed.inject(MatDialogRef);

            const closeSpy = spyOn(dialogRef, 'close');

            const param = true;

            component.onClose(param);

            expect(closeSpy).toHaveBeenCalledWith({ confirm: param });
        });
    });

    describe('with valid data', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(ConfirmationModalComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        // TEMPLATE
        it('should have title', () => {
            const title = fixture.debugElement.query(By.css('.c-confirmation-modal__title'));

            expect(title.nativeElement.textContent.trim()).toBe(mockData.title);
        });

        it('should have message', () => {
            const message = fixture.debugElement.query(By.css('.c-confirmation-modal__message'));

            expect(message.nativeElement.textContent.trim()).toBe(mockData.message);
        });
    });

    describe('without valid data', () => {
        beforeEach(() => {
            TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: {} });
            fixture = TestBed.createComponent(ConfirmationModalComponent);
            component = fixture.componentInstance;

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        // TEMPLATE
        it('should have title', () => {
            const title = fixture.debugElement.query(By.css('.c-confirmation-modal__title'));

            expect(title.nativeElement.textContent.trim()).toBe('Confirmar ação');
        });

        it('should have message', () => {
            const message = fixture.debugElement.query(By.css('.c-confirmation-modal__message'));

            expect(message.nativeElement.textContent.trim()).toBe('Você tem certeza de que deseja realizar essa ação?');
        });
    });
});
