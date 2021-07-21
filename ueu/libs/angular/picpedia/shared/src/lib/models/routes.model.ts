export enum PicpediaRoutePath {
    Home = 'home',
    Tags = 'tags',
    BusinessGlossary = 'glossario-de-negocios',
    GlossaryDashboards = 'glossario-de-negocios/dashboards',
    GlossaryDashboardsList = 'glossario-de-negocios/dashboards/:groupName',
    GlossaryDashboardsDetail = 'glossario-de-negocios/dashboards/:groupName/:dashboardName',
    GlossaryMetrics = 'glossario-de-negocios/metrics',
    GlossaryMetricsList = 'glossario-de-negocios/metrics/:groupName',
    GlossaryMetricsDetail = 'glossario-de-negocios/metrics/:groupName/:dashboardName',
    GlossaryModels = 'glossario-de-negocios/models',
    GlossaryModelsList = 'glossario-de-negocios/models/:groupName',
    GlossaryModelsDetail = 'glossario-de-negocios/models/:groupName/:dashboardName',
}

export enum PicpediaRouteTitle {
    Home = 'Início',
    Tags = 'Tags',
    BusinessGlossary = 'Glossário de negócios',
    GlossaryDashboards = 'Dashboards',
    GlossaryDashboardsList = 'Listagem Detalhada',
    GlossaryDashboardsDetail = 'Detalhe',
    GlossaryMetrics = 'Métricas',
    GlossaryMetricsList = GlossaryDashboardsList,
    GlossaryMetricsDetail = GlossaryDashboardsDetail,
    GlossaryModels = 'Modelos',
    GlossaryModelsList = GlossaryDashboardsList,
    GlossaryModelsDetail = GlossaryDashboardsDetail,
}
