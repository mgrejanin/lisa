export interface ConfirmModal {
    title: string;
    subtitle?: string;
    caption?: string;
    buttons: {
        cancel: string;
        confirm: string;
    };
}
