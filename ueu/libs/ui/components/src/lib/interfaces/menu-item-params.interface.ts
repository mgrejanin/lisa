// interfaces
import { SubmenuItemParams } from './submenu-item-params.interface';

export class MenuItemParams {
    constructor(
        public icon: string,
        public text: string,
        public route: string,
        public submenus?: SubmenuItemParams[],
        public disabled?: boolean,
        public roles?: string[],
    ) {}
}
