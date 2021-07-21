import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PicpayIfRolesModule } from '@picpay/angular/shared/directives';

// components
import { DataCardComponent } from './data-card/data-card.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MobileFixedMenuComponent } from './mobile-fixed-menu/mobile-fixed-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';

@NgModule({
    declarations: [
        DataCardComponent,
        SideMenuComponent,
        MenuItemComponent,
        MobileFixedMenuComponent,
        UserDropdownComponent,
    ],
    imports: [
        A11yModule,
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatRippleModule,
        MatTooltipModule,
        RouterModule,
        PicpayIfRolesModule,
    ],
    exports: [DataCardComponent, SideMenuComponent, MenuItemComponent, MobileFixedMenuComponent, UserDropdownComponent],
})
export class UiComponentsModule {}
