import { InjectionToken } from '@angular/core';

export interface PicpayIfRolesServiceModel {
    getUserRoles(): string[];
}

export const PicpayIfRolesService = new InjectionToken<PicpayIfRolesServiceModel>('PicpayIfRolesServiceModel');
