import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService, PicpediaRoutePath, WithNavbar } from '@picpay/picpedia/shared';

import { BookmarksQuery } from '../../data-access/bookmarks/bookmarks.query';
import { BookmarksService } from '../../data-access/bookmarks/bookmarks.service';
import { TagsQuery } from '../../data-access/tags/tags.query';
import { TagsService } from '../../data-access/tags/tags.service';
import { Bookmark, Tag } from '../../models';

@Component({
    selector: 'picpedia-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, WithNavbar {
    readonly isLoadingTags$: Observable<boolean>;
    readonly isLoadingBookmarks$: Observable<boolean>;
    readonly tags$: Observable<Tag[]>;
    readonly bookmarks$: Observable<Bookmark[]>;

    constructor(
        private tagsService: TagsService,
        private tagsQuery: TagsQuery,
        private bookmarksService: BookmarksService,
        private bookmarksQuery: BookmarksQuery,
        private router: Router,
        private breadcrumbService: BreadcrumbService,
    ) {
        this.tags$ = this.tagsQuery.tags$;
        this.bookmarks$ = this.bookmarksQuery.bookmarks$;
        this.isLoadingTags$ = this.tagsQuery.isLoading$;
        this.isLoadingBookmarks$ = this.bookmarksQuery.isLoading$;
    }

    ngOnInit(): void {
        this.getTags();
        this.getBookmarks();
    }

    getTags(): void {
        this.tagsService.getTags();
    }

    getBookmarks(): void {
        this.bookmarksService.getBookmarks();
    }

    onViewAllTagsClick(): void {
        this.router.navigateByUrl(PicpediaRoutePath.Tags);
    }

    updateBreadcrumbs() {
        this.breadcrumbService.update({ breadcrumbs: [] });
    }
}
