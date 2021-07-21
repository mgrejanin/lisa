import { PicPayLabSectionService } from '../section/section.service';

describe('PicPayLabSectionService', () => {
    let service: PicPayLabSectionService;
    const mock = [
        {
            type: 'card-button',
            title: 'Lista de itens',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
            imageUrl: './assets/images/componente_lista.svg',
        },
        {
            type: 'markdown',
            title: 'Bloco de texto',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
            imageUrl: './assets/images/markdown.svg',
        },

        {
            type: 'coin_value',
            title: 'Cupom',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
            imageUrl: './assets/images/voucher.svg',
        },
        {
            type: 'banner',
            title: 'Banner Promocional',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
            imageUrl: './assets/images/componente_banner.svg',
        },
    ];
    beforeEach(() => {
        service = new PicPayLabSectionService();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return a exemple by type', () => {
        const value = service.getSections();
        expect(value).toEqual(mock);
    });
});