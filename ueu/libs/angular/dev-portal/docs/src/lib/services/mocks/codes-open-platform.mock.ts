/* eslint-disable max-len */
import outdent from 'outdent';

export const CodesOpenPlatformMock = {
    storeHeader: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "referenceId": 102030,
                "callbackUrl": "http: //localhost/mockVtexPostCallback/?httpStatus=200",
                "expiresAt": "2019-09-15T15: 53: 00+05: 00",
                "returnUrl": "http: //www.picpay.com/#transacaoConcluida",
                "value": 1,
                "plugin": "magento2",
                "additionalInfo": [null],
                "buyer": {
                    "firstName": "João",
                    "lastName": "da Silva",
                    "document": "123.456.789-10",
                    "email": "joao.casteluber@picpay.com",
                    "phone": "+55 27 98802-0195"
                }
            }`,
        },
    ],
    storeHeaderTable: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "message": "o token informado é invalido"
            }`,
        },
    ],
    textTitle: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "type": "title",
                "text": "PicPay"
            }`,
        },
    ],
    textMarkdown: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "type": "markdown",
                "text": "<b>Produtos gostosos</b> que dão <i>vontade de comer de novo.</i> Produtos nutritivos para dar <u>aquela força extra nas suas atividades.</u> <b>Buscamos incansavelmente fornecedores para trazer os mais frescos</b> ingredientes para nossas receitas que são cuidadosamente pensadas para encontrar aquele ponto ótimo no qual sabor e saúde se encontram. <ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>"
            }`,
        },
    ],
    buttonLink: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "type": "button_link",
                "text": "Saiba Mais"
            }`,
        },
    ],
    buttonMarkdown: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "type": "button",
                "text": "Saiba Mais"
            }`,
        },
    ],
    listLink: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "type": "list",
                "items": [
                    {
                        "type": "product_card_item"
                    },
                    {
                        "type": "product_card_item"
                    }
                ]
            }`,
        },
    ],
    actionsFormKeys: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: `{
                "action": {
                    "type": "...",
                    "form_keys": ["cep", "cnpj"]
                }
            }`,
        },
    ],
    actionsWebview: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "action": {
                    "property": {
                        "webview": {
                            "url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html"
                        }
                    },
                    "type": "webview"
                }
            }`,
        },
    ],
    exempleJsonComplete: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "components": [
                    {
                        "text": "Ifood",
                        "type": "title"
                    },
                    {
                        "text": "Escolha um item:",
                        "type": "subtitle"
                    },
                    {
                        "items": [
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood.",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "value": "10.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 10,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood.",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": "20.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 20,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood. ",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": "30.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 30,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood. ",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": "50.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 50,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood. ",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": "70.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 70,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "code": "card_100",
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood. ",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": 100
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "key": "card",
                                "spotlight": "Ifood Card",
                                "value": "R$ 100,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood. ",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": "150.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 150,00"
                            },
                            {
                                "action": {
                                    "property": {
                                        "payment": {
                                            "description": "Pede um ifood!",
                                            "disclaimer": "**Importante**: Você receberá o código PIN no valor da recarga escolhida após o pagamento. O crédito não é reembolsável pelo PicPay. <br><br>**Instruções de Resgate** <br>1. Abra seu iFood e clique em <i>Perfil </i><br>2. Acesse sua <i>Carteira</i> e pressione <i>Resgatar iFood Card</i> <br>3. Digite ou copie e cole o código do seu iFood Card <br>4. O saldo do iFood Card estará na sua conta para ser utilizado.<br><br>**Validade dos créditos**<br>90 dias após o resgate no Ifood. ",
                                            "info_url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html",
                                            "logo_url": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                            "service": "digitalcodes",
                                            "value": "200.0"
                                        }
                                    },
                                    "type": "payment"
                                },
                                "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                                "description": "Cartão presente #Ifood no PicPay",
                                "spotlight": "Ifood Card",
                                "value": "R$ 200,00"
                            }
                        ],
                        "type": "product_card_item"
                    },
                    {
                        "text": "Sobre:",
                        "type": "subtitle"
                    },
                    {
                        "text": "Bem-vindo ao iFood! O iFood Card é um cartão presente que dá a liberdade do comprador ou presenteado escolher as delícias que mais gosta no nosso aplicativo.",
                        "type": "markdown_text"
                    },
                    {
                        "action": {
                            "property": {
                                "webview": {
                                    "url": "https://cdn.picpay.com/picpay/sellers/ifood-terms.html"
                                }
                            },
                            "type": "webview"
                        },
                        "label": "Saiba Mais",
                        "type": "button_link"
                    }
                ],
                "header": {
                    "action": {
                        "property": {
                            "favorite": {
                                "service_id": "5eb2a0520deef450161a7fe5"
                            }
                        },
                        "type": "favorite"
                    },
                    "avatar": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-logo.png",
                    "banner": "https://s3.amazonaws.com/cdn.picpay.com/picpay/sellers/ifood-banner.png",
                    "title": "Ifood",
                    "type": "store_header"
                }
            }`,
        },
    ],
    webhookBody: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "product": 12345,
                "username": "vitu"
            }`,
        },
    ],
    webhookBodyRequestExample: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "transaction": {
                    "consumer": {
                        "identifier": "1234"
                    },
                    "created_at": "2020-08-05T15:57:24-03:00",
                    "identifier": "0ee8b21d-3d90-4440-bbed-b61af17906dd",
                    "value": 1234.56
                },
                "product": 12345,
                "username": "vitu"
            }`,
        },
    ],
};
