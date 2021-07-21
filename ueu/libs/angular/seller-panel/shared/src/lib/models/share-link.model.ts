import { SafeUrl } from '@angular/platform-browser';

export interface ShareLinksConfig {
    title: string;
    contentToCopy?: string;
    links?: Links[];
}

export interface Links {
    label: string;
    icon?: string;
    href(): SafeUrl;
    click?(): void;
}
