import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '@lisa/shared/core/data-access';
import { NguCarouselConfig } from '@ngu/carousel';
import 'hammerjs';
import { ChatModel } from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';

@Component({
  selector: 'lisa-shared-chat-ui-component',
  templateUrl: './shared-chat-ui.component.html',
  styleUrls: ['./shared-chat-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedChatUiComponent implements AfterViewInit {
  @Input() chats: ChatModel[];

  @Output() sendMessageAction = new EventEmitter<string>();
  @Output() speakMessageAction = new EventEmitter<string>();

  userMessage = new FormControl();

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 3, lg: 3, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  public carouselTileItems = {
    show_wines: environment.show_wines,
    frutas: environment.frutas
  };

  sendMessage() {
    if (!this.userMessage.value) {
      return;
    }

    this.sendMessageAction.emit(this.userMessage.value);
    this.userMessage.reset();
  }
}
