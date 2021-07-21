import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// directives
import { TrackClickDirective } from './track-click/track-click.directive';

@NgModule({
    declarations: [TrackClickDirective],
    exports: [TrackClickDirective],
    imports: [CommonModule],
})
export class SharedTrackEventsDirectivesModule {}
