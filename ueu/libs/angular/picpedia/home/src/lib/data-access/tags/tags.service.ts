import { finalize } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { GetTagsResponse } from '../../models';
import { TagsStore } from './tags.store';

@Injectable({ providedIn: 'root' })
export class TagsService {
    private readonly apiUrl: string;

    constructor(private config: CoreDataAccessService, private tagsStore: TagsStore, private http: HttpClient) {
        this.apiUrl = this.config.getConfig().apiUrl;
    }

    getTags(): void {
        this.tagsStore.setLoading(true);
        this.http
            .get<GetTagsResponse>(`${this.apiUrl}/metadata/v0/tags`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.tagsStore.setLoading(false)),
            )
            .subscribe(({ tags }) => {
                this.tagsStore.update({ tags });
            });
    }
}
