import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BannerComponent } from './banner.component';
import { ProductsStore } from '../../data-access/products/products.store';

import { UiStore } from '../../data-access/ui/ui.store';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let store;
    const image = './assets/images/portaldev.png';
    const backgroundColor = 'rgb(26, 26, 26)';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BannerComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [ProductsStore],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(UiStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should correctly render the passed @Input height value', () => {
        component.height = '500px';
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.banner').style.height).toEqual(`500px`);
    });

    it('should correctly render the passed @Input background-color value', () => {
        const banner: HTMLElement = fixture.nativeElement.querySelector('.banner');
        component.backgroundColor = backgroundColor;
        fixture.detectChanges();
        expect(banner.style.backgroundColor).toBe(backgroundColor);
    });

    it('should correctly render the passed @Input background-image value', () => {
        store.updateIsMobile(true);
        const backgroundMobile: HTMLElement = fixture.nativeElement.querySelector('.background-mobile');
        component.backgroundImage = image;
        fixture.detectChanges();
        expect(backgroundMobile.style.backgroundImage).toBe(`url(${image})`);
    });
});
