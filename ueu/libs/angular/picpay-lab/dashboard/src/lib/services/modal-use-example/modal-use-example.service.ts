import { Injectable } from '@angular/core';
import { ModalUseExampleData } from '../../models/modal-use-example.model';

@Injectable()
export class PicPayLabModalUseExampleService {
    getUseExamples(componentType: string) {
        const examples: ModalUseExampleData[] = [
            {
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
            },
            {
                type: 'markdown',
                title: 'Exemplos de uso',
                description: 'Adicionar um texto sobre a marca ou a loja é um exemplo de aplicação da seção de Texto',
                examples: [
                    {
                        imageDescription: 'Texto sobre a marca',
                        imageUrl: './assets/images/lista_sem_detalhe.svg',
                    },
                ],
            },
            {
                type: 'coin_value',
                title: 'Exemplos de uso',
                description: 'Venda de vouchers e gift cards, são exemplos de aplicação da seção de Cupom',
                examples: [
                    {
                        imageDescription: 'Texto sobre a marca',
                        imageUrl: './assets/images/lista_com_detalhe.svg',
                    },
                    {
                        imageDescription: 'Texto sobre a marca',
                        imageUrl: './assets/images/lista_sem_detalhe.svg',
                    },
                ],
            },
            {
                type: 'list',
                title: 'Exemplos de uso',
                description: 'Venda de vouchers e gift cards, são exemplos de aplicação da seção de Cupom',
                examples: [
                    {
                        imageDescription: 'Texto sobre a marca',
                        imageUrl: './assets/images/lista_com_detalhe.svg',
                    },
                    {
                        imageDescription: 'Texto sobre a marca',
                        imageUrl: './assets/images/lista_sem_detalhe.svg',
                    },
                ],
            },
        ];
        return examples.find(item => item.type === componentType);
    }
}
