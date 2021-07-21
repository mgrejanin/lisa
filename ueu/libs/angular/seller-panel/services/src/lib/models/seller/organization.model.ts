export interface Organization {
    id?: number;
    name?: string;
    razaoSocial?: string;
    nomeFantasia?: string;
    image?: string;
    cpfCnpj?: string;
    email?: string;
    type?: string; // biz | ecommerce | pav
    pessoaFisica?: boolean;
    phone?: string;
    mcc_category_id?: string;
    category?: { id: number; name: string };
    nature_company?: string;
    individual?: boolean;
}
