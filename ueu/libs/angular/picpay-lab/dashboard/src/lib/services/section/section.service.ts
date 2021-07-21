import { Injectable } from '@angular/core';
import { Section } from '../../models/section.model';

@Injectable()
export class PicPayLabSectionService {
    getSections(): Section[] {
        const sections = [
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
        ] as Section[];

        return sections;
    }
}
