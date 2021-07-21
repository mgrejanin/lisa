import { NgxMaskModule } from 'ngx-mask';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerRegisterSharedModule } from '@picpay/seller-register/shared';

// Modules
import { SellerRegisterFormRoutingModule } from './seller-register-form.routing.module';

//Containers
import { FormComponent } from './form/form.component';

// Components
import { MockupComponent } from './components/mockup/mockup.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { ImageButtonComponent } from './components/image-button/image-button.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { StaticContentComponent } from './components/static-content/static-content.component';

// Pages
import { WelcomeHowGoodComponent } from './pages/welcome-how-good/welcome-how-good.component';
import { WelcomeTipsComponent } from './pages/welcome-tips/welcome-tips.component';
import { ResponsibleDataComponent } from './pages/responsible-data/responsible-data.component';
import { PersonalAddressComponent } from './pages/personal-address/personal-address.component';
import { CellValidationComponent } from './pages/cell-validation/cell-validation.component';
import { ProComponent } from './pages/pro/pro.component';
import { CompanyDataComponent } from './pages/company-data/company-data.component';
import { GoodYouBackComponent } from './pages/good-you-back/good-you-back.component';
import { PasswordComponent } from './pages/password/password.component';
import { RegisterCompletedComponent } from './pages/register-completed/register-completed.component';
import { AdditionalInformationComponent } from './pages/additional-information/additional-information.component';
import { CompanyLogoNameComponent } from './pages/company-logo-name/company-logo-name.component';
import { FeesComponent } from './pages/fees/fees.component';

// Pipes
import { FirstNamePipe } from './pipes/first-name/first-name.pipe';
import { StepperGuard } from './guards/stepper/stepper.guard';

const pipes = [FirstNamePipe];
const pages = [
    WelcomeHowGoodComponent,
    WelcomeTipsComponent,
    ResponsibleDataComponent,
    PersonalAddressComponent,
    CellValidationComponent,
    ProComponent,
    CompanyDataComponent,
    GoodYouBackComponent,
    PasswordComponent,
    RegisterCompletedComponent,
    AdditionalInformationComponent,
    CompanyLogoNameComponent,
    FeesComponent,
];
@NgModule({
    imports: [
        CommonModule,
        SellerRegisterFormRoutingModule,
        DesignSystemAngularModule,
        NgxMaskModule.forRoot(),
        SellerRegisterSharedModule,
    ],
    declarations: [
        FormComponent,
        MockupComponent,
        RangeSliderComponent,
        ImageButtonComponent,
        HeaderComponent,
        LogoComponent,
        StaticContentComponent,
        ...pages,
        ...pipes,
    ],
    exports: [],
    providers: [StepperGuard],
})
export class SellerRegisterFormModule {}
