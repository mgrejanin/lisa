import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventTracking } from '@picpay/event-tracking';
import { CheckPasswordService, SellerQuery } from '@picpay/seller-panel/services';
@Component({
    selector: 'seller-panel-request-password',
    templateUrl: './request-password.component.html',
    styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent implements OnInit, OnDestroy {
    form: FormGroup;
    connecting = false;
    private unsubscribe$: Subject<void>;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { caption: string },
        private dialogRef: MatDialogRef<RequestPasswordComponent>,
        private checkPasswordService: CheckPasswordService,
        private sellerQuery: SellerQuery,
    ) {
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            password: new FormControl('', [Validators.required, Validators.maxLength(255)]),
        });
    }

    onApplyPassword(): void {
        this.connecting = true;
        this.checkPasswordService
            .verifyPassword(this.form.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                () => {
                    this.connecting = false;
                    this.dialogRef.close({
                        confirm: true,
                    });
                },
                () => {
                    this.connecting = false;
                    this.dialogRef.close({
                        confirm: false,
                    });
                },
            );

        EventTracking.track('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Settings - Password',
            seller_id: this.sellerQuery.getValue().organization?.id,
        });
    }

    onClose(): void {
        this.dialogRef.close({
            confirm: false,
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
