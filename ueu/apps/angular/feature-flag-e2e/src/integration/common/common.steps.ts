import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { LoginCommonPage } from './../../pages/login/common.page';

const page = new LoginCommonPage();

Given('acesso o site', () => {
    page.navigateTo();
});

Then('devo visualizar mensagem de erro', () => {
    page.viewErrorLogin();
});
