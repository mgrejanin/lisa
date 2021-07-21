import { Tag } from './tag.model';

export interface GetTagsResponse {
    msg: string;
    tags: Tag[];
}
