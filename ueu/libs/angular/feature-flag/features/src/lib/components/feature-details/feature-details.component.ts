import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

// interfaces
import { Feature, FeatureAuditing, FeatureType } from '../../models';

// services
import { FeaturesService } from '../../data-access/features/features.service';
import { createFeatureFlagPermissions, FeatureFlagPermissions } from '@picpay/feature-flag/auth';

@Component({
    selector: 'feature-flag-features-feature-details',
    templateUrl: './feature-details.component.html',
    styleUrls: ['./feature-details.component.scss'],
})
export class FeatureDetailsComponent implements OnChanges {
    @Input() feature: Feature;
    @Input() commits: FeatureAuditing[];

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() readonly close: EventEmitter<void>;
    @Output() readonly edit: EventEmitter<Feature>;
    @Output() readonly delete: EventEmitter<string>;

    readonly featureTypes: typeof FeatureType = FeatureType;

    isCollapsed: boolean;

    // roles
    canShow: FeatureFlagPermissions;

    constructor(private featuresService: FeaturesService) {
        this.close = new EventEmitter();
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.isCollapsed = false;
    }
    ngOnChanges(changes: SimpleChanges): void {
        // roles
        if (changes.feature?.currentValue !== changes.feature?.previousValue) {
            this.canShow = createFeatureFlagPermissions({
                availableToAdmin: false,
                availableToEditor: true,
                availableToSquadAdmin: [this.feature?.squad.id],
                availableToSquadEditor: [this.feature?.squad.id],
            });
        }
    }

    onClose(): void {
        this.close.emit();
    }

    onEdit(feature: Feature): void {
        this.edit.emit(feature);
    }

    onDelete(featureId: string): void {
        this.delete.emit(featureId);
    }

    // utils

    getTypeName(type: FeatureType): string {
        return this.featuresService.getTypeName(type);
    }

    onCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
