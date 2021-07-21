import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { TagsQuery } from '../../data-access/tags/tags.query';
import { TagsService } from '../../data-access/tags/tags.service';
import { Tag } from '../../models';

@Component({
    selector: 'picpedia-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
    readonly isLoading$: Observable<boolean>;
    readonly tags$: Observable<Tag[]>;

    constructor(private tagsService: TagsService, private tagsQuery: TagsQuery) {
        this.isLoading$ = this.tagsQuery.isLoading$;
        this.tags$ = this.tagsQuery.tags$;
    }

    ngOnInit(): void {
        this.getTags();
    }

    getTags(): void {
        this.tagsService.getTags();
    }
}
