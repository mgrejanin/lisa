import { Documentation } from './documentation.model';

export interface Product {
    id: number;
    category: string;
    name: string;
    description: string;
    slug: string;
    panel_url?: string | null;
    documentations?: Documentation[];
}
