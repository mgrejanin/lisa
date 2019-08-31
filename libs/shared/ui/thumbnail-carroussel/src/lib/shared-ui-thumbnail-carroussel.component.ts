import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ThumbnailCarrousselType } from '../symbols';

@Component({
  selector: 'lisa-shared-ui-thumbnail-carrousel',
  templateUrl: './shared-ui-thumbnail-carroussel.component.html',
  styleUrls: ['./shared-ui-thumbnail-carroussel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SharedUiThumbnailCarrousselComponent {
  @Input() roundedThumbnail: boolean;
  @Input() thumbnails: ThumbnailCarrousselType[];
}
