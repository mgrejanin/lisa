import { CommomElements } from '../common/elements/commom.elements';
import { DashboardElements } from '../dashboard/elements/dashboard.elements';
import { ExtractElements } from './elements/extract.elements';

const commomElements = new CommomElements();
const extractElements = new ExtractElements();
const dashboardElements = new DashboardElements();

export class ExtractPage {
    clickExtracPage(): void {
        cy.get(dashboardElements.SIDE_MENU_EXTRACT_BUTTON()).click();
    }

    downloadExtractButtonContains(): void {
        cy.get(extractElements.DOWNLOAD_EXTRACT_BUTTON()).find('.ml-2').should('have.text', 'Baixar relatório');
    }

    clickDownloadExtract(): void {
        cy.get(extractElements.DOWNLOAD_EXTRACT_BUTTON()).click();
    }

    clickExtractNextModalButton(): void {
        cy.get(extractElements.MODAL_NEXT_BUTTON()).click();
    }

    clickDownloadExtratModalTitle(): void {
        cy.get(extractElements.MODAL_TITLE()).click();
    }

    extractModalTitle(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(extractElements.MODAL_TITLE());
    }

    extractModalBeVisible(): void {
        cy.get(extractElements.DOWNLOAD_EXTRACT_MODAL()).should('be.visible');
    }

    extractModalBeNotVisible(): void {
        cy.get(extractElements.DOWNLOAD_EXTRACT_MODAL()).should('not.exist');
    }

    extractNextModalButtonContains(value: string | number): void {
        cy.get(extractElements.MODAL_NEXT_BUTTON()).contains(value);
    }

    passwordModalSubtitleContais(value: string | number): void {
        cy.get(extractElements.MODAL_PASSWORD_STEP_SUBTITLE()).contains(value);
    }

    passwordModalSubtitleBeVisible(): void {
        cy.get(extractElements.MODAL_PASSWORD_STEP_SUBTITLE()).should('be.visible');
    }

    extractModalButtonBeDisable(): void {
        cy.get(extractElements.MODAL_NEXT_BUTTON()).find('button').should('be.disabled');
    }

    extractModalButtonBeEnable(): void {
        cy.get(extractElements.MODAL_NEXT_BUTTON()).should('not.be.disabled');
    }

    clearProjectField(): void {
        cy.get(extractElements.PROJECT_FIELD()).clear();
    }

    blurProjectField(): void {
        cy.get(extractElements.PROJECT_FIELD()).focus();
        cy.get(extractElements.PROJECT_FIELD()).blur();
    }

    typeProjectField(value: string) {
        cy.get(extractElements.PROJECT_FIELD()).focus();
        cy.get(extractElements.PROJECT_FIELD()).type(value);
    }

    typePasswordField(value: string) {
        cy.get(extractElements.PASSWORD_FIELD()).type(value);
    }

    clearPasswordField(): void {
        cy.get(extractElements.PASSWORD_FIELD()).clear();
    }

    clickCalendarFrom(): void {
        cy.get(extractElements.DATE_FROM_FIELD()).click();
    }

    clickCalendarTo(): void {
        cy.get(extractElements.DATE_TO_FIELD()).click();
    }

    clickCalendarTodayDate(): void {
        cy.get(commomElements.MAT_CALENDAR_TODAY_DATE()).click();
    }

    clickInCalendarDate(date: string | number, month: string | number, calendar = 'FROM'): void {
        const monthFormatted = month < 10 ? '0' + month : month;
        const calendarField =
            calendar === 'FROM' ? extractElements.DATE_INPUT_FROM_FIELD() : extractElements.DATE_INPUT_TO_FIELD();

        cy.get(commomElements.MAT_CALENDAR_DATE())
            .contains(date)
            .click()
            .then(() => cy.get(calendarField).should('have.value', `${date}/${monthFormatted}/2021`));
    }

    dateFromCalendarInputShouldBe(value: string): void {
        cy.get(extractElements.DATE_INPUT_FROM_FIELD()).should('have.value', value);
    }

    dateToCalendarInputShouldBe(value: string): void {
        cy.get(extractElements.DATE_INPUT_TO_FIELD()).should('have.value', value);
    }

    dateFromCalendarButtonBeDisabled(): void {
        cy.get(extractElements.DATE_FROM_FIELD()).children().should('be.disabled');
    }

    dateToCalendarButtonBeDisabled(): void {
        cy.get(extractElements.DATE_TO_FIELD()).children().should('be.disabled');
    }

    dateFromCalendarButtonBeEnable(): void {
        cy.get(extractElements.DATE_FROM_FIELD()).children().should('not.be.disabled');
    }

    dateToCalendarButtonBeEnable(): void {
        cy.get(extractElements.DATE_TO_FIELD()).children().should('not.be.disabled');
    }
}
