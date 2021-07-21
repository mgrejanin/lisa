import { MockedComponent } from 'ng-mocks';
import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ApolloTextfield } from '@picpay/design-system-angular-components';
import {
    BadgeComponent,
    BreadcrumbService,
    BreadcrumbsServiceMock,
    NavbarHeaderComponent,
    PicpediaRoutePath,
    SharedModule,
} from '@picpay/picpedia/shared';

import { BookmarksQuery } from '../../data-access/bookmarks/bookmarks.query';
import { BookmarksService } from '../../data-access/bookmarks/bookmarks.service';
import { BookmarksQueryMock } from '../../data-access/bookmarks/mocks/bookmarks.query.mock';
import { BookmarksServiceMock } from '../../data-access/bookmarks/mocks/bookmarks.service.mock';
import { mockTags } from '../../data-access/tags/mocks/tags.mock';
import { TagsQueryMock } from '../../data-access/tags/mocks/tags.query.mock';
import { TagsServiceMock } from '../../data-access/tags/mocks/tags.service.mock';
import { TagsQuery } from '../../data-access/tags/tags.query';
import { TagsService } from '../../data-access/tags/tags.service';
import { HomeComponent } from './home.component';

import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakService,
} from '@picpay/keycloak';
import { KeycloakService } from 'keycloak-angular';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let tagsQuery: TagsQuery;
    let tagsService: TagsService;
    let bookmarksQuery: BookmarksQuery;
    let bookmarksService: BookmarksService;
    let breadcrumbsService: BreadcrumbService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule, DesignSystemAngularModule, RouterTestingModule.withRoutes([])],
            declarations: [HomeComponent],
            providers: [
                { provide: TagsService, useClass: TagsServiceMock },
                { provide: TagsQuery, useClass: TagsQueryMock },
                { provide: BookmarksService, useClass: BookmarksServiceMock },
                { provide: BookmarksQuery, useClass: BookmarksQueryMock },
                { provide: BreadcrumbService, useClass: BreadcrumbsServiceMock },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                PicpayKeycloakService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        tagsQuery = TestBed.inject(TagsQuery);
        tagsService = TestBed.inject(TagsService);
        bookmarksQuery = TestBed.inject(BookmarksQuery);
        bookmarksService = TestBed.inject(BookmarksService);
        breadcrumbsService = TestBed.inject(BreadcrumbService);
        router = TestBed.inject(Router);
    });

    // Template
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a navbar-header', () => {
        const title = fixture.debugElement.query(By.css('.c-home__navbar-header'));
        expect(title).toBeTruthy();
        expect((title.nativeElement as NavbarHeaderComponent).title.trim()).toBe('Início');
    });

    it('should have a apollo-textfield search bar', () => {
        const searchBar = fixture.debugElement.query(By.css('.c-home__search-bar'));
        expect(searchBar).toBeTruthy();
        expect((searchBar.nativeElement as ApolloTextfield).type).toBe('search');
    });

    it('should have a filter action button', () => {
        const filterButton = fixture.debugElement.query(By.css('.c-home__search-actions--filter'));
        expect(filterButton).toBeTruthy();
    });

    it('should c-home__tags-container render if have tags$ value', () => {
        fixture.detectChanges();
        const tagsList = fixture.debugElement.queryAll(By.css('.c-home__tags-container'));
        expect(tagsList).toBeTruthy();
    });

    it('should have c-home__tags--link list if have tags$ value', () => {
        const tagsList = fixture.debugElement.queryAll(By.css('.c-home__tags--link'));
        expect(tagsList.length).toEqual(mockTags.length);
    });

    it('should bind conditions to picpedia-badge component', () => {
        const tagsList = fixture.debugElement.queryAll(By.css('.c-home__tags--link'));
        expect(tagsList.length).toEqual(mockTags.length);

        const tagsListElement1 = tagsList[0].componentInstance as MockedComponent<BadgeComponent>;
        expect(tagsListElement1.description).toEqual(mockTags[0].tag_name);
    });

    it('should not render c-home__bookmarks__empty if have bookmarks', () => {
        const bookmarksEmptyElement = fixture.debugElement.query(By.css('.c-home__bookmarks__empty'));
        expect(bookmarksEmptyElement).toBeNull();
    });

    it('should render c-home__bookmarks__empty if no have bookmarks', () => {
        Object.defineProperty(component, 'bookmarks$', { value: of([]) });
        fixture.detectChanges();
        const bookmarksEmptyElement = fixture.debugElement.query(By.css('.c-home__bookmarks__empty'));
        expect(bookmarksEmptyElement).toBeTruthy();
    });

    it('should c-home_view-all-tags--button bind onViewAllTagsClick on click', () => {
        const viewAllTagsButton = fixture.debugElement.query(By.css('.c-home_view-all-tags--button'));
        const spy = spyOn(component, 'onViewAllTagsClick');
        (viewAllTagsButton.nativeElement as HTMLButtonElement).click();
        expect(spy).toBeCalledTimes(1);
    });

    // Controller

    it('should have ngOnInit function', () => {
        expect(component.ngOnInit).toBeTruthy();
    });

    it('should have isLoadingTags$ observable', () => {
        expect(component.isLoadingTags$).toEqual(tagsQuery.isLoading$);
    });

    it('should have isLoadingBookmarks$ observable', () => {
        expect(component.isLoadingBookmarks$).toEqual(bookmarksQuery.isLoading$);
    });

    it('should have tags$ observable', () => {
        expect(component.tags$).toEqual(tagsQuery.tags$);
    });

    it('should have bookmarks$ observable', () => {
        expect(component.bookmarks$).toEqual(bookmarksQuery.bookmarks$);
    });

    it('should have a getTags function', () => {
        expect(component.getTags).toBeTruthy();
    });

    it('should have getBookmarks function', () => {
        expect(component.getBookmarks).toBeTruthy();
    });

    it('shound have onViewAllTagsClick function', () => {
        const routerSpy = spyOn(router, 'navigateByUrl');
        component.onViewAllTagsClick();

        expect(component.onViewAllTagsClick).toBeTruthy();
        expect(routerSpy).toHaveBeenCalledWith(PicpediaRoutePath.Tags);
    });

    it('should call getTags when call ngOnInit', () => {
        const getTagsSpy = spyOn(component, 'getTags');
        component.ngOnInit();
        expect(getTagsSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getBookmarks when call ngOnInit', () => {
        const getBookmarksSpy = spyOn(component, 'getBookmarks');
        component.ngOnInit();
        expect(getBookmarksSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getTags from service', () => {
        const getTagsSpy = spyOn(tagsService, 'getTags');
        component.getTags();
        expect(getTagsSpy).toHaveBeenCalledTimes(1);
    });

    it('should call getBookmarks from Service', () => {
        const getBookmarksSpy = spyOn(bookmarksService, 'getBookmarks');
        component.getBookmarks();
        expect(getBookmarksSpy).toHaveBeenCalledTimes(1);
    });

    it('should have updateBreadcrumbs function', () => {
        expect(component.updateBreadcrumbs).toBeTruthy();
    });

    it('should call update from breadcrumbsService when run updateBreadcrumbs function', () => {
        const updateSpy = spyOn(breadcrumbsService, 'update');
        component.updateBreadcrumbs();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });
});
