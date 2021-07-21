import { Address } from './address.model';
import { CurrentPlan } from '../plans/current-plan.model';
import { Ecommerce } from '../ecommerce/ecommerce.model';
import { Organization } from './organization.model';
import { Responsible } from './responsible.model';
import { User } from './user.model';

export interface SellerResponse {
    organization?: Organization;
    responsible?: Responsible;
    ecommerce?: Ecommerce;
    plan?: CurrentPlan;
    user?: User;
    address?: Address;
    hasBranch?: boolean;
    avatar_base64?: string;
    hasSellerAccount?: boolean;
    biometry?: boolean;
    completed?: boolean;
}
