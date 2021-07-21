import { Bookmark } from './bookmark.model';

export interface GetBookmarksResponse {
    msg: string;
    bookmarks: Bookmark[];
}
