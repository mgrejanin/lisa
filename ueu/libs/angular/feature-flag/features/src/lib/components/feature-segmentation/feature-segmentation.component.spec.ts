import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// components
import { MatIcon } from '@angular/material/icon';
import { FeatureSegmentationComponent } from './feature-segmentation.component';

// interfaces
import { Comparator, FeatureCondition, FeatureConditionExpression, FeatureType } from '../../models';

// ng-mocks
import { MockComponent, MockModule } from 'ng-mocks';

// modules
import { SharedPipesModule } from '@picpay/angular/shared/pipes';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

describe('FeatureSegmentationComponent', () => {
    let component: FeatureSegmentationComponent;
    let fixture: ComponentFixture<FeatureSegmentationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeatureSegmentationComponent, MockComponent(MatIcon)],
            imports: [MockModule(SharedPipesModule), DesignSystemAngularModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeatureSegmentationComponent);
        component = fixture.componentInstance;

        component.segmentation = new FeatureCondition('mockName', 1, 10, 'false', [
            new FeatureConditionExpression('appOS', Comparator.EQUAL, 'mockOS'),
            new FeatureConditionExpression('appVersion', Comparator.EQUAL, 'mockVersion'),
            new FeatureConditionExpression('groups', Comparator.CONTAINS, 'mockGroup'),
        ]);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // controller

    it('should have getSystem function', () => {
        const conditions = [new FeatureConditionExpression('appOS', Comparator.EQUAL, 'mockOs')];

        const result = component.getSystem(conditions);

        expect(result).toBe(conditions[0].value);
    });

    it('should have getClientGroup function', () => {
        const conditions = [new FeatureConditionExpression('appOS', Comparator.EQUAL, 'mockOs')];

        let results = component.getClientGroup(conditions);

        expect(results).toBe(undefined);

        conditions.unshift(new FeatureConditionExpression('groups', Comparator.CONTAINS, 'PicPayLovers'));

        results = component.getClientGroup(conditions);

        expect(results).toBe(conditions[0].value);
    });

    it('should have getVersion function (not defined)', () => {
        const conditions = [];

        const result = component.getVersion(conditions);

        expect(result).toBe('Todas');
    });

    it('should have getVersion function (interval)', () => {
        const conditions = [
            new FeatureConditionExpression('appVersion', Comparator.GREATER_OR_EQUAL, 'minVersion'),
            new FeatureConditionExpression('appVersion', Comparator.LESS_OR_EQUAL, 'maxVersion'),
        ];

        const result = component.getVersion(conditions);

        expect(result).toBe('minVersion à maxVersion');
    });

    it('should have getVersion function (less)', () => {
        const conditions = [new FeatureConditionExpression('appVersion', Comparator.EQUAL, 'mockVersion')];

        const result = component.getVersion(conditions);

        expect(result).toBe('mockVersion');
    });

    it('should have getVersion function (less)', () => {
        const conditions = [new FeatureConditionExpression('appVersion', Comparator.LESS, 'mockVersion')];

        const result = component.getVersion(conditions);

        expect(result).toBe('Menores que mockVersion');
    });

    it('should have getVersion function (less or equal)', () => {
        const conditions = [new FeatureConditionExpression('appVersion', Comparator.LESS_OR_EQUAL, 'mockVersion')];

        const result = component.getVersion(conditions);

        expect(result).toBe('Menores ou iguais à mockVersion');
    });

    it('should have getVersion function (greater)', () => {
        const conditions = [new FeatureConditionExpression('appVersion', Comparator.GREATER, 'mockVersion')];

        const result = component.getVersion(conditions);

        expect(result).toBe('Maiores que mockVersion');
    });

    it('should have getVersion function (greater or equal)', () => {
        const conditions = [new FeatureConditionExpression('appVersion', Comparator.GREATER_OR_EQUAL, 'mockVersion')];

        const result = component.getVersion(conditions);

        expect(result).toBe('Maiores ou iguais à mockVersion');
    });

    it('should have toggleActive function', () => {
        // testing initial value
        expect(component.isActive).toBe(false);

        component.toggleActive();

        expect(component.isActive).toBe(true);

        component.toggleActive();

        expect(component.isActive).toBe(false);
    });

    it('should have onCollapse function', () => {
        expect(component.isCollapsed).toBe(false);

        component.onCollapse();

        expect(component.isCollapsed).toBe(true);

        component.onCollapse();

        expect(component.isCollapsed).toBe(false);
    });

    // template

    it('should have a toggle button with the segmentation name on it', () => {
        const title = fixture.debugElement.query(By.css('.c-feature-segmentation__title'));
        const toggleSpy = spyOn(component, 'toggleActive');

        title.nativeElement.click();

        expect(title.nativeElement.textContent.trim()).toBe(`${component.segmentation.name}  keyboard_arrow_down`);
        expect(toggleSpy).toHaveBeenCalled();
    });

    it('should display system', () => {
        const systemTitle = fixture.debugElement.query(By.css('.c-feature-segmentation__system-title'));
        const systemValue = fixture.debugElement.query(By.css('.c-feature-segmentation__system-value'));

        expect(systemTitle.nativeElement.textContent.trim()).toEqual('Sistema');
        expect(systemValue.nativeElement.textContent.trim()).toEqual(`mockOS`);
    });

    it('should display client group', () => {
        const clientGroupTitle = fixture.debugElement.query(By.css('.c-feature-segmentation__client-group-title'));
        const clientGroupValue = fixture.debugElement.query(By.css('.c-feature-segmentation__client-group-value'));

        expect(clientGroupTitle.nativeElement.textContent.trim()).toEqual('Grupo alvo');
        expect(clientGroupValue.nativeElement.textContent.trim()).toEqual(`mockGroup`);
    });

    it('should display version', () => {
        const versionTitle = fixture.debugElement.query(By.css('.c-feature-segmentation__version-title'));
        const versionValue = fixture.debugElement.query(By.css('.c-feature-segmentation__version-value'));

        expect(versionTitle.nativeElement.textContent.trim()).toEqual('Versão');
        expect(versionValue.nativeElement.textContent.trim()).toEqual(`mockVersion`);
    });

    it('should display value', () => {
        const valueTitle = fixture.debugElement.query(By.css('.c-feature-segmentation__value-title'));
        const valueValue = fixture.debugElement.query(By.css('.c-feature-segmentation__value-value'));

        expect(valueTitle.nativeElement.textContent.trim()).toEqual('Valor');
        expect(valueValue.nativeElement.textContent.trim()).toEqual(component.segmentation.value.toString());
    });

    it('should display percentage of the public', () => {
        const percentageTitle = fixture.debugElement.query(By.css('.c-feature-segmentation__percentage-title'));
        const percentageValue = fixture.debugElement.query(By.css('.c-feature-segmentation__percentage-value'));

        expect(percentageTitle.nativeElement.textContent.trim()).toEqual('Porcentagem do público');
        expect(percentageValue.nativeElement.textContent.trim()).toEqual(`${component.segmentation.percentage}%`);
    });

    it('should have formatted json', () => {
        const supposedJsonContent = fixture.debugElement.query(By.css('.c-feature-segmentation__content-json'));
        const valueContent = fixture.debugElement.query(By.css('.c-feature-segmentation__content-default-value'));

        expect(supposedJsonContent).toBeNull();
        expect(valueContent).not.toBeNull();

        component.featureType = FeatureType.JSON;

        fixture.detectChanges();

        const jsonContent = fixture.debugElement.query(By.css('.c-feature-segmentation__content-json'));
        const supposedValueContent = fixture.debugElement.query(
            By.css('.c-feature-segmentation__content-default-value'),
        );

        expect(jsonContent).not.toBeNull();
        expect(supposedValueContent).toBeNull();
    });
});
