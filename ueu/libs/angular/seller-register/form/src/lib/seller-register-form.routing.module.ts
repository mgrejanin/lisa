import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { getNavigationStep, NavigationRoutes } from './models/navigation.model';

// Components
import { FormComponent } from './form/form.component';
import { WelcomeHowGoodComponent } from './pages/welcome-how-good/welcome-how-good.component';
import { WelcomeTipsComponent } from './pages/welcome-tips/welcome-tips.component';
import { ResponsibleDataComponent } from './pages/responsible-data/responsible-data.component';
import { PersonalAddressComponent } from './pages/personal-address/personal-address.component';
import { CellValidationComponent } from './pages/cell-validation/cell-validation.component';
import { ProComponent } from './pages/pro/pro.component';
import { CompanyDataComponent } from './pages/company-data/company-data.component';
import { StepperGuard } from './guards/stepper/stepper.guard';
import { GoodYouBackComponent } from './pages/good-you-back/good-you-back.component';
import { PasswordComponent } from './pages/password/password.component';
import { RegisterCompletedComponent } from './pages/register-completed/register-completed.component';
import { AdditionalInformationComponent } from './pages/additional-information/additional-information.component';
import { CompanyLogoNameComponent } from './pages/company-logo-name/company-logo-name.component';
import { FeesComponent } from './pages/fees/fees.component';

const routes: Routes = [
    {
        path: '',
        component: FormComponent,
        canActivate: [StepperGuard],
        canActivateChild: [StepperGuard],
        data: { trackData: { eventLabel: 'Cadastro Web' }, ...getNavigationStep()[0] },
        children: [
            {
                path: '',
                component: WelcomeHowGoodComponent,
                data: getNavigationStep()[0],
            },
            {
                path: NavigationRoutes.Welcome,
                component: WelcomeHowGoodComponent,
                data: getNavigationStep()[0],
            },
            {
                path: NavigationRoutes.Responsible,
                component: ResponsibleDataComponent,
                data: getNavigationStep()[1],
            },
            {
                path: NavigationRoutes.PersonalAddress,
                component: PersonalAddressComponent,
                data: getNavigationStep()[2],
            },
            {
                path: NavigationRoutes.CellValidation,
                component: CellValidationComponent,
                data: getNavigationStep()[3],
            },
            {
                path: NavigationRoutes.CompanyData,
                component: CompanyDataComponent,
                data: getNavigationStep()[4],
            },
            {
                path: NavigationRoutes.Password,
                component: PasswordComponent,
                data: getNavigationStep()[6],
            },
            {
                path: NavigationRoutes.CompanyLogoName,
                component: CompanyLogoNameComponent,
                data: getNavigationStep()[7],
            },
            {
                path: NavigationRoutes.Fees,
                component: FeesComponent,
                data: getNavigationStep()[8],
            },
            // presentation screen
            {
                path: NavigationRoutes.WelcomeTips,
                component: WelcomeTipsComponent,
            },
            {
                path: NavigationRoutes.Pro,
                component: ProComponent,
            },
            {
                path: NavigationRoutes.GoodYouBack,
                component: GoodYouBackComponent,
            },
            {
                path: NavigationRoutes.RegisterCompleted,
                component: RegisterCompletedComponent,
            },
            {
                path: NavigationRoutes.AdditionalInfo,
                component: AdditionalInformationComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SellerRegisterFormRoutingModule {}
