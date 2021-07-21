export const bodyAuth = {
    cnpj: '00.000.000/0000-00',
    email: 'picpaytest@gmail.com',
    password: '123456',
    recaptcha: '',
    trackingKey: '',
};

export const bodySellerChange = {
    ignore_interceptor: true,
    seller_id: '475',
};

export const bodyUpdatePassword = {
    password: '123456',
    old_password: '101010',
    password_confirmation: '101010',
};

export const bodyStepOne = {
    ignore_interceptor: true,
    cnpj: '00.000.000/0000-00',
    email: 'test@pgmail.com',
};

export const bodyStepTwo = {
    email: 'test@pgmail.com',
    password_recovery_key: 'test',
    password: 'test123',
    password_confirmation: 'test123',
};

export const bodyVerifyPassword = {
    password: '123456',
};

export const paramsSellerChange = {
    token_transaction: 'absuf3403-dfoeoedw-3ednnfdd-sdbsa38n',
    seller_id: '123',
};
