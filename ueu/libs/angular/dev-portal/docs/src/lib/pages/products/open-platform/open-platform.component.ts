import { Component } from '@angular/core';
import { CodesOpenPlatformMock } from '../../../services/mocks/codes-open-platform.mock';
@Component({
    selector: 'dev-portal-open-platform',
    templateUrl: './open-platform.component.html',
    styleUrls: ['./open-platform.component.scss'],
})
export class OpenPlatformComponent {
    mockCodes = CodesOpenPlatformMock;
}
