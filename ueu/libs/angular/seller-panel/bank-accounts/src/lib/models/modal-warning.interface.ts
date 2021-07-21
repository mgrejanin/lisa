export interface ModalWarningsModal {
    title: string;
    subtitle?: string;
    caption?: string;
    imagePath?: string;
    buttons: {
        help: string;
        confirm: string;
    };
}
