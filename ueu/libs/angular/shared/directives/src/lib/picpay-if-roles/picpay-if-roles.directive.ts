import { Directive, Inject, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PicpayIfRolesService, PicpayIfRolesServiceModel } from './picpay-if-roles.config';

@Directive({
    selector: '[picpayIfRoles]',
})
export class PicpayIfRolesDirective implements OnChanges {
    @Input() set picpayIfRoles(roles: string[]) {
        this.roles = roles;
    }

    private roles: string[];

    constructor(
        @Inject(PicpayIfRolesService) private service: PicpayIfRolesServiceModel,
        private viewContainer: ViewContainerRef,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        private templateRef: TemplateRef<any>,
    ) {}

    ngOnChanges() {
        this.setVisibility();
    }

    setVisibility() {
        if (this.roles.length === 0 || this.roles.some(role => this.service.getUserRoles().includes(role))) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return;
        }

        this.viewContainer.clear();
    }
}
