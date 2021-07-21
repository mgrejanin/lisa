import { of } from 'rxjs';

export class ProductsServiceMock {
    getProducts() {
        return of({
            message: 'Products found successfully!',
            data: [
                {
                    id: '4962d040-08e9-11eb-89b3-cf46723b0d71',
                    category: 'Webhook',
                    name: 'Assinaturas',
                    slug: 'assinaturas',
                    description: 'Lorem Ipsum.',
                    panel_url: null,
                    documentations: [
                        {
                            id: '4963d1e0-08e9-11eb-9a8e-e9cf47337473',
                            type: 'external',
                            environment: 'production',
                            url: 'http://membership.ms.prod/v1/docs/webhooks',
                        },
                        {
                            id: '4964d570-08e9-11eb-b136-e55cf3d72cb2',
                            type: 'internal',
                            environment: 'production',
                            url: 'http://membership.ms.prod/v1/docs/api',
                        },
                    ],
                },
                {
                    id: '49671d20-08e9-11eb-b01b-d74636796fc3',
                    category: 'Custom API',
                    name: 'B2P',
                    slug: 'b2p',
                    description: 'Lorem Ipsum.',
                    panel_url: 'https://lojista.picpay.com/login',
                    documentations: [
                        {
                            id: '4967e3a0-08e9-11eb-9889-c3eb8a59d8e7',
                            type: 'external',
                            environment: 'production',
                            url: 'http://example.com/',
                        },
                    ],
                },
                {
                    id: '49659800-08e9-11eb-aa66-a537f56dca07',
                    category: 'Internal API',
                    name: 'Dev Portal',
                    slug: 'dev-portal',
                    description: 'Lorem Ipsum.',
                    panel_url: null,
                    documentations: [
                        {
                            id: '49666540-08e9-11eb-b55b-339f3e9ceedd',
                            type: 'internal',
                            environment: 'sandbox',
                            url: 'http://devportal.sandbox.limbo.work:8088/docs/api-docs.json',
                        },
                    ],
                },
                {
                    id: '49689380-08e9-11eb-8d13-19b7fbc619dc',
                    category: 'Plug and Play',
                    name: 'E-commerce',
                    slug: 'e-commerce',
                    description: 'Lorem Ipsum.',
                    panel_url: 'https://ecommerce.picpay.com/',
                    documentations: [
                        {
                            id: '49693fe0-08e9-11eb-b119-899c5b678958',
                            type: 'external',
                            environment: 'production',
                            url: 'http://example.com/',
                        },
                    ],
                },
            ],
        });
    }

    getPanels() {
        return of({
            message: 'Panels found successfully!',
            data: [
                {
                    name: 'Painel Lojista',
                    description: 'Lorem Ipsum',
                    url: 'https://lojista.picpay.com/login',
                },
                {
                    name: 'Painel E-commerce',
                    description: 'Lorem Ipsum',
                    url: 'https://ecommerce.picpay.com/',
                },
            ],
        });
    }

    getDocJson() {
        return of({});
    }
}
