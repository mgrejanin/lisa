import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { MockModule } from 'ng-mocks';

// components
import { PicPayLabSectionComponent } from './section.component';
import { PicPayLabModalUseExampleService } from '../../../lib/services/modal-use-example/modal-use-example.service';

// services
import { PicPayLabSectionService } from '../../services/section/section.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('PicPayLabSectionComponent', () => {
    let component: PicPayLabSectionComponent;
    let fixture: ComponentFixture<PicPayLabSectionComponent>;

    const modalUseExampleServiceMock = {
        getUseExamples: jest.fn().mockReturnValue({
            type: 'markdown',
            title: 'Exemplos de uso',
            description: 'Adicionar um texto sobre a marca ou a loja é um exemplo de aplicação da seção de Texto',
            examples: [
                {
                    imageDescription: 'Texto sobre a marca',
                    imageUrl: './assets/images/lista_sem_detalhe.svg',
                },
            ],
        }),
    };
    const matDialogMock = {
        open: jasmine.createSpy('open'),
    };

    const sectionItemsMock = {
        getSections: jest.fn().mockReturnValue([
            {
                type: 'markdown',
                title: 'Bloco de texto',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                imageUrl: './assets/images/markdown.svg',
            },
            {
                type: 'input',
                title: 'Input',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                imageUrl: './assets/images/input.svg',
            },
        ]),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(DesignSystemAngularModule), MatDialogModule, DragDropModule],
            declarations: [PicPayLabSectionComponent],
            providers: [
                { provide: PicPayLabModalUseExampleService, useValue: modalUseExampleServiceMock },
                { provide: MatDialog, useValue: matDialogMock },
                { provide: PicPayLabSectionService, useValue: sectionItemsMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicPayLabSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display items section', () => {
        const items = fixture.debugElement.queryAll(By.css('.section'));
        expect(items.length).toEqual(2);

        expect(items[0].nativeElement.querySelector('.section__title').textContent).toEqual('Bloco de texto');
        expect(items[0].nativeElement.querySelector('.section__description').textContent).toEqual(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
        );

        expect(items[1].nativeElement.querySelector('.section__title').textContent).toEqual('Input');
        expect(items[1].nativeElement.querySelector('.section__description').textContent).toEqual(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
        );
    });

    it('should call the openDialog', () => {
        const openDialogSpy = spyOn(component, 'openDialog').and.callThrough();

        component.openDialog('markdown');

        expect(openDialogSpy).toHaveBeenCalledWith('markdown');
        expect(matDialogMock.open).toHaveBeenCalled();
    });
});
