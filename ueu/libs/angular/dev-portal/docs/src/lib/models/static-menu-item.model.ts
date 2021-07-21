export interface StaticMenuItem {
    id?: string;
    title: string;
    items: Item[];
}

interface Item {
    title: string;
    id: string;
}
