import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockedComponent, MockModule } from 'ng-mocks';
import { PicPayLabModalUseExampleComponent } from './modal-use-example.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('PicPayLabModalUseExampleComponent', () => {
    let component: PicPayLabModalUseExampleComponent;
    let fixture: ComponentFixture<PicPayLabModalUseExampleComponent>;
    let modalRef: MatDialogRef<PicPayLabModalUseExampleComponent>;

    const mockData = Object.freeze({
        type: 'banner',
        title: 'Exemplos de uso',
        description:
            'Venda de produtos unitários e serviços por recorrência, são exemplos de aplicação da seção de Banner',
        examples: [
            {
                imageDescription: 'Venda de produto (com ou sem tela de detalhes)',
                imageUrl: './assets/images/lista_com_detalhe.png',
            },
            {
                imageDescription: 'Venda por assinatura (com ou sem tela de detalhes)',
                imageUrl: './assets/images/lista_com_detalhe.png',
            },
        ],
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PicPayLabModalUseExampleComponent],
            imports: [MockModule(MatIconModule), MockModule(MatDialogModule), MockModule(MatButtonModule)],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                { provide: MatDialogRef, useValue: { close: () => ({}) } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicPayLabModalUseExampleComponent);
        component = fixture.componentInstance;
        modalRef = TestBed.inject(MatDialogRef);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load data', () => {
        const element = fixture.debugElement.query(By.css('.modal'))
            .componentInstance as MockedComponent<PicPayLabModalUseExampleComponent>;

        expect(element.data).toEqual(mockData);
    });

    it('should have a handleClose function', () => {
        const closeSpy = jest.spyOn(modalRef, 'close');

        component.handleClose();

        expect(closeSpy).toHaveBeenCalled();
    });
});
