import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// directives
import { FeatureFlagIfRolesDirective } from './if-roles/if-roles.directive';

@NgModule({
    declarations: [FeatureFlagIfRolesDirective],
    imports: [CommonModule],
    exports: [FeatureFlagIfRolesDirective],
})
export class FeatureFlagAuthDirectivesModule {}
