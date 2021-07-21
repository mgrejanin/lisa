import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { NoticeComponent } from './notice.component';

describe('NoticeComponent', () => {
    let component: NoticeComponent;
    let fixture: ComponentFixture<NoticeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NoticeComponent],
            imports: [DesignSystemAngularModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NoticeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
