import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupComponent } from './mockup.component';

describe('MockupComponent', () => {
    let component: MockupComponent;
    let fixture: ComponentFixture<MockupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockupComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MockupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a businessAvatar @Input()', () => {
        expect(component.businessAvatar).toBeUndefined();
    });

    it('should have a businessName @Input()', () => {
        expect(component.businessName).toBeUndefined();
    });

    it('should have a businessAddress @Input()', () => {
        expect(component.businessAddress).toBeUndefined();
    });

    it('should have a defaultAvatar', () => {
        expect(component.defaultAvatar).toBeDefined();
        expect(component.defaultAvatar).toContain('assets/seller-register/icons/store.svg');
    });

    it('should have a defaultName', () => {
        expect(component.defaultName).toBeDefined();
        expect(component.defaultName).toContain('Nome do seu Estabelecimento');
    });

    it('should have a defaultAddress', () => {
        expect(component.defaultAddress).toBeDefined();
        expect(component.defaultAddress).toContain('Avenida do seu estabelecimento');
    });

    it('should update the businessAvatar', () => {
        component.businessAvatar = 'imageUrl';

        expect(component.businessAvatar).toEqual('imageUrl');
    });

    it('should update the businessName', () => {
        component.businessName = 'PicPay';

        expect(component.businessName).toEqual('PicPay');
    });

    it('should update the businessAddress', () => {
        component.businessAddress = 'Vila Leopoldina, São Paulo';

        expect(component.businessAddress).toEqual('Vila Leopoldina, São Paulo');
    });
});
