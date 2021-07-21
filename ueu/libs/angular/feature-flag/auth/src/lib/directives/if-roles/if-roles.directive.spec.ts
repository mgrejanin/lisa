// @angular
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthQuery, AuthQueryMock, AuthService, AuthServiceMock } from '../../data-access';

// directives
import { FeatureFlagIfRolesDirective } from './if-roles.directive';

// mocks
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// DUMMY COMPONENT
@Component({
    template: `
        <div *featureFlagIfRoles="adminOnly" id="globalAdminOnly">should be hidden</div>

        <div *featureFlagIfRoles="editorOnly" id="globalEditorOnly">should be hidden</div>

        <div *featureFlagIfRoles="squadAdminOnly" id="squadAdminOnly">should be visible</div>

        <div *featureFlagIfRoles="squadEditorOnly" id="squadEditorOnly">should be visible</div>

        <div *featureFlagIfRoles="adminOnly; else adminElseTemplate" id="ifElseAdminExampleHidden">
            should be hidden
        </div>
        <ng-template #adminElseTemplate><div id="ifElseAdminExample">should be visible</div></ng-template>

        <div *featureFlagIfRoles="squadAdminOnly; else adminElseHiddenTemplate" id="ifElseSquadAdminExample">
            should be visible
        </div>
        <ng-template #adminElseHiddenTemplate
            ><div id="ifElseSquadAdminExampleHidden">should be hidden</div></ng-template
        >

        <div *featureFlagIfRoles="editorOnly; else editorElseTemplate" id="ifElseEditorExampleHidden">
            should be hidden
        </div>
        <ng-template #editorElseTemplate><div id="ifElseEditorExample">should be visible</div></ng-template>

        <div *featureFlagIfRoles="squadEditorOnly; else editorElseHiddenTemplate" id="ifElseSquadEditorExample">
            should be visible
        </div>
        <ng-template #editorElseHiddenTemplate
            ><div id="ifElseSquadEditorExampleHidden">should be hidden</div></ng-template
        >

        <div
            *featureFlagIfRoles="squadEditorOnly; then squadEditorThenTemplate; else squadEditorElseTemplate"
            id="thenExample"
        >
            should be visible
        </div>
        <ng-template #squadEditorThenTemplate><div id="editorThenTemplate">should be visible</div></ng-template>
        <ng-template #squadEditorElseTemplate><div id="editorElseTemplate">should be hidden</div></ng-template>
    `,
})
class DummyComponent {
    adminOnly = { availableToAdmin: true };
    editorOnly = { availableToEditor: true };
    squadAdminOnly = { availableToSquadAdmin: ['FeatureManagement'] };
    squadEditorOnly = { availableToSquadEditor: ['P2M'] };
}

describe('FeatureFlagIfRolesDirective', () => {
    let fixture: ComponentFixture<DummyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DummyComponent, FeatureFlagIfRolesDirective],
            imports: [RouterTestingModule],
            providers: [
                { provide: AuthQuery, useValue: new AuthQueryMock(true) },
                { provide: AuthService, useValue: new AuthServiceMock(true) },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(DummyComponent);
        fixture.detectChanges();
    });

    it('should display content correctly', () => {
        // if true | false
        const adminOnly = fixture.debugElement.query(By.css('#globalAdminOnly'));
        const editorOnly = fixture.debugElement.query(By.css('#globalEditorOnly'));
        const squadAdminOnly = fixture.debugElement.query(By.css('#squadAdminOnly'));
        const squadEditorOnly = fixture.debugElement.query(By.css('#squadEditorOnly'));

        // if then else
        const ifElseAdminExampleHidden = fixture.debugElement.query(By.css('#ifElseAdminExampleHidden'));
        const ifElseAdminExample = fixture.debugElement.query(By.css('#ifElseAdminExample'));
        const ifElseSquadAdminExample = fixture.debugElement.query(By.css('#ifElseSquadAdminExample'));
        const ifElseSquadAdminExampleHidden = fixture.debugElement.query(By.css('#ifElseSquadAdminExampleHidden'));

        const ifElseEditorExampleHidden = fixture.debugElement.query(By.css('#ifElseEditorExampleHidden'));
        const ifElseEditorExample = fixture.debugElement.query(By.css('#ifElseEditorExample'));
        const ifElseSquadEditorExample = fixture.debugElement.query(By.css('#ifElseSquadEditorExample'));
        const ifElseSquadEditorExampleHidden = fixture.debugElement.query(By.css('#ifElseSquadEditorExampleHidden'));

        const thenExample = fixture.debugElement.query(By.css('#thenExample'));
        const editorThenTemplate = fixture.debugElement.query(By.css('#editorThenTemplate'));
        const editorElseTemplate = fixture.debugElement.query(By.css('#editorElseTemplate'));

        expect(adminOnly).toBeNull();
        expect(editorOnly).toBeNull();
        expect(squadAdminOnly).not.toBeNull();
        expect(squadEditorOnly).not.toBeNull();

        expect(ifElseAdminExampleHidden).toBeNull();
        expect(ifElseAdminExample).not.toBeNull();
        expect(ifElseSquadAdminExample).not.toBeNull();
        expect(ifElseSquadAdminExampleHidden).toBeNull();

        expect(ifElseEditorExampleHidden).toBeNull();
        expect(ifElseEditorExample).not.toBeNull();
        expect(ifElseSquadEditorExample).not.toBeNull();
        expect(ifElseSquadEditorExampleHidden).toBeNull();

        expect(thenExample).toBeNull();
        expect(editorThenTemplate).not.toBeNull();
        expect(editorElseTemplate).toBeNull();
    });
});
