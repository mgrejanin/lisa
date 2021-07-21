import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class TableIntlPtBr extends MatPaginatorIntl {
    itemsPerPageLabel = 'Registros por página: ';
    nextPageLabel = 'Página seguinte';
    previousPageLabel = 'Página anterior';

    getRangeLabel = function (page, pageSize, _length) {
        if (_length === 0 || pageSize === 0) {
            return `0 de ${_length}`;
        }

        const length = Math.max(_length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

        return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
}
