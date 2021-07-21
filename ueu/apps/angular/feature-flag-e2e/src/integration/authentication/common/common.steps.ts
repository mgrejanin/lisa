import { And, Given } from 'cypress-cucumber-preprocessor/steps';
import { LoginCommonPage } from './../../../pages/login/common.page';

const page = new LoginCommonPage();

Given('acesso a pagina de login', () => {
    page.isLocation('/login');
});

And('informo usuário {} incorreto', user => {
    page.informUser(user);
});

And('informo senha {} incorreta', password => {
    page.informPassword(password);
});
