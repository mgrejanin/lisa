// @angular
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';

// modules
import { By } from '@angular/platform-browser';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// ng-mocks
import { MockComponent, MockedComponent, MockModule } from 'ng-mocks';

// components
import { GroupListItemComponent } from '../group-list-item/group-list-item.component';
import { GroupListComponent } from './group-list.component';

// directives
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';

describe('GroupListComponent', () => {
    let component: GroupListComponent;
    let fixture: ComponentFixture<GroupListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [GroupListComponent, MockComponent(GroupListItemComponent)],
            imports: [
                MockModule(MatListModule),
                DesignSystemAngularModule,
                MockModule(FeatureFlagAuthDirectivesModule),
            ],
        });
        fixture = TestBed.createComponent(GroupListComponent);
        component = fixture.componentInstance;
        component.squads = [];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TEMPLATE

    it('should display squads received as input (dynamic items)', () => {
        const squadsMock = [
            {
                id: 'AdequacaoRegulatoria',
                name: 'Adequação Regulatória',
            },
            {
                id: 'Adquirentes',
                name: 'Adquirentes',
            },
        ];

        component.squads = squadsMock;

        fixture.detectChanges();

        const items = fixture.debugElement.queryAll(By.css('.c-group-container__list--item-dynamic'));
        const firstDynamicItem = items[0].componentInstance as MockedComponent<GroupListItemComponent>;
        const secondDynamicItem = items[1].componentInstance as MockedComponent<GroupListItemComponent>;

        expect(items).not.toBeNull();

        expect(items).toHaveLength(2);

        // Testing the first item inputs
        expect(firstDynamicItem.id).toEqual(squadsMock[0].id);
        expect(firstDynamicItem.title).toEqual(squadsMock[0].name);
        expect(firstDynamicItem.link[0]).toEqual('/acessos/squad/AdequacaoRegulatoria');

        // Testing the second item inputs
        expect(secondDynamicItem.id).toEqual(squadsMock[1].id);
        expect(secondDynamicItem.title).toEqual(squadsMock[1].name);
        expect(secondDynamicItem.link[0]).toEqual('/acessos/squad/Adquirentes');
    });
});
