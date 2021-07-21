import { CurrentPlan } from '../plans/current-plan.model';
import { Ecommerce } from './ecommerce.model';
import { Organization } from '../seller/organization.model';
import { Responsible } from '../seller/responsible.model';
import { Address } from '../seller';

export interface UpdatePlanResponse {
    organization?: Organization;
    ecommerce?: Ecommerce;
    responsible?: Responsible;
    plan?: CurrentPlan;
    address?: Address;
}
