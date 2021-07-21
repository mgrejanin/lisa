export enum NavigationRoutes {
    Welcome = 'bem-vindo',
    WelcomeTips = 'dicas',
    Responsible = 'responsavel',
    PersonalAddress = 'endereco-responsavel',
    CellValidation = 'validacao-telefone',
    Pro = 'picpay-pro',
    CompanyData = 'empresa',
    CompanyAddress = 'endereco-empresa',
    GoodYouBack = 'vamos-novamente',
    Password = 'senha',
    RegisterCompleted = 'cadastro-concluido',
    AdditionalInfo = 'informacao-adicional',
    CompanyLogoName = 'empresa-detalhe',
    Fees = 'taxas',
}
export interface Navigate {
    path: string;
    step: number;
}

export function getNavigationStep(): Navigate[] {
    const navigationStep = [
        { path: NavigationRoutes.Welcome, step: 0 },
        { path: NavigationRoutes.Responsible, step: 1 },
        { path: NavigationRoutes.PersonalAddress, step: 2 },
        { path: NavigationRoutes.CellValidation, step: 3 },
        { path: NavigationRoutes.CompanyData, step: 4 },
        { path: NavigationRoutes.CompanyAddress, step: 5 },
        { path: NavigationRoutes.Password, step: 6 },
        { path: NavigationRoutes.CompanyLogoName, step: 7 },
        { path: NavigationRoutes.Fees, step: 8 },
    ];

    return navigationStep;
}
