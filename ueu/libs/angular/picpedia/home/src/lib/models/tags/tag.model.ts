import { TagType } from './tag-type.model';

export class Tag {
    tag_name: string;
    tag_count?: number;
    tag_type?: TagType;

    constructor(tag?: Partial<Tag>) {
        this.tag_name = tag?.tag_name || '';
        this.tag_count = tag?.tag_count;
        this.tag_type = tag?.tag_type;
    }
}
