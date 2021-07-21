import { ContactTag } from './contact-tag.model';

export interface ContactTagGroup {
    [key: string]: ContactTag[];
}
