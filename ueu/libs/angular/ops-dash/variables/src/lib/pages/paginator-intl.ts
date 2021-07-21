import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Itens por página:';

    return paginatorIntl;
}
