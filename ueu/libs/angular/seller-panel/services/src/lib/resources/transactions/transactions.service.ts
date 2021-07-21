import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { removeUndefinedNull } from '@picpay/angular/shared/helpers';

import { SellerAccessConfig } from '../../config';
import {
    DownloadReporterTransactions,
    SellerListTransaction,
    TransactionResponse,
    TransactionStatusIDIcon,
    TransactionStatusIDName,
    TransactionTable,
} from '../../models';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Injectable()
export class TransactionsService {
    constructor(
        private http: HttpClient,
        protected config: CoreDataAccessService<SellerAccessConfig>,
        private notificationService: NotificationsService,
    ) {}

    getTransactions(
        sort = 'transaction_date',
        page = 0,
        page_size = 12,
        filters = {},
    ): Observable<{ items: TransactionTable[] }> {
        const params = new HttpParams({ fromObject: filters })
            .set('sort', sort)
            .set('page', page.toString())
            .set('page_size', page_size.toString());
        return this.http
            .get<TransactionResponse>(`${this.config.getConfig().apiUrlSellerDash}/v1/transactions`, {
                params,
            })
            .pipe(
                map(response => {
                    let transactions = [];
                    if (response?.data) {
                        const payload: SellerListTransaction[] = response.data;
                        transactions = payload.map(transaction => ({
                            id: transaction.id,
                            image:
                                transaction.consumer.image !== ''
                                    ? transaction.consumer.image
                                    : '/assets/images/avatar.svg',
                            transaction_date: transaction.transaction_date,
                            consumer: transaction.consumer.name,
                            seller: transaction.seller ? transaction.seller.name : 'Unidade indisponível',
                            status: TransactionStatusIDName[transaction.status],
                            status_id: TransactionStatusIDIcon[transaction.status],
                            price: transaction.value_transaction,
                            details: {
                                username: transaction.consumer.username,
                                cpf_cnpj: transaction.seller ? transaction.seller.document : '-',
                                transaction_date: transaction.transaction_date,
                                id_transaction: transaction.id,
                                seller: transaction.seller ? transaction.seller.companyName : 'Unidade indisponível',
                                id_seller: transaction.seller ? transaction.seller.id : '-',
                                operator: transaction.operator ? transaction.operator : '-',
                                price: transaction.value_transaction,
                            },
                            store_details: transaction.store,
                        }));
                    }

                    return {
                        items: transactions as TransactionTable[],
                    };
                }),
            );
    }

    getExternLinkTransactions(page = 0, page_size = 12): Observable<{ items: TransactionTable[] }> {
        const url = `${this.config.getConfig().apiUrl}/v2/transactions/payment-checkout`;
        const params = new HttpParams().set('page', page.toString()).set('page_size', page_size.toString());

        return this.http
            .get<TransactionResponse>(url, {
                params,
            })
            .pipe(
                map(response => {
                    let transactions = [];
                    if (response?.data) {
                        const payload: SellerListTransaction[] = response?.data;

                        transactions = payload.map(transaction => ({
                            id: transaction.id,
                            image: '/assets/images/avatar.svg',
                            consumer: transaction.consumer_name,
                            transaction_date: transaction.transaction_date,
                            seller: transaction.seller ? transaction.seller : 'Unidade indisponível',
                            status: TransactionStatusIDName[transaction.status_id],
                            status_id: TransactionStatusIDIcon[transaction.status_id],
                            price: transaction.value_transaction,
                            details: {
                                username: transaction.consumer_name,
                                transaction_date: transaction.details.transaction_date,
                                id_transaction: transaction.id,
                                id_seller: transaction.seller ? transaction.seller.id : '-',
                            },
                            checkout: true,
                        }));
                    }

                    return {
                        items: transactions as TransactionTable[],
                    };
                }),
            );
    }

    cancelExternalLinkTransaction(id: number, password: string): Observable<{ message: string }> {
        const url = `${this.config.getConfig().apiUrl}/v2/transactions/payment-checkout/cancel/${id}`;
        return this.http.post<{ message: string }>(url, password);
    }

    cancelTransaction(id: number, password: string): Observable<{ message: string }> {
        const body = {
            password,
            id,
            reason_id: '1',
            comment: 'Cancelamento',
        };

        return this.http.post<{ message: string }>(`${this.config.getConfig().apiUrl}/transactions/cancel`, body);
    }

    exportTransactions(filters: DownloadReporterTransactions = {}): Observable<{ data: { message: string } }> {
        const params = new HttpParams({ fromObject: removeUndefinedNull(filters) });

        return this.http
            .get<{ data: { message: string } }>(`${this.config.getConfig().apiUrlSellerDash}/v1/reports/transactions`, {
                params,
            })
            .pipe(
                tap((response: { data: { message: string } }) => {
                    this.notificationService.openSnackbar(response.data.message, SnackbarTypes.DONE);
                }),
            );
    }
}
