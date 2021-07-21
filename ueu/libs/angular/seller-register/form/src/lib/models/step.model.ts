export interface StepState {
    headerTitle?: string;
    activateProgressbar?: boolean;
    valueProgressBar?: number;
}

export class Step {
    private _headerTitle: string;
    private _activateProgressbar: boolean;
    private _valueProgressBar: number;

    constructor(step?: Partial<StepState>) {
        this.headerTitle = step?.headerTitle;
        this.activateProgressbar = step?.activateProgressbar;
        this.valueProgressBar = step?.valueProgressBar;
    }

    get headerTitle() {
        return this._headerTitle;
    }

    set headerTitle(value: string) {
        this._headerTitle = value || '';
    }

    get activateProgressbar() {
        return this._activateProgressbar;
    }

    set activateProgressbar(value: boolean) {
        const setDefaultValue = () => (value === null || value === undefined ? true : value);

        this._activateProgressbar = setDefaultValue();
    }

    get valueProgressBar() {
        return this._valueProgressBar;
    }

    set valueProgressBar(value: number) {
        this._valueProgressBar = value || 0;
    }

    toJSON(): StepState {
        return {
            headerTitle: this.headerTitle,
            activateProgressbar: this.activateProgressbar,
            valueProgressBar: this.valueProgressBar,
        };
    }
}
