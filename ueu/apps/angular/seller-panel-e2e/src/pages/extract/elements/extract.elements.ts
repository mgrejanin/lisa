export class ExtractElements {
    DOWNLOAD_EXTRACT_MODAL = (): string => {
        return '[data-cy=modal-report]';
    };

    DOWNLOAD_EXTRACT_BUTTON = (): string => {
        return '#btn-download-report';
    };

    MODAL_TITLE = (): string => {
        return '.c-download-report__title';
    };

    MODAL_PASSWORD_STEP_SUBTITLE = (): string => {
        return '[data-cy=download-subtitle]';
    };

    MODAL_NEXT_BUTTON = (): string => {
        return '[data-cy=btn-next]';
    };

    MODAL_CANCEL_BUTTON = (): string => {
        return '[data-cy=btn-cancel]';
    };

    PROJECT_FIELD = (): string => {
        return '[data-cy=project-field]';
    };

    DATE_FROM_FIELD = (): string => {
        return '[data-cy=dateFrom]';
    };

    DATE_INPUT_FROM_FIELD = (): string => {
        return '[data-cy="dateFrom-input"]';
    };

    DATE_INPUT_TO_FIELD = (): string => {
        return '[data-cy="dateTo-input"]';
    };

    DATE_TO_FIELD = (): string => {
        return '[data-cy=dateTo]';
    };

    PASSWORD_FIELD = (): string => {
        return '[data-cy=password-field]';
    };
}
