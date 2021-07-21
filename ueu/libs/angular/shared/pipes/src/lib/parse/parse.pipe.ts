import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description
 * The method parses a JSON string, constructing the JavaScript value or object described by the string
 *
 * @usageNotes
 * The following example uses a JSON parse pipe to convert a stringified object
 * into an object, you can then use this object to display information contained on it.
 *
 * ```
 * <div *ngIf="stringifiedObject | parse as object">
 *  {{ object.summary_texts.title }}
 *  {{ object.summary_texts.description }}
 * </div>
 * ```
 */
@Pipe({
    name: 'parse',
})
export class ParsePipe implements PipeTransform {
    transform(value: string): Record<string, unknown> {
        return JSON.parse(value);
    }
}
