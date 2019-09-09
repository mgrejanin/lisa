import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChatModel } from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lisa-shared-chat-ui-component',
  templateUrl: './shared-chat-ui.component.html',
  styleUrls: ['./shared-chat-ui.component.scss']
})
export class SharedChatUiComponent {
  @Input() chats: ChatModel[];

  @Output() sendMessageAction = new EventEmitter<string>();

  userMessage = new FormControl();

  show_wines: [
    {
      img: 'assets/imgs/vinho1.jpg';
      desconto: 20;
      descricao: 'Vinho periquita 750ml';
    },
    {
      img: 'assets/imgs/vinho2.jpg';
      desconto: 10;
      descricao: 'Vinho Concha Y Toro 750 ml';
    },
    {
      img: 'assets/imgs/vinho3.jpg';
      desconto: 15;
      descricao: 'inho Nacional Pérgola 1 Litro';
    }
  ];
  frutas: [
    {
      img: 'assets/imgs/fruta1.jpg';
      desconto: 20;
      descricao: 'Maçã';
    },
    {
      img: 'assets/imgs/fruta2.jpg';
      desconto: 10;
      descricao: 'Kiwi';
    },
    {
      img: 'assets/imgs/fruta3.jpg';
      desconto: 15;
      descricao: 'Carambola';
    }
  ];

  sendMessage() {
    if (!this.userMessage.value) {
      return;
    }

    this.sendMessageAction.emit(this.userMessage.value);
    this.userMessage.reset();
  }
}
