import { MockedComponent, MockModule } from 'ng-mocks';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent, SharedModule } from '@picpay/picpedia/shared';

import { mockTags } from '../../data-access/tags/mocks/tags.mock';
import { TagsQueryMock } from '../../data-access/tags/mocks/tags.query.mock';
import { TagsServiceMock } from '../../data-access/tags/mocks/tags.service.mock';
import { TagsQuery } from '../../data-access/tags/tags.query';
import { TagsService } from '../../data-access/tags/tags.service';
import { TagsComponent } from './tags.component';

describe('TagsComponent', () => {
    let component: TagsComponent;
    let fixture: ComponentFixture<TagsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(SharedModule)],
            declarations: [TagsComponent],
            providers: [
                { provide: TagsService, useClass: TagsServiceMock },
                { provide: TagsQuery, useClass: TagsQueryMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TagsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Template

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have c-tags__list--item list if have tags$ value', () => {
        const tagsList = fixture.debugElement.queryAll(By.css('.c-tags__list--item'));
        expect(tagsList.length).toEqual(mockTags.length);
        expect(tagsList).not.toBeNull();
    });

    it('should bind conditions to picpedia-badge component', () => {
        const tagsList = fixture.debugElement.queryAll(By.css('.c-tags__list--item'));
        expect(tagsList.length).toEqual(mockTags.length);

        const tagsListElement1 = tagsList[0].componentInstance as MockedComponent<BadgeComponent>;
        expect(tagsListElement1.description).toEqual(mockTags[0].tag_name);
    });

    it('should have c-tags__list--item" list if have tags$ value', () => {
        const tagsList = fixture.debugElement.queryAll(By.css('.c-tags__list--item'));
        expect(tagsList.length).toEqual(mockTags.length);
    });

    // Controller

    it('should have tags$ observable', () => {
        const tagsQuery = TestBed.inject(TagsQuery);
        expect(component.tags$).toEqual(tagsQuery.tags$);
    });

    it('should have ngOnInit function', () => {
        expect(component.ngOnInit).toBeTruthy();
    });

    it('should have getTags function', () => {
        expect(component.getTags).toBeTruthy();
    });

    it('should call getTags when call ngOnInit', () => {
        const getTagsSpy = spyOn(component, 'getTags');
        component.ngOnInit();
        expect(getTagsSpy).toHaveBeenCalledTimes(1);
    });
});
