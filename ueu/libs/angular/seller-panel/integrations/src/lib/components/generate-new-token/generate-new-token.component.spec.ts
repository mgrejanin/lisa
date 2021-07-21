import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ApolloButton } from '@picpay/design-system-angular-components';

import { MockModule, MockComponents } from 'ng-mocks';

import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { GenerateNewTokenComponent } from './generate-new-token.component';

describe('GenerateNewTokenComponent', () => {
    let component: GenerateNewTokenComponent;
    let fixture: ComponentFixture<GenerateNewTokenComponent>;
    let matDialogRef: MatDialogRef<GenerateNewTokenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatIconModule)],
            declarations: [GenerateNewTokenComponent, MockComponents(ApolloButton)],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GenerateNewTokenComponent);
        component = fixture.componentInstance;

        matDialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should onGenerateNewToken function', () => {
        const dialogSpy = spyOn(matDialogRef, 'close');

        component.onGenerateNewToken();
        expect(dialogSpy).toHaveBeenCalledWith(true);
    });

    it('should onClose function', () => {
        const dialogSpy = spyOn(matDialogRef, 'close');
        const cancelSpy = spyOn(component, 'onClose').and.callThrough();

        component.onClose();
        expect(cancelSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith(false);
    });
});
