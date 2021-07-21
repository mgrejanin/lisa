import { Observable, of } from 'rxjs';

// interfaces
import { Recharge, RechargeData } from '../../../models';

export const mockRechargeData: RechargeData[] = [
    {
        id: '5fe1ecfda719fa46d62d38b2',
        id_counter: 345593,
        consumer_id: 8635338,
        value: 12,
        status_id: 'O',
        request_date: '2020-12-22T09:56:29-03:00',
        completion_date: null,
        recharge_method_type_id: 1,
        bank_id: '212',
        verified_by: null,
        recharge_deposit_proof: null,
        comments: ['Recarga criada por ivan.junior@picpay.com em 21/12/2020 12:15:14 pelo motivo: teste'],
        description: null,
        boleto_nosso_numero: 160974268,
        registrado_por: 1,
        value_srt: '12,00',
        request_date_str: '2020-12-22 09:56:29',
        completion_date_str: null,
        url: null,
        code: '21290.00119 21100.012109 16097.426809 4 84800000001200',
        instructions: null,
        transaction_id: null,
        risk_allowed: null,
        risk_reason_number: null,
        risk_reason_description: null,
        created_credit_seller: null,
        created_credit_consumer: null,
        acquirer_name: null,
        acquirer_lr: null,
        lock_completion: null,
        pending_completion_flag: null,
        set_pending_completion_flag_date: null,
        total_value: null,
        service_charge: null,
        device_os: 'android',
        app_version: '10.19.64',
        consumer: {
            id: '8635338',
            name: 'Felipe Lima',
            name_cpf: 'Alan Lucas Bernardo Pereira Rodrigues',
            image_url_small:
                'https://picpay-dev.s3.sa-east-1.amazonaws.com/profiles-processed-images/b13ed5bb2f6f387b68ef419c2f38f265.200.jpg',
        },
        bank: {
            id: '212',
            name: 'BANCO ORIGINAL S.A.',
            img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_original.png',
        },
        recharge_method_name: 'Boleto',
        status_name: 'Aguardando',
    },
    {
        id: '5fe0bc02d973586aeb161542',
        id_counter: 345592,
        consumer_id: 1,
        value: 1200,
        status_id: 'O',
        request_date: '2020-12-21T12:15:14-03:00',
        completion_date: null,
        recharge_method_type_id: 1,
        bank_id: '212',
        verified_by: null,
        recharge_deposit_proof: null,
        comments: ['Recarga criada por ivan.junior@picpay.com em 21/12/2020 12:15:14 pelo motivo: teste'],
        description: null,
        boleto_nosso_numero: 160974267,
        registrado_por: 1,
        value_srt: '1200,00',
        request_date_str: '2020-12-21 12:15:14',
        completion_date_str: null,
        url: null,
        code: '21290.00119 21100.012109 16097.426726 2 84790000120000',
        instructions: null,
        transaction_id: null,
        risk_allowed: null,
        risk_reason_number: null,
        risk_reason_description: null,
        created_credit_seller: null,
        created_credit_consumer: null,
        acquirer_name: null,
        acquirer_lr: null,
        lock_completion: null,
        pending_completion_flag: null,
        set_pending_completion_flag_date: null,
        total_value: null,
        service_charge: null,
        device_os: null,
        app_version: null,
        consumer: {
            id: '1',
            name: 'John P. ',
            name_cpf: 'Rayane Cardozo Gama Botelho',
            image_url_small:
                'https://picpay.s3.amazonaws.com/profiles-processed-images/fa7d555e900000e7b02051a5b797bcc3.200.jpg',
        },
        bankAccount: {
            bank_id: '341',
            agencia: '644-Jd',
            conta: '966-Nj',
            tipo: 'CC',
            operacao: null,
        },
        bank: {
            id: '212',
            name: 'BANCO ORIGINAL S.A.',
            img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_original.png',
        },
        recharge_method_name: 'Boleto',
        status_name: 'Aguardando',
    },
];
export const mockRecharge: Recharge = {
    total: 1,
    data: mockRechargeData,
};

export class RechargesQueryMock {
    recharges$: Observable<Recharge[]>;
    isLoading$: Observable<boolean>;

    constructor() {
        this.recharges$ = of([mockRecharge]);
        this.isLoading$ = of(false);
    }
}
