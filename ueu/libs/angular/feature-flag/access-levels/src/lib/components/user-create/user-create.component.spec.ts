// @angular
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

// modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

// components
import { MatSelect } from '@angular/material/select';
import { UserCreateComponent } from './user-create.component';

// ng-mocks
import { MockComponents, MockModule } from 'ng-mocks';

// store components
import { UsersQuery, UsersQueryMock, UsersService, UsersServiceMock } from '../../data-access/users';

// models
import { User } from '../../models';

describe('UserCreateComponent', () => {
    let component: UserCreateComponent;
    let fixture: ComponentFixture<UserCreateComponent>;

    let modalRef: MatDialogRef<UserCreateComponent>;

    const mockData = {
        title: 'Adicionar usuários',
        message: 'Os usuários adicionados podem gerenciar todos os acessos',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserCreateComponent, MockComponents(MatSelect)],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MockModule(MatAutocompleteModule),
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(MatIconModule),
                HttpClientTestingModule,
            ],
            providers: [
                { provide: UsersQuery, useClass: UsersQueryMock },
                { provide: UsersService, useClass: UsersServiceMock },
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                { provide: MatDialogRef, useValue: { close: () => {} } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCreateComponent);
        component = fixture.componentInstance;

        modalRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /* controller */
    it('should have onSubmit function (invalid form)', () => {
        const closeSpy = spyOn(modalRef, 'close');

        component.onSubmit();

        expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should have onSubmit function (valid form)', () => {
        const closeSpy = spyOn(modalRef, 'close');

        const mockRole = 'mockRole';
        const mockUser = { id: 'mockId', name: 'mockName' };

        component.form.patchValue({
            role: mockRole,
            user: mockUser,
        });

        component.onSubmit();

        expect(closeSpy).toHaveBeenCalledWith({ selectedRole: mockRole, selectedUser: mockUser });
    });

    it('should have onClose function', () => {
        const dialogRef = TestBed.inject(MatDialogRef);

        const closeSpy = spyOn(dialogRef, 'close');

        component.onClose();

        expect(closeSpy).toHaveBeenCalledWith();
    });

    /* interface */
    it('should have title', () => {
        const title = fixture.debugElement.query(By.css('.c-user-create__title'));

        expect(title.nativeElement.textContent.trim()).toBe(mockData.title);
    });

    it('should have message', () => {
        const message = fixture.debugElement.query(By.css('.c-user-create__message'));

        expect(message.nativeElement.textContent.trim()).toBe(mockData.message);
    });

    it('should have close btn', () => {
        const btn = fixture.debugElement.query(By.css('.c-user-create__close-btn'));

        expect(btn).not.toBeNull();

        const closeSpy = spyOn(component, 'onClose');

        btn.nativeElement.click();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should have cancel btn', () => {
        const btn = fixture.debugElement.query(By.css('.c-user-create__cancel-btn'));

        expect(btn).not.toBeNull();

        const closeSpy = spyOn(component, 'onClose');

        btn.nativeElement.click();

        expect(closeSpy).toHaveBeenCalledWith();
    });

    it('should have confirm btn', () => {
        const btn = fixture.debugElement.query(By.css('.c-user-create__confirm-btn'));

        expect(btn).not.toBeNull();
    });

    describe('Submiting', () => {
        it('should not submit when form is empty', () => {
            const btn = fixture.debugElement.query(By.css('.c-user-create__confirm-btn'));
            const submitSpy = spyOn(component, 'onSubmit');

            btn.nativeElement.click();
            expect(btn.nativeElement.disabled).toBeTruthy();
            expect(submitSpy).not.toHaveBeenCalled();
        });

        it('should not submit when form is empty', async () => {
            const btn = fixture.debugElement.query(By.css('.c-user-create__confirm-btn'));
            const submitSpy = spyOn(component, 'onSubmit');

            component.form.controls['role'].setValue('mockRole');
            component.form.controls['user'].setValue('mocKUser');

            fixture.detectChanges();
            btn.nativeElement.click();

            expect(submitSpy).toHaveBeenCalled();
        });
    });

    /* utils */
    it('should have displayFn function', () => {
        const mockUser: User = {
            id: 'mockId',
            name: 'mockName',
            fullname: 'mockFullname',
            email: 'mockEmail',
            picture: 'mockPicture',
            role: 'mockRole',
        };

        const returnedValue = component.displayFn(mockUser);

        expect(returnedValue).toEqual(mockUser.fullname);
    });
});
