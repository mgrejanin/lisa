import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import * as d from '@picpay/design-system-angular-components';

import { appInitialize } from './app-initialize';

import { BooleanValueAccessorDirective } from './control-value-accessors/boolean-value-accessor';
import { NumericValueAccessorDirective } from './control-value-accessors/numeric-value-accesssor';
import { RadioValueAccessorDirective } from './control-value-accessors/radio-value-accessor';
import { SelectValueAccessorDirective } from './control-value-accessors/select-value-accessor';
import { TextValueAccessorDirective } from './control-value-accessors/text-value-accessor';

const DECLARATIONS = [
    BooleanValueAccessorDirective,
    NumericValueAccessorDirective,
    RadioValueAccessorDirective,
    SelectValueAccessorDirective,
    TextValueAccessorDirective,
    d.ApolloAvatar,
    d.ApolloButton,
    d.ApolloCard,
    d.ApolloCardActionButtons,
    d.ApolloCardActionIcons,
    d.ApolloCardActions,
    d.ApolloCardContent,
    d.ApolloCardMedia,
    d.ApolloCardMediaContent,
    d.ApolloCheckbox,
    d.ApolloCircularProgress,
    d.ApolloDialog,
    d.ApolloFeedbackButton,
    d.ApolloFeedbackCard,
    d.ApolloFeedbackPage,
    d.ApolloFeedbackPageActions,
    d.ApolloFeedbackPageContent,
    d.ApolloGhostElement,
    d.ApolloGrid,
    d.ApolloGridItem,
    d.ApolloHeader,
    d.ApolloIcon,
    d.ApolloIconButton,
    d.ApolloList,
    d.ApolloListDivider,
    d.ApolloListGroup,
    d.ApolloListItem,
    d.ApolloMenu,
    d.ApolloModal,
    d.ApolloProgressBar,
    d.ApolloRadio,
    d.ApolloSelect,
    d.ApolloSelectIcon,
    d.ApolloSelectItem,
    d.ApolloSkeleton,
    d.ApolloSnackbar,
    d.ApolloStack,
    d.ApolloSwitchToggle,
    d.ApolloTemplateSkeleton,
    d.ApolloTextfield,
    d.ApolloTextfieldIcon,
    d.ApolloToggleButton,
    d.TextfieldCharacterCounter,
    d.TextfieldHelperText,
    d.ApolloBox,
    d.ApolloCenter,
    d.ApolloContainer,
    d.ApolloFlex,
    d.ApolloHeading,
    d.ApolloLink,
    d.ApolloSimpleGrid,
    d.ApolloStack,
    d.ApolloText,
    d.ApolloWrap,
    d.ApolloCollapse,
    d.ApolloTooltip,
];

@NgModule({
    imports: [CommonModule],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class DesignSystemAngularModule {
    static forRoot(): ModuleWithProviders<DesignSystemAngularModule> {
        return {
            ngModule: DesignSystemAngularModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitialize,
                    multi: true,
                    deps: [DOCUMENT, NgZone],
                },
            ],
        };
    }
}
