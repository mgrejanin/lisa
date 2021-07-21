import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

// modules
import { MockModule } from 'ng-mocks';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LabComponentsAngularModule } from '@picpay/lab-components-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//components
import { PicpayLabHeaderComponent } from '../../components/header/header.component';
import { PicpayLabSideMenuComponent } from '../../components/sidemenu/side-menu.component';
import { PicpayLabSidePanelComponent } from '../../components/sidepanel/sidepanel.component';
import { PicpayLabHomePageComponent } from './home.component';
import { PicPayLabSectionComponent } from '../../components/section/section.component';

import { PicPayLabSectionService } from '../../services/section/section.service';
import { PicpayLabDeviceComponent } from '../../components/device/device.component';
import { Section } from '../../models/section.model';
import { DragDropEventMocks } from '../../mocks/drag-drop-events-mocks/drag-drop-event-mocks';

describe('PicpayLabHomePageComponent', () => {
    let component: PicpayLabHomePageComponent;
    let fixture: ComponentFixture<PicpayLabHomePageComponent>;
    const dragDropEventMocks = new DragDropEventMocks<Section>();
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(DesignSystemAngularModule),
                MockModule(LabComponentsAngularModule),
                MockModule(MatDialogModule),
                MockModule(MatIconModule),
                MockModule(DragDropModule),
                NoopAnimationsModule,
            ],
            declarations: [
                PicpayLabHomePageComponent,
                PicpayLabHeaderComponent,
                PicpayLabSideMenuComponent,
                PicpayLabSidePanelComponent,
                PicPayLabSectionComponent,
                PicpayLabDeviceComponent,
            ],
            providers: [PicPayLabSectionService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PicpayLabHomePageComponent);
        component = fixture.componentInstance;
        component.itemActive = {
            id: 1,
            icon: 'add',
            text: 'Adicionar seção',
            isActive: false,
            component: 'app-component',
            description: 'Lorem is tristique',
        };

        spyOn(component, 'openSidePanel').and.callThrough();
        spyOn(component, 'handleOpenSidePanel').and.callThrough();
        spyOn(component, 'closePanel').and.callThrough();

        fixture.detectChanges();
    });

    it('should render header', () => {
        const headerComponent = fixture.debugElement.query(By.css('picpay-lab-header'));
        expect(headerComponent).toBeTruthy();
    });

    describe('sidemenu component', () => {
        it('should render sidemenu', () => {
            const sidemenuComponent = fixture.debugElement.query(By.css('picpay-lab-side-menu'));
            expect(sidemenuComponent).toBeTruthy();
        });

        it('should render with options', () => {
            const items = fixture.debugElement.queryAll(By.css('.c-side-menu-item'));
            expect(items).toHaveLength(component.itemsMenu.length);
        });
    });

    it('should not render sidepanel', () => {
        const sidepanelComponent = fixture.debugElement.query(By.css('picpay-lab-sidepanel'));
        expect(sidepanelComponent).not.toContain('.sidepanel--show');
    });

    it('should render container', () => {
        const container = fixture.debugElement.query(By.css('.home__container'));
        expect(container).toBeTruthy();
    });

    describe('sidemenu and sidepanel interactions', () => {
        let option: DebugElement;

        beforeEach(() => {
            option = fixture.debugElement.queryAll(By.css('.c-side-menu-item'))[0];
            option.nativeElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
        });

        it('should handle open sidepanel when click option', () => {
            expect(component.handleOpenSidePanel).toHaveBeenCalled();
        });

        it('should close sidepanel', () => {
            const closePanelButton = fixture.debugElement.query(By.css('.sidepanel__close apollo-icon-button'));
            closePanelButton.nativeElement.dispatchEvent(new Event('click'));
            expect(component.closePanel).toHaveBeenCalled();
        });
    });

    describe('device and sidepanel interactions', () => {
        let option: DebugElement;

        beforeEach(() => {
            option = fixture.debugElement.queryAll(By.css('.device__scroll-content-btn'))[0];
            option.nativeElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
        });

        it('should open sidepanel', () => {
            expect(component.openSidePanel).toHaveBeenCalled();
        });
    });

    describe('drag and drop interactions', () => {
        beforeEach(() => {
            component.items = [];

            fixture.detectChanges();
        });
        it('should drop element in the same container', () => {
            const mockListOrigin = {
                id: 'deviceList',
                data: [
                    {
                        type: 'markdown',
                        title: 'Bloco de texto',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                        imageUrl: './assets/images/markdown.svg',
                    },
                    {
                        type: 'input',
                        title: 'Input',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                        imageUrl: './assets/images/input.svg',
                    },
                ],
                index: 0,
            };
            const mockListDestiny = {
                id: 'deviceList',
                data: [
                    {
                        type: 'markdown',
                        title: 'Bloco de texto',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                        imageUrl: './assets/images/markdown.svg',
                    },
                    {
                        type: 'input',
                        title: 'Input',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                        imageUrl: './assets/images/input.svg',
                    },
                ],
                index: 1,
            };
            const dragDropEvent = dragDropEventMocks.createContainerEvent(mockListOrigin, mockListDestiny);

            component.drop(dragDropEvent);
            expect(dragDropEvent.container.data).toEqual([
                {
                    type: 'input',
                    title: 'Input',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    imageUrl: './assets/images/input.svg',
                },
                {
                    type: 'markdown',
                    title: 'Bloco de texto',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                    imageUrl: './assets/images/markdown.svg',
                },
            ]);
        });

        describe('when drop element in the other container', () => {
            let dragDropEvent;

            beforeEach(() => {
                const mockListOrigin = {
                    id: 'sectionList',
                    data: [
                        {
                            type: 'markdown',
                            title: 'Bloco de texto',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                            imageUrl: './assets/images/markdown.svg',
                        },
                        {
                            type: 'input',
                            title: 'Input',
                            description:
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                            imageUrl: './assets/images/input.svg',
                        },
                    ],
                    index: 0,
                };
                const mockListDestiny = {
                    id: 'deviceList',
                    data: component.items,
                    index: 0,
                };

                dragDropEvent = dragDropEventMocks.createContainerEvent(mockListOrigin, mockListDestiny);

                component.drop(dragDropEvent);

                fixture.detectChanges();
            });

            it('should update dragDropEvent container', () => {
                expect(dragDropEvent.container.data).toEqual([
                    {
                        type: 'markdown',
                        title: 'Bloco de texto',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                        imageUrl: './assets/images/markdown.svg',
                    },
                ]);
            });

            it('should update device items', () => {
                expect(component.items).toEqual([
                    {
                        type: 'markdown',
                        title: 'Bloco de texto',
                        description:
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.',
                        imageUrl: './assets/images/markdown.svg',
                    },
                ]);
            });

            it('should render components on device', () => {
                const components = fixture.debugElement.queryAll(By.css('lab-transformer'));
                expect(components).toHaveLength(1);
            });
        });
    });
});
