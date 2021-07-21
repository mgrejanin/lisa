import { PicpayIfRolesServiceModel } from '../picpay-if-roles.config';

export class PicpayIfRolesServiceMock implements PicpayIfRolesServiceModel {
    roles: string[];

    constructor(roles: string[]) {
        this.roles = roles;
    }

    getUserRoles(): string[] {
        return this.roles;
    }
}
