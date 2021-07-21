export interface ModalUseExampleData {
    type: 'banner' | 'card_button' | 'button' | 'markdown' | 'coin_value' | 'list';
    description: string;
    title: string;
    examples: UseExample[];
}

interface UseExample {
    imageDescription: string;
    imageUrl: string;
}
