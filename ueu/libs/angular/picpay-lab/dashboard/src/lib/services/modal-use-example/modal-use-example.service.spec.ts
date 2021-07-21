import { PicPayLabModalUseExampleService } from './modal-use-example.service';

describe('PicPayLabModalUseExampleService', () => {
    let service: PicPayLabModalUseExampleService;
    const mock = {
        type: 'banner',
        title: 'Exemplos de uso',
        description:
            'Venda de produtos unitários e serviços por recorrência, são exemplos de aplicação da seção de Banner',
        examples: [
            {
                imageDescription: 'Venda de produto (com ou sem tela de detalhes)',
                imageUrl: './assets/images/lista_com_detalhe.svg',
            },
            {
                imageDescription: 'Venda por assinatura (com ou sem tela de detalhes)',
                imageUrl: './assets/images/lista_com_detalhe.svg',
            },
        ],
    };
    beforeEach(() => {
        service = new PicPayLabModalUseExampleService();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return a exemple by type', () => {
        const value = service.getUseExamples('banner');
        expect(value).toEqual(mock);
    });
});
