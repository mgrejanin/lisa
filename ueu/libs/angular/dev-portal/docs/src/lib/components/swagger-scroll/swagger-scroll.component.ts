import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Endpoint, Method, Path, Product, ProductsQuery, ProductsService, SwaggerDoc } from '@picpay/dev-portal/shared';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { EndpointGroup } from '../../models/endpoint-group.model';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, take } from 'rxjs/operators';
import { StaticMenuItem } from '../../models/static-menu-item.model';
import { getMenuItemsBySlug } from '../../helpers/static-menu.helper';

@Component({
    selector: 'dev-portal-docs-swagger-scroll',
    templateUrl: './swagger-scroll.component.html',
    styleUrls: ['./swagger-scroll.component.scss'],
})
export class SwaggerScrollComponent implements OnInit {
    endpoints: Endpoint[] = [];
    endpointGroup: EndpointGroup[];
    isLoading = false;
    isVersionOpen = false;
    tags: string[] = [];
    accordionOpenedByDefault = false;
    staticItems: StaticMenuItem[];

    activeProduct$: Observable<Product>;
    apiUrl$: Observable<string>;
    currentDoc: string;
    docVersions$: Observable<string[]>;
    docLoadSuccess$: Observable<boolean>;

    @Output() menuSelected = new EventEmitter();
    @Input() slug: string;

    constructor(
        public location: Location,
        private query: ProductsQuery,
        private service: ProductsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.activeProduct$ = this.query.activeProduct$;
        this.apiUrl$ = this.query.activeProductApiUrl$;
        this.docLoadSuccess$ = this.query.docLoadSuccess$;
        this.docVersions$ = this.query.docVersions$;
    }

    ngOnInit(): void {
        this.apiUrl$
            .pipe(distinctUntilChanged(), subscribeUntil(this))
            .subscribe((api: string) => this.loadApiJson(api));

        this.route.params.pipe(subscribeUntil(this)).subscribe((params: Params) => {
            this.staticItems = getMenuItemsBySlug(params.slug);
            if (params.version) {
                this.currentDoc = params.version;
            }
        });
    }

    /**
     * Creates a reference with all the tags found within all endpoints
     */
    mapEndpointTags(tag: string): void {
        if (this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
        }
    }

    /**
     * Run through all the keys inside the endpoint method passed then returns all its contents into an array
     * Note that we pass the obect path and method name ahead so we can use them later, in case we need it
     */
    extractMethodByKeyNames(obj: Method): Endpoint {
        return Object.keys(obj)
            .filter(name => name !== 'path')
            .map(name => {
                // We ignore the path key, we only use this property to pass the path name ahead
                const tag = obj[name].tags[0];
                // Since we know each endpoint tag here we can store them in a local var to help grouping
                this.mapEndpointTags(tag);
                return { tag, path: obj.path, method: name, ...obj[name] };
            })
            .shift();
    }

    /**
     * Run through all the keys inside the path object passed then returns all its children into an array
     * Note that we pass the name key of the object ahead as a path param so we can use that later
     */
    extractPathsByKeyNames(obj: Path): Method[] {
        return Object.keys(obj).map(name => ({ ...obj[name], path: name }));
    }

    /**
     * Replaces the periods from the string to '\.' so it matches the swaggerUi name algorithm
     */
    normalizeStringPeriods(str: string): string {
        return str.replace(/\./g, '\\.');
    }

    /**
     * Generates the anchor links so we can match swagger ids algorithm
     * Note that we have two ways of doing so, when we have operations ID and when we don't
     */
    generateAnchorLink(endpoint: Endpoint): string {
        if (endpoint.operationId) {
            return `operations-${this.normalizeStringPeriods(
                endpoint.tags.join('-').replace(/\s/g, '_'),
            )}-${this.normalizeStringPeriods(endpoint.operationId)}`;
        }

        return `operations-${this.normalizeStringPeriods(endpoint.tags.join('-').replace(/\s/g, '_'))}-${
            endpoint.method
        }${this.normalizeStringPeriods(endpoint.path.replace(/\{|\}/g, '_').replace(/\.|-|\//g, '_'))}`;
    }

    /**
     * Returns an array containing all the endpoint methods
     */
    getEndpointGroups(endpoints: Endpoint[]): EndpointGroup[] {
        return this.tags.map(item => {
            const endpointGroup: EndpointGroup = {
                tag: item,
                endpoints: endpoints.filter(endpoint => endpoint.tag === item),
            };
            return endpointGroup;
        });
    }

    /**
     * Start the proccess to digest the API JSON then returns the endpoints grouped by tag
     * @param doc JSON received from the API
     */
    parseDocumentationObject(doc: SwaggerDoc): EndpointGroup[] {
        this.tags = [];
        this.endpoints = [];

        of(this.extractPathsByKeyNames(doc.paths))
            .pipe(
                take(1),
                mergeMap(path => path),
                map(path => this.extractMethodByKeyNames(path)),
            )
            .subscribe((res: Endpoint) => {
                this.endpoints.push(res);
            });

        return this.getEndpointGroups(this.endpoints);
    }

    /**
     * Loads the current product api JSON
     */
    loadApiJson(url: string): void {
        this.endpointGroup = [];
        if (!url) {
            return;
        }
        this.isLoading = true;
        this.service
            .getDocJson(url)
            .pipe(subscribeUntil(this))
            .subscribe(
                (apiDoc: SwaggerDoc) => {
                    this.endpointGroup = this.parseDocumentationObject(apiDoc);
                    this.isLoading = false;
                },
                () => {
                    this.service.updateDocumentationLoadStatus(false);
                },
            );
    }

    /**
     * Scrolls the page to the element passed. Uses the id as reference
     */
    scrollToElement(id: string): void {
        const el: HTMLElement = document.getElementById(id);
        if (el) {
            el.scrollIntoView();
        }

        this.menuSelected.emit();
    }

    /**
     * Navigates back
     */
    onBackHandler(): void {
        this.location.back();
    }

    /**
     * Toggles doc version selector visibility
     */
    toggleVersionSelector(): void {
        this.isVersionOpen = !this.isVersionOpen;
    }

    /**
     * Update the url triggering the resolver that updates the documentation version
     */
    updateDocVersion(version: string): void {
        // TO-DO: event tracking
        this.toggleVersionSelector();
        this.router.navigate([`/docs/${this.slug}/${version}`]);
    }
}
