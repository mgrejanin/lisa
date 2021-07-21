import { PicpayIfRolesServiceModel } from './picpay-if-roles.config';

export class PicpayIfRolesDefaultService implements PicpayIfRolesServiceModel {
    getUserRoles(): string[] {
        return [];
    }
}
