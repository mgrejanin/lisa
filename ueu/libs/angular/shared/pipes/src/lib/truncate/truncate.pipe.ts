import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, limit = 25, completeWords = false, ellipsis = '...'): string {
        // --------------------
        // OPTIONS:
        // LIMIT: The max number of characters you want.
        // COMPLETEWORDS: Tells if you want only complete words or not.
        // ELLIPSIS: Says what you want to put at the end of the truncated text.
        // --------------------

        // checks if the parameter  to use only complete words was passed
        // and uses the last blank space before the limit to truncate.

        if (completeWords) {
            const lastSpace = value.substr(0, limit).lastIndexOf(' ');

            return value.length > lastSpace && value.length > limit ? value.substr(0, lastSpace) + ellipsis : value;
        }

        return value.length > limit ? value.substr(0, limit) + ellipsis : value;
    }
}
