import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';
import { CodesOpenPlatformMock } from '../../../services/mocks/codes-open-platform.mock';

import { OpenPlatformComponent } from './open-platform.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

describe('OpenPlatformComponent', () => {
    let component: OpenPlatformComponent;
    let fixture: ComponentFixture<OpenPlatformComponent>;
    const mockCodes = CodesOpenPlatformMock;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpenPlatformComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                MockModule(DesignSystemAngularModule),
                DevPortalSharedModule,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: HIGHLIGHT_OPTIONS,
                    useValue: {
                        fullLibraryLoader: () => import('highlight.js'),
                        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenPlatformComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get code in Json', () => {
        expect(mockCodes.storeHeader).toBeTruthy();
    });
});
