import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalAddress } from '../../models/personal-address.model';
import { Responsible } from '../../models/responsible-data.model';
import { SellerRecord, SellerState } from '../../models/seller.model';
import { SellerStore } from './seller.store';

@Injectable({ providedIn: 'root' })
export class SellerQuery extends Query<SellerState> {
    readonly sellerResponsible$: Observable<Responsible>;
    readonly sellerAddress$: Observable<PersonalAddress>;
    readonly sellerCompany$: Observable<SellerRecord>;
    readonly sellerAddressCompany$: Observable<SellerRecord>;
    readonly step$: Observable<number | null | undefined>;

    readonly isLoading$: Observable<boolean>;

    readonly tokenHash$: Observable<Pick<SellerState, 'hash' | 'token'>>;

    readonly nameSeller$: Observable<string>;
    readonly cellSeller$: Observable<string>;
    readonly fullAddressSeller$: Observable<string>;

    constructor(protected store: SellerStore) {
        super(store);

        this.isLoading$ = this.selectLoading();

        this.sellerResponsible$ = this.select('responsible');
        this.sellerAddress$ = this.select('address');
        this.sellerCompany$ = this.select('company');
        this.sellerAddressCompany$ = this.select('address_company');
        this.step$ = this.select('step');
        this.tokenHash$ = this.select(['token', 'hash']);

        this.nameSeller$ = this.sellerResponsible$.pipe(map(dataResponsible => dataResponsible?.user_name));
        this.cellSeller$ = this.sellerResponsible$.pipe(map(dataResponsible => dataResponsible?.user_cell_number));
        this.fullAddressSeller$ = this.sellerAddress$.pipe(
            map(dataAddress => {
                const { user_address_street, user_address_neighbourhood, user_address_city } = dataAddress;

                return `${user_address_street}, ${user_address_neighbourhood}, ${user_address_city}`;
            }),
        );
    }
}
