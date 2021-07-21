import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChangeRechargeValueComponent } from '../../components/modals/change-recharge-value/change-recharge-value.component';

import { RechargesQuery, RechargesService } from '../../data-access';

import { RechargesMethod } from '../../enums';
import { RechargeData } from '../../models';
import { Unsubscriber } from '@picpay/angular/shared/helpers';

import { NotificationsService } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'finance-dash-recharge-solicitations',
    templateUrl: './recharge-solicitations.component.html',
    styleUrls: ['./recharge-solicitations.component.scss'],
})
export class RechargeSolicitationsComponent implements OnInit {
    pageInitial = 10;
    pageIndex: string;
    selectedKey: string;

    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    readonly displayedColumns: string[];

    private readonly recharges$: Observable<RechargeData[]>;

    readonly totalRecharges$: Observable<number>;

    readonly isLoading$: Observable<boolean>;

    constructor(
        private rechargesQuery: RechargesQuery,
        private rechargesService: RechargesService,
        private matDialog: MatDialog,
        private notifications: NotificationsService,
    ) {
        this.displayedColumns = [
            'id_counter',
            'consumer_id',
            'recharge_method_type_id',
            'request_date',
            'status_name',
            'value',
            'completion_date',
            'code',
            'actions',
        ];

        this.recharges$ = this.rechargesQuery.recharges$;
        this.totalRecharges$ = this.rechargesQuery.totalRecharges$;
        this.isLoading$ = this.rechargesQuery.isLoading$;
    }

    ngOnInit(): void {
        this.getRecharges();
    }

    getRecharges(): void {
        this.rechargesService.getRecharges();
    }

    getRechargesMethod(value: string): string {
        return RechargesMethod[value];
    }

    openChangeRechargeValue(rechargeID: string, rechargeIDCounter: number, rechargeValue: number): void {
        const config = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '440px',
            data: {
                rechargeID,
                rechargeIDCounter,
                rechargeValue,
            },
        };

        this.matDialog
            .open(ChangeRechargeValueComponent, config)
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.notifications.openSnackbar('Valor alterado com sucesso!');
            });
    }
}
