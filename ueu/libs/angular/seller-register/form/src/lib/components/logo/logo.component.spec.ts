import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
    let component: LogoComponent;
    let fixture: ComponentFixture<LogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogoComponent],
            imports: [RouterTestingModule.withRoutes([]), DesignSystemAngularModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Deve exibir a logo', () => {
        const logo = fixture.debugElement.query(By.css('#svg_logo_header')).nativeElement as HTMLImageElement;
        expect(logo.src).toContain('assets/seller-register/images/logo.svg');
    });
});
