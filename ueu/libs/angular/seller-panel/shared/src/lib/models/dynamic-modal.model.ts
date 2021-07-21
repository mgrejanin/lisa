export interface DynamicModal {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: any;
    actions: {
        visible: boolean;
        labelAction?: string;
        callback?: () => void;
    };
}
