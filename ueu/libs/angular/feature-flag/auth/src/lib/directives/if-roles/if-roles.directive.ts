import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// rxjs
import { take } from 'rxjs/operators';

// data-acess
import { AuthQuery, AuthService } from '../../data-access';

// interfaces
import { AuthUserRoles, createFeatureFlagPermissions, FeatureFlagPermissions } from '../../models';

/**
 * Directive used to control if a content is available or not
 * to a logged user based on predefined allowed permissions.
 *
 * @param featureFlagIfRoles
 *  Receives a Partial<FeatureFlagPermissions> with the permissions you need.
 *
 * @example <caption>Using the directive with a variable on the TS.</caption>
 *  <element *featureFlagIfRoles="adminOnly"> </element>
 *
 * @example <caption>Using the directive with an inline value.</caption>
 *  <element *featureFlagIfRoles="{availableToAdmin: true}"> </element>
 */
@Directive({
    selector: '[featureFlagIfRoles]',
})
export class FeatureFlagIfRolesDirective {
    @Input() set featureFlagIfRoles(value: Partial<FeatureFlagPermissions>) {
        this.allowed = value;
        this.setVisibility();
    }

    @Input() set featureFlagIfRolesThen(templateRef: TemplateRef<unknown> | null) {
        this.thenTemplateRef = templateRef;
        this.thenViewRef = null;
        this.setVisibility();
    }

    @Input() set featureFlagIfRolesElse(templateRef: TemplateRef<unknown> | null) {
        this.elseTemplateRef = templateRef;
        this.elseViewRef = null;
        this.setVisibility();
    }

    private allowed: Partial<FeatureFlagPermissions>;
    private readonly roles$: Observable<AuthUserRoles>;

    private thenViewRef: EmbeddedViewRef<unknown> | null = null;
    private elseViewRef: EmbeddedViewRef<unknown> | null = null;
    private elseTemplateRef: TemplateRef<unknown> | null;

    constructor(
        private viewContainer: ViewContainerRef,
        private thenTemplateRef: TemplateRef<unknown>,
        private authQuery: AuthQuery,
        private authService: AuthService,
    ) {
        this.roles$ = this.authQuery.roles$;
    }

    private setVisibility(): void {
        if (this.canShow) {
            if (!this.thenViewRef) {
                this.viewContainer.clear();
                this.elseViewRef = null;
                if (this.thenTemplateRef) {
                    this.thenViewRef = this.viewContainer.createEmbeddedView(this.thenTemplateRef);
                }
            }
        } else {
            if (!this.elseViewRef) {
                this.viewContainer.clear();
                this.thenViewRef = null;
                if (this.elseTemplateRef) {
                    this.elseViewRef = this.viewContainer.createEmbeddedView(this.elseTemplateRef);
                }
            }
        }
    }

    private get canShow(): boolean {
        let isValid = false;
        this.roles$.pipe(take(1)).subscribe(userRoles => {
            isValid = this.authService.hasPermissions(userRoles, createFeatureFlagPermissions(this.allowed));
        });
        return isValid;
    }
}
