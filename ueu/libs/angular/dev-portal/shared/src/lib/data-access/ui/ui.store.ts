import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface UiState {
    isMobile: boolean;
    isSafari: boolean;
}

function createInitialState(): UiState {
    return {
        isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {
    constructor() {
        super(createInitialState());
    }

    updateIsMobile(isMobile: boolean): void {
        this.update({ isMobile });
    }

    updateIsSafari(isSafari: boolean): void {
        this.update({ isSafari });
    }
}
