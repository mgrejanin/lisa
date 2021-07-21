import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { GroupListItemComponent } from './group-list-item/group-list-item.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SearchComponent } from './search/search.component';
import { UserCreateComponent } from './user-create/user-create.component';

// directives
import { FeatureFlagAuthDirectivesModule } from '@picpay/feature-flag/auth';

@NgModule({
    declarations: [GroupListComponent, SearchComponent, GroupListItemComponent, UserCreateComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatListModule,
        MatFormFieldModule,
        DesignSystemAngularModule,
        MatInputModule,
        MatSidenavModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatDialogModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        FeatureFlagAuthDirectivesModule,
    ],
    exports: [GroupListComponent, SearchComponent],
})
export class ComponentsModule {}
