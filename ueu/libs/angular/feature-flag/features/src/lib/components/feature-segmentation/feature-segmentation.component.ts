import { Component, Input, OnInit } from '@angular/core';

// interfaces
import { Comparator, FeatureCondition, FeatureConditionExpression, FeatureType } from '../../models';

@Component({
    selector: 'feature-flag-features-feature-segmentation',
    templateUrl: './feature-segmentation.component.html',
    styleUrls: ['./feature-segmentation.component.scss'],
})
export class FeatureSegmentationComponent implements OnInit {
    @Input() segmentation: FeatureCondition;
    @Input() featureType: FeatureType;

    readonly featureTypes: typeof FeatureType = FeatureType;

    isActive: boolean;
    clientGroup: string;
    isCollapsed: boolean;

    constructor() {
        this.isActive = false;
        this.isCollapsed = false;
    }

    ngOnInit() {
        this.getClientGroup(this.segmentation.expressions);
    }

    getSystem(expressions: FeatureConditionExpression[]): string {
        const index = expressions.findIndex(expression => expression.param === 'appOS');
        const systemId = expressions[index].value;

        return systemId;
    }

    getClientGroup(expressions: FeatureConditionExpression[]): string {
        const index = expressions.findIndex(expression => expression.param === 'groups');
        this.clientGroup = expressions[index]?.value;

        return this.clientGroup;
    }

    getVersion(expressions: FeatureConditionExpression[]): string {
        const conditions = expressions.filter(exp => exp.param === 'appVersion');

        if (conditions.length === 0) {
            return 'Todas';
        }

        if (conditions.length > 1) {
            // unfortunately this is a bit of business logic
            // on the front end side. Always work with the version interval
            // being >= min version and <= max version.
            const minIndex = expressions.findIndex(exp => exp.comparator === Comparator.GREATER_OR_EQUAL);
            const maxIndex = expressions.findIndex(exp => exp.comparator === Comparator.LESS_OR_EQUAL);

            return `${expressions[minIndex].value} à ${expressions[maxIndex].value}`;
        }

        switch (conditions[0].comparator) {
            case Comparator.EQUAL:
                return conditions[0].value;
            case Comparator.LESS:
                return `Menores que ${conditions[0].value}`;

            case Comparator.LESS_OR_EQUAL:
                return `Menores ou iguais à ${conditions[0].value}`;

            case Comparator.GREATER:
                return `Maiores que ${conditions[0].value}`;

            case Comparator.GREATER_OR_EQUAL:
                return `Maiores ou iguais à ${conditions[0].value}`;
        }
    }

    // utils
    toggleActive(): void {
        this.isActive = !this.isActive;
    }

    onCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
