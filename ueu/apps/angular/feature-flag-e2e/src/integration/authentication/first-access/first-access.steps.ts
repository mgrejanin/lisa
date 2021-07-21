import { When } from 'cypress-cucumber-preprocessor/steps';
import { FirstAccessPage } from './../../../pages/login/first-access.page';

const page = new FirstAccessPage();

When('clico no botão de próximo', () => {
    page.clickNextFirstAccess();
});
