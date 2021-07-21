import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { CommomPage } from '../../pages/common/commom.page';

const page = new CommomPage();

Given('Acesso o site', () => {
    page.acessApplicationPage();
});

Then('devo me autenticar no seller-panel', () => {
    page.isInitialSellerPanelPage();
});
