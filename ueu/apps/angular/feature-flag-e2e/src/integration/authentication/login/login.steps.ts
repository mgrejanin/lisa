import { And, When } from 'cypress-cucumber-preprocessor/steps';
import { LoginPage } from './../../../pages/login/login.page';

const page = new LoginPage();

And('informo 2FA {} incorreto', auth => {
    page.informAuth(auth);
});

When('clico no botão de realizar login', () => {
    page.clickLogIn();
});

When('clico no botão realizar primeiro acesso', () => {
    page.clickFirstAccess();
});
