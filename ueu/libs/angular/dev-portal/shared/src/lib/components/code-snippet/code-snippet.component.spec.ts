import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { CodeSnippetComponent } from './code-snippet.component';
import { MockModule } from 'ng-mocks';

describe('CodeSnippetComponent', () => {
    let component: CodeSnippetComponent;
    let fixture: ComponentFixture<CodeSnippetComponent>;

    const mockCodes = [
        {
            language: 'JSON',
            active: true,
            type: 'application/json',
            platform: '',
            code: `
            {
                "referenceId": 102030,
                "callbackUrl": "http: //localhost/mockVtexPostCallback/?httpStatus=200",
                "expiresAt": "2019-09-15T15: 53: 00+05: 00",
                "returnUrl": "http: //www.picpay.com/#transacaoConcluida",
                "value": 1,
                "plugin": "magento2",
                "additionalInfo": [null],
                "buyer": {
                    "firstName": "João",
                    "lastName": "da Silva",
                    "document": "123.456.789-10",
                    "email": "joao.casteluber@picpay.com",
                    "phone": "+55 27 98802-0195"
                }
            }`,
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CodeSnippetComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                MockModule(DesignSystemAngularModule),
                MockModule(HighlightModule),
                MockModule(ClipboardModule),
            ],
            providers: [
                {
                    provide: HIGHLIGHT_OPTIONS,
                    useValue: { fullLibraryLoader: () => import('highlight.js') },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeSnippetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should run the copy command', () => {
        spyOn(component, 'copyToClipboard').and.returnValue(true);
        const element = fixture.debugElement.nativeElement.querySelector('.copy-paste');
        element.click();

        expect(fixture.componentInstance.copyToClipboard).toBeTruthy();
    });

    it('should copies content to function copyToClipboard upon click', () => {
        component.infoCodes = mockCodes;
        fixture.detectChanges();
        const clipboardSpy = spyOn(component, 'copyToClipboard');
        const element = fixture.debugElement.nativeElement.querySelector('.copy-paste');
        element.click();
        expect(clipboardSpy).toHaveBeenCalledWith(mockCodes[0]);
    });
});
