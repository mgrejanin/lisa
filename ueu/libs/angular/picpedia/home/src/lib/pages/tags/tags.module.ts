import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@picpay/picpedia/shared';

import { TagsRoutingModule } from './tags-routing.module';
import { TagsComponent } from './tags.component';

@NgModule({
    declarations: [TagsComponent],
    imports: [CommonModule, TagsRoutingModule, SharedModule],
})
export class TagsModule {}
