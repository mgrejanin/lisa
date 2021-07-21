import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// utils
import { subscribeUntil } from '@picpay/angular/shared/helpers';

// rxjs
import { Observable } from 'rxjs';

// store components
import { SquadUsersQuery } from '../../data-access/squad-users';
import { UsersQuery, UsersService } from '../../data-access/users';

// interfaces
import { Role, User } from '../../models';
@Component({
    selector: 'feature-flag-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
    readonly users$: Observable<User[]>;
    readonly roles$: Observable<Role[]>;

    form: FormGroup;

    constructor(
        private modalRef: MatDialogRef<UserCreateComponent>,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
        private usersQuery: UsersQuery,
        private usersService: UsersService,
        private squadUsersQuery: SquadUsersQuery,
    ) {
        /* TODO: add a custom validator to check if the user
            value is a valid user. */
        this.form = this.formBuilder.group({
            role: ['', Validators.required],
            user: ['', Validators.required],
        });

        this.users$ = this.usersQuery.users$;
        this.roles$ = this.squadUsersQuery.roles$;
    }

    ngOnInit() {
        this.form
            .get('user')
            .valueChanges.pipe(subscribeUntil(this))
            .subscribe(value => {
                this.usersService.getUsers(value.name || value);
            });
    }

    onClose(): void {
        this.modalRef.close();
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }

        const selectedRole = this.form.get('role').value;
        const selectedUser = this.form.get('user').value as User;

        this.modalRef.close({ selectedRole, selectedUser });
    }

    /* utils */
    displayFn(user: User): string {
        return user.fullname;
    }
}
