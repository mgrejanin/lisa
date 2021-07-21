import { Then, Given, When, And } from 'cypress-cucumber-preprocessor/steps';

import { CommomPage } from '../../pages/common/commom.page';
import { ExtractPage } from '../../pages/extract/extract.page';

const page = new ExtractPage();
const commomPage = new CommomPage();

// GIVENS
Given('Que estou na página de Extrato', () => {
    page.clickExtracPage();
    commomPage.applicationDate(2021, 5, 21);
    commomPage.applicationURL().should('include', '/extrato/listagem');
});

// WHENS
When('clico no botão de baixar relatório', () => {
    page.downloadExtractButtonContains();
    page.clickDownloadExtract();
});

When('procuro por um projeto no qual não esteja em progresso e clico nele', () => {
    page.clearProjectField();
    page.typeProjectField('Projeto Teste02');

    commomPage.clickMatOption();
});

// ANDS
And('clico no campo de projetos e saio do campo', () => {
    page.clearProjectField();
    page.blurProjectField();
    commomPage.matErrorHaveRequiredMessage();
});

And('procuro por um projeto que não existe', () => {
    page.clearProjectField();
    page.typeProjectField('testesteste');
    commomPage.matOption().contains('Não há nenhuma remessa ou projeto com esse nome');
});

And('procuro por um projeto com remessa em andamento e clico nele', () => {
    page.clearProjectField();
    page.typeProjectField('Projeto Teste01');

    commomPage.clickMatOption();
});

And('procuro pelo primero projeto', () => {
    page.clearProjectField();
    page.typeProjectField('Projeto Teste01');
    commomPage.clickMatOption();
});

And('procuro pelo segundo projeto', () => {
    page.clearProjectField();
    page.typeProjectField('Projeto Teste02');
    commomPage.clickMatOption();
});

And('não informo nenhum projeto no campo', () => {
    page.dateFromCalendarButtonBeDisabled();
    page.dateToCalendarButtonBeDisabled();
    page.extractModalButtonBeDisable();
});

And('clico no botão voltar do calendário e seleciono o mes minimo', () => {
    page.clearProjectField();
    page.typeProjectField('Projeto Teste01');
    commomPage.clickMatOption();

    page.clickCalendarFrom();

    for (let x = 0; x <= 1; x++) {
        commomPage.MatPreviousCalendarButton();
    }
});

And('as datas anteriores a data de criação devem estar desabilitadas', () => {
    commomPage.MatCalendarDatesShouldDisable([1, 2, 3, 4]);
});

And('seleciono uma data no calendário de fim', () => {
    page.clickCalendarTo();
    page.clickInCalendarDate(19, 4);
});

And('informo minha senha incorreta', () => {
    page.typePasswordField('passwordteste');
    page.extractModalButtonBeEnable();
    page.clickExtractNextModalButton();
    page.extractNextModalButtonContains('Acessando...');
});

And('informo minha senha correta', () => {
    page.clearPasswordField();
    page.typePasswordField('RDNS&68#');
    page.extractModalButtonBeEnable();
});

And('a data final do calendário final deve ser a data de hoje - 1', () => {
    page.clickCalendarTo();
    commomPage.MatCalendarTodayDateShoulDisable();
    commomPage.MatCalendarDatesShouldDisable([22, 23, 24, 25, 26, 27, 28, 29, 30]);
    page.clickInCalendarDate(19, 6, 'TO');
});

// THENS
Then('deve abrir a modal de download de extrato', () => {
    page.extractModalBeVisible();
    page.extractModalTitle().contains('Baixe o seu relatório');
});

Then('digito algum projeto inexistente e clico fora do campo', () => {
    page.clearProjectField();
    page.typeProjectField('projectteste');
    page.clickDownloadExtratModalTitle();
    commomPage.matErrorHaveRequiredMessage();
});

Then('a mensagem de remessa em andamento aparece na modal', () => {
    commomPage.scrollToApolloFeedbackCard();
    commomPage.ApolloFeedbackCardContains(
        'Essa remessa está em andamento. Portanto, os dados do relatório podem mudar após a conclusão da remessa.',
    );
    commomPage.ApolloFeedbackCardBeVisible();
});

Then('a mensagem de remessa em andamento não aparece na modal', () => {
    commomPage.scrollToApolloFeedbackCard();
    commomPage.ApolloFeedbackCardNotVisible();
});

Then('quando informo um projeto os botões são habilitados', () => {
    page.clearProjectField();
    page.typeProjectField('Projeto Teste01');

    commomPage.matOption().click();

    page.dateFromCalendarButtonBeEnable();
    page.dateToCalendarButtonBeEnable();
});

Then('seleciono uma data no calendário de inicio', () => {
    page.clickCalendarFrom();
    page.clickInCalendarDate(19, 4);
});

Then('e a data final do calendario inicial deve ser a data de hoje - 1', () => {
    page.clickCalendarFrom();

    for (let x = 0; x <= 1; x++) {
        commomPage.MatNexCalendarButton();
    }

    commomPage.MatCalendarTodayDateShoulDisable();
    commomPage.MatCalendarDatesShouldDisable([22, 23, 24, 25, 26, 27, 28, 29, 30]);
});

Then('não consigo selecionar a data de hoje nem o prox mes', () => {
    page.clickCalendarTo();
    commomPage.MatCalendarTodayDateShoulDisable();
    commomPage.MatNextCalendarButtonBeDisabled();
});

Then('consigo avançar para o próximo step', () => {
    page.dateFromCalendarButtonBeEnable();
    page.dateToCalendarButtonBeEnable();
    page.extractModalButtonBeEnable();

    page.clickExtractNextModalButton();

    page.extractModalButtonBeDisable();
    page.passwordModalSubtitleBeVisible();
    page.passwordModalSubtitleContais('Para garantir sua segurança, confirme sua senha antes de baixar o relatório.');
});

Then('a modal não fecha e permaneço nela', () => {
    page.extractModalBeVisible();
    page.passwordModalSubtitleContais('Para garantir sua segurança, confirme sua senha antes de baixar o relatório.');
});

Then('o download do extrato é efetuado', () => {
    page.clickExtractNextModalButton();
    page.extractNextModalButtonContains('Acessando...');
    page.extractModalBeNotVisible();
});

Then('a data inicial deve ser a data de criação do projeto', () => {
    page.dateFromCalendarInputShouldBe('05/04/2021');
    page.dateToCalendarInputShouldBe('19/06/2021');
});

Then('a data inicial deve ser a data de uma semana atrás', () => {
    page.dateFromCalendarInputShouldBe('13/06/2021');
    page.dateToCalendarInputShouldBe('19/06/2021');
});

Then('a data inicial do calendário final deve ser a data de criação do projeto', () => {
    page.clickCalendarTo();

    for (let x = 0; x <= 1; x++) {
        commomPage.MatPreviousCalendarButton();
    }

    commomPage.MatCalendarDatesShouldDisable([1, 2, 3, 4]);
});
