import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PicpayIfRolesService } from './picpay-if-roles.config';
import { PicpayIfRolesDirective } from './picpay-if-roles.directive';
import { PicpayIfRolesDefaultService } from './pipcay-if-roles-default-service.service';

@NgModule({
    declarations: [PicpayIfRolesDirective],
    exports: [PicpayIfRolesDirective],
    imports: [CommonModule],
    providers: [{ provide: PicpayIfRolesService, useClass: PicpayIfRolesDefaultService }],
})
export class PicpayIfRolesModule {}
