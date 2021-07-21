import { CommomElements } from './elements/commom.elements';

const commomElements = new CommomElements();

export class CommomPage {
    private BASE_URL = Cypress.config('baseUrl') as string;

    private REQUIRED_MESSAGE = 'Este campo é requerido!';
    private CALENDAR_OPTION_DISABLE = 'rgba(0, 0, 0, 0.38)';

    isInitialSellerPanelPage(): void {
        this.applicationURL().should('include', '/inicio');
    }

    applicationURL(): Cypress.Chainable<string> {
        return cy.url();
    }

    applicationDate(year: number, month: number, date: number): void {
        cy.clock(Date.UTC(year, month, date), ['Date']);
    }

    acessApplicationPage(): void {
        cy.visit(this.BASE_URL);
    }

    mockProjectRequest(): void {
        cy.intercept(
            {
                method: 'GET',
                url: Cypress.env('B2P_PROJECTS_ENDPOINT'),
            },
            { fixture: 'b2p-projects.json' },
        );
    }

    mockExtractRequest(): void {
        cy.intercept(
            {
                method: 'GET',
                url: Cypress.env('B2P_DOWNLOAD_REPORT_ENPOINT'),
            },
            { statusCode: 200, body: '' },
        );
    }

    scrollToApolloFeedbackCard(): void {
        cy.get(commomElements.APOLLO_FEEDBACK_CARD_LABEL()).scrollIntoView();
    }

    ApolloFeedbackCardContains(value: string): void {
        cy.get(commomElements.APOLLO_FEEDBACK_CARD_LABEL()).contains(value);
    }

    ApolloFeedbackCardBeVisible(): void {
        cy.get(commomElements.APOLLO_FEEDBACK_CARD_LABEL()).should('be.visible');
    }

    ApolloFeedbackCardNotVisible(): void {
        cy.get(commomElements.APOLLO_FEEDBACK_CARD_LABEL()).should('not.be.visible');
    }

    clickMatOption(): void {
        cy.get(commomElements.MAT_OPTION_ITEM()).click();
    }

    matOption(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(commomElements.MAT_OPTION_ITEM());
    }

    matErrorHaveRequiredMessage(): void {
        cy.get(commomElements.MAT_INPUT_ERROR()).contains(this.REQUIRED_MESSAGE);
    }

    MatSnackbarContains(value: string): void {
        cy.get(commomElements.MAT_SNACKBAR_LABEL()).contains(value);
    }

    MatCalendarTodayDateShoulDisable(): void {
        cy.get(commomElements.MAT_CALENDAR_TODAY_DATE()).should('have.css', 'color', this.CALENDAR_OPTION_DISABLE);
    }

    MatPreviousCalendarButton(): void {
        cy.get(commomElements.MAT_PREVIOUS_CALENDAR_DATE()).click();
    }

    MatNexCalendarButton(): void {
        cy.get(commomElements.MAT_NEXT_CALENDAR_DATE()).click();
    }

    MatNextCalendarButtonBeDisabled(): void {
        cy.get(commomElements.MAT_NEXT_CALENDAR_DATE()).should('have.class', commomElements.MAT_BUTTON_DISABLE());
    }

    MatCalendarDates(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(commomElements.MAT_CALENDAR_DATE());
    }

    MatCalendarDatesShouldDisable(dates: number[]): void {
        dates.forEach(dateValue => {
            cy.get(commomElements.MAT_CALENDAR_DATE())
                .contains(dateValue)
                .should('have.css', 'color', this.CALENDAR_OPTION_DISABLE)
                .parent()
                .should('have.class', commomElements.MAT_CALENDAR_DATE_DISABLE());
        });
    }
}
