import { And, Given, When } from 'cypress-cucumber-preprocessor/steps';
import { CommomPage } from '../../pages/common/commom.page';
import { LoginPage } from '../../pages/login/login.page';

const page = new LoginPage();
const commomPage = new CommomPage();

Given('Minha autenticação B2P', () => {
    page.saveAuthToken();
    commomPage.mockProjectRequest();
});

Given('estou na página de login', () => {
    page.loginPage();
});

When('informo meu cnpj {} correto', cnpj => {
    page.cnpjInputField(cnpj);
});

And('informo meu email {} correto', email => {
    page.emailInputField(email);
});

And('informo minha senha {} correta', password => {
    page.passwordInputField(password);
});

And('clico no botão para fazer login', () => {
    page.clickLoginButton();
});
