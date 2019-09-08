import { Component, Input } from "@angular/core";
import { ChatModel } from 'libs/shared/chat/data-access/src/lib/store/shared-chat.state';

@Component({
    selector: 'lisa-shared-chat-ui-component',
    templateUrl: './shared-chat-ui.component.html',
    styleUrls: ['./shared-chat-ui.component.scss']
})
export class SharedChatUiComponent{
    @Input() chats: ChatModel[];
}