import { Product } from './product.model';

export interface Project {
    id?: number;
    name: string;
    description?: string;
    image?: Blob | string;
    owner_name?: string;
    created_at?: Date;
    updated_at?: Date;
    favorite: boolean;
    products?: Product[];
}
