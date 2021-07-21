import { Component, Input } from '@angular/core';

@Component({
    selector: 'seller-register-mockup',
    templateUrl: './mockup.component.html',
    styleUrls: ['./mockup.component.scss'],
})
export class MockupComponent {
    readonly defaultAvatar = 'assets/seller-register/icons/store.svg';
    readonly defaultName = 'Nome do seu Estabelecimento';
    readonly defaultAddress = 'Avenida do seu estabelecimento';

    @Input() businessAvatar: string;
    @Input() businessName: string;
    @Input() businessAddress: string;
}
