export interface CompanyData {
    company_cnpj: string;
    company_social: string;
    company_type: string;
}

export interface CompanyDataResponse {
    data: {
        mei: boolean;
        digital_account: boolean;
        validated: boolean;
    };
}

export interface CompanyTypes {
    value: string;
}

export const companyTypesValues = [
    { value: 'Advocacia' },
    { value: 'Alimentos' },
    { value: 'Artes / Artesanato' },
    { value: 'Alimentos' },
    { value: 'Advocacia' },
    { value: 'Artes / Artesanato' },
    { value: 'Banca de Jornal' },
    { value: 'Bar / Casa Noturna' },
    { value: 'Bijuterias / Jóias / Acessórios' },
    { value: 'Café / Restaurante / Entrega em Domicílio' },
    { value: 'Cama, Mesa e Banho' },
    { value: 'Consultoria' },
    { value: 'Cooperativa / Associação' },
    { value: 'Educação / Treinamento / Professor Particular' },
    { value: 'Eletrodomésticos' },
    { value: 'Esportes; Venda de Artigos, Atividades e Treinamento' },
    { value: 'Estúdio de Tatuagem' },
    { value: 'Eventos / Shows / Música' },
    { value: 'Farmácia' },
    { value: 'Fotógrafo' },
    { value: 'Hotel / Hospedagem' },
    { value: 'Jardinagem e Paisagismo' },
    { value: 'Lanchonete / Padaria' },
    { value: 'Loja de Bebidas' },
    { value: 'Manutenção de ar condicionado e máquinas em geral' },
    { value: 'Manutenção de Computadores, Serviços de TI e Telecom' },
    { value: 'Marceneiro / Pedreiro / Pintor' },
    { value: 'Médico' },
    { value: 'Móveis e Decoração' },
    { value: 'Oficinas Mecânicas de Carros e Motos / Acessórios' },
    { value: 'Organização Beneficiente' },
    { value: 'Outros Prestadores de Serviços' },
    { value: 'Personal Trainer / Academia / SPA' },
    { value: 'Postos de combustivel' },
    { value: 'Recreação / Entretenimento' },
    { value: 'Restaurante Fast Food / Trailer de Laches' },
    { value: 'Salão de Beleza / Cabelereiro / Barbeiro' },
    { value: 'Salas de cinema' },
    { value: 'Serralheria' },
    { value: 'Serviço de desenho, marketing e publicidade' },
    { value: 'Serviços de Limpeza' },
    { value: 'Supermercado' },
    { value: 'Suplementos Alimentares' },
    { value: 'Táxi / Aplicativo de Transporte / Motorista' },
    { value: 'Venda de Artigos Importados (Eletrônicos, Roupas e Perfumes)' },
    { value: 'Venda de Auto Peças' },
    { value: 'Venda de Computadores, Eletrônicos e Telecom' },
    { value: 'Venda de produtos de beleza e cosméticos' },
    { value: 'Vestuário / Moda' },
    { value: 'Veterinário / Petshop / Canil' },
    { value: 'Viagens e turismo' },
    { value: 'Vidraçaria' },
    { value: 'Outros' },
];
