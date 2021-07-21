import { finalize } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { GetBookmarksResponse } from '../../models';
import { BookmarksStore } from './bookmarks.store';

@Injectable({ providedIn: 'root' })
export class BookmarksService {
    private readonly apiUrl: string;
    constructor(
        private config: CoreDataAccessService,
        private bookmarksStore: BookmarksStore,
        private http: HttpClient,
    ) {
        this.apiUrl = this.config.getConfig().apiUrl;
    }

    getBookmarks(): void {
        this.bookmarksStore.setLoading(true);
        this.http
            .get<GetBookmarksResponse>(`${this.apiUrl}/metadata/v0/user/bookmark`)
            .pipe(
                subscribeUntil(this),
                finalize(() => this.bookmarksStore.setLoading(false)),
            )
            .subscribe(({ bookmarks }) => this.bookmarksStore.update({ bookmarks }));
    }
}
