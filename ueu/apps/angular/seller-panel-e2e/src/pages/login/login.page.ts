import { CommomPage } from '../common/commom.page';

const commomPage = new CommomPage();

export class LoginPage {
    loginPage(): void {
        commomPage.acessApplicationPage();
        cy.url().should('include', '/login');
    }

    saveAuthToken(): void {
        const URL_API = Cypress.env('LOGIN_ENDPOINT');
        const BODY_REQUEST = {
            cnpj: '02488592000168',
            email: 'b2p.teste4@picpay.com',
            password: 'RDNS&68#',
            trackingToken: null,
            ignore_interceptor: true,
            recaptcha:
                '03AGdBq26AZ9BGqQObzVbagTVmWiyik5GG9oN2uFbhfjCDZubasvG0QS2YR7aTvoTFKLnqUhYaRM_nz4VvhhZOmeZKQrSOeirx37hAY3mhZlxo7FKNoTvyrhzwMFR1mKcEBezNF68dypFevVnTLm9khYqg4XZl4vbyHiv7QGuEwbHT2Anhpcs-tYK9t0skQXX5Xh7fezZJfyPPlNLT8OLM5ffZoGDtZ4aMe3L3OpFORClYPAteQcDCyESePQzZenC2LF59dTNu7UyhM9md7ddVmFSPfpEyj5itFwtUXpTpgx5S3PtqJHFqX9WHbvMQILYuvh-mznSdjzymFR7rrFNZKMBxDXipErkXlov01sVZxLzhtSIMSWGCTDnwZ0HF6dJscN-m4KS5gt9_v3fHYuAG7FMFMHT1VlfdzV-E9ZXYpSs31fvSEfVD4fUiskls-pqvmP1jdJ39gQQa',
        };
        cy.request('POST', URL_API, BODY_REQUEST)
            .then(response => {
                const sellerStore = { seller: response.body.seller };

                localStorage.setItem('token_refresh', response.body.token_refresh);
                localStorage.setItem('token_biz', response.body.token_biz);
                localStorage.setItem('token_refresh_expires_in', response.body.token_refresh_expires_in);
                localStorage.setItem('token_transaction', response.body.token_transaction);
                localStorage.setItem('token_transaction_expires_in', response.body.token_transaction_expires_in);
                localStorage.setItem('AkitaStores', JSON.stringify({ ...sellerStore }));
            })
            .then(() => {
                commomPage.acessApplicationPage();
            });
    }

    cnpjInputField(cnpj: string): void {
        cy.get('input[type=text]').type(cnpj);
    }

    emailInputField(email: string): void {
        cy.get('input[type=email]').type(email);
    }

    passwordInputField(password: string): void {
        cy.get('input[type=password]').type(password);
    }

    clickLoginButton(): void {
        cy.get('button[type=submit]').click();
    }
}
