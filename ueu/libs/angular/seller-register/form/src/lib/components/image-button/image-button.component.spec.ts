import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MockModule } from 'ng-mocks';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { ImageButtonComponent } from './image-button.component';

describe('ImageButtonComponent', () => {
    let component: ImageButtonComponent;
    let fixture: ComponentFixture<ImageButtonComponent>;

    // Valid image file mock
    const validMockImage: File = new File([''], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });
    Object.defineProperty(validMockImage, 'size', { value: 921600 });
    Object.defineProperty(validMockImage, 'data', { value: 'imageData' });

    // Invalid image file mock
    const invalidMockImage: File = new File([''], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });
    Object.defineProperty(invalidMockImage, 'size', { value: 2097152 });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(DesignSystemAngularModule)],
            declarations: [ImageButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ImageButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        jest.clearAllMocks();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the handleImageUpload() function and return upload error', () => {
        const input = fixture.debugElement.query(By.css('.image-button__input'));
        const handleImageUploadSpy = spyOn(component, 'handleImageUpload');

        input.triggerEventHandler('change', validMockImage);

        expect(handleImageUploadSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the validateImageSize() function', () => {
        const validateImageSizeSpy = spyOn(component, 'validateImageSize');

        component.handleImageUpload(validMockImage);

        expect(validateImageSizeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the validateImageSize() function and return error', () => {
        const errorEventSpy = spyOn(component.errorEvent, 'emit');
        component.handleImageUpload(null);

        expect(errorEventSpy).toHaveBeenCalledWith('Erro no upload da imagem');
    });

    it('should call the sendSelectedImage() function', () => {
        const errorEventSpy = spyOn(component.selectedImageEvent, 'emit');

        component.sendSelectedImage(validMockImage);

        expect(errorEventSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the validateImageSize() function and call readAsDataURL', () => {
        Object.defineProperty(global, 'FileReader', {
            writable: true,
            value: jest.fn().mockImplementation(() => ({
                readAsDataURL: jest.fn(),
                onLoad: jest.fn(),
            })),
        });

        component.validateImageSize(validMockImage);
    });

    it('should call the validateImageSize() function and return error', () => {
        const errorEventSpy = spyOn(component.errorEvent, 'emit');
        component.validateImageSize(invalidMockImage);

        expect(errorEventSpy).toHaveBeenCalledWith('Imagem deve ter tamanho máximo de 1MB');
    });

    // TODO: test FileReader functions
});
