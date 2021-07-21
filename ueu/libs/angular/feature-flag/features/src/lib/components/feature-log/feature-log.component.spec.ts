import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FeatureLogComponent } from './feature-log.component';

// interfaces
import { FeatureAuditing, User } from '../../models';

describe('FeatureLogComponent', () => {
    let component: FeatureLogComponent;
    let fixture: ComponentFixture<FeatureLogComponent>;

    let mockCommits: FeatureAuditing[];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeatureLogComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        mockCommits = [
            new FeatureAuditing(
                'idMock',
                'messageMock',
                'createdMock',
                2,
                'timeMock',
                new User('id', 'name', 'fullname', 'userEmail', ''),
            ),
            new FeatureAuditing(
                'idMock2',
                'messageMock2',
                'createdMock2',
                1,
                'timeMock2',
                new User('id', 'name', 'fullname', 'userEmail', ''),
            ),
        ];

        fixture = TestBed.createComponent(FeatureLogComponent);
        component = fixture.componentInstance;
        component.commits = mockCommits;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // template

    it('should display log', () => {
        const logs = fixture.debugElement.queryAll(By.css('.c-feature-log__log'));

        expect(logs.length).toEqual(component.commits.length);

        // FIRST LOG
        const firstLog = logs[0];
        const firstMessage = firstLog.query(By.css('.c-feature-log__log--message'));
        const firstInfo = firstLog.query(By.css('.c-feature-log__log--info'));

        expect(firstMessage.nativeElement.textContent.trim()).toBe('Alteração realizada');
        expect(firstInfo.nativeElement.textContent.trim()).toBe(
            `Por ${component.commits[0].user.name} em ${component.commits[0].createdAt}`,
        );

        // SECOND LOG
        const secondLog = logs[1];
        const secondMessage = secondLog.query(By.css('.c-feature-log__log--message'));
        const secondInfo = secondLog.query(By.css('.c-feature-log__log--info'));

        expect(secondMessage.nativeElement.textContent.trim()).toBe('Funcionalidade criada');
        expect(secondInfo.nativeElement.textContent.trim()).toBe(
            `Por ${component.commits[1].user.name} em ${component.commits[1].createdAt}`,
        );
        expect(secondLog.classes['no-after']).toBe(true);
    });

    it('should display empty content if there is no commits', () => {
        component.commits = [];

        fixture.detectChanges();

        const emptyMessage = fixture.debugElement.query(By.css('.c-feature-log__empty-message'));

        expect(emptyMessage).not.toBeNull();
        expect(emptyMessage.nativeElement.textContent.trim()).toBe(
            'Ops, não encontramos nenhum histórico de alterações.',
        );
    });
});
