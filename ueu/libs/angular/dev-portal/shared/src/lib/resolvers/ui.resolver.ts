import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UiService } from '../data-access/ui/ui.service';

@Injectable({ providedIn: 'root' })
export class UiResolver implements Resolve<void> {
    constructor(private service: UiService) {}

    resolve(): void {
        return this.service.detectMobile();
    }
}
