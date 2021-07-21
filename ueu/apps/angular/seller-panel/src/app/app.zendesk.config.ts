import { NgxZendeskWebwidgetConfig } from 'ngx-zendesk-webwidget';
export class ZendeskConfig extends NgxZendeskWebwidgetConfig {
    accountUrl = 'webWidget';
    callback(zE) {
        zE.setLocale('pt');
        zE.show();
    }
}
