/* eslint-disable max-len */
import outdent from 'outdent';
import { CodeMock } from '../../models/code.model';

export const CodesEcommerceMock: CodeMock = {
    payment: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "referenceId":"102039",
                "callbackUrl":"http://localhost/mockVtexPostCallback/?httpStatus=200",
                "expiresAt":"2020-12-12T15:53:00+05:00",
                "returnUrl":"http://www.picpay.com/#transacaoConcluida",
                "value":10,
                "additionalInfo":[
                    null
                ],
                "buyer":{
                    "firstName":"João",
                    "lastName":"dos Testes",
                    "document":"010.091.001-91"
                }
            }`,
        },
    ],
    qrcode: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "referenceId":"102039",
                "paymentUrl":"https://app.picpay.com/checkout/NWZkOTFjZTA4.....ZWJmM2QxMzA2",
                "qrcode":{
                    "content":"https://app.picpay.com/checkout/NWZkOTFjZTA4.....ZWJmM2QxMzA2",
                    "base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAIAAAAP3aG...(muitos caracteres)..II="
                },
                "expiresAt":"2020-12-12T08:53:00-02:00"
            }`,
        },
    ],
    paymentOK: [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: outdent`
            {
                "referenceId":"102030",
                "authorizationId":"555008cef7f321d00ef236333"
            }`,
        },
    ],
    referenceID: [
        {
            language: 'vim',
            active: true,
            type: 'curl',
            platform: '',
            code: outdent`
                curl --location --request POST
                'https://appws.picpay.com/ecommerce/public/payments/{referenceId}/cancellations'
                    --header 'x-picpay-token: {sua_chave_de_integracao}'
                    --header 'Content-Type: application/json'
                    --data-raw ''`,
        },
    ],
    authorizationID: [
        {
            language: 'vim',
            active: true,
            type: 'curl',
            platform: '',
            code: outdent`
                code curl --location --request POST
                'https://appws.picpay.com/ecommerce/public/payments/{referenceId}/cancellations'
                    --header 'x-picpay-token: {sua_chave_de_integracao}'
                    --header 'Content-Type: application/json'
                    --data-raw '{
                        "authorizationId": "601327196d038600273bbf1c"
                }' `,
        },
    ],
    apiReference: [
        {
            language: 'powershell',
            active: true,
            type: 'curl',
            platform: '',
            code: outdent`
                code curl -X POST
                http://www.sualoja.com.br/callback
                    -H 'Content-Type: application/json'
                    -H 'x-seller-token: 4ef4edbd-5cda-42da-860b-0e8d7b90c784'
                    -d '{
                    "referenceId" : "102030",
                    "authorizationId" : "555008cef7f321d00ef236333"
                    }'
            `,
        },
    ],
    httpsStatus: [
        {
            language: 'powershell',
            active: true,
            type: 'curl',
            platform: '',
            code: outdent`
                code curl -X POST
                curl -X POST
                http://www.sualoja.com.br/callback
                    -H 'Content-Type: application/json'
                    -H 'x-seller-token: 4ef4edbd-5cda-42da-860b-0e8d7b90c784'
                    -d '{
                        "referenceId" : "102030",
                        "authorizationId" : "555008cef7f321d00ef236333"
                    }'
            `,
        },
    ],
};
