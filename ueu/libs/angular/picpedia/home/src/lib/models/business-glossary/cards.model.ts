import { PicpediaRoutePath, PicpediaRouteTitle } from '@picpay/picpedia/shared';

export interface PicpediaCardsGlossary {
    title: PicpediaRouteTitle | string;
    icon: string;
    link: PicpediaRoutePath | string;
}

export const bussinessGlossaryCard: PicpediaCardsGlossary[] = [
    {
        title: PicpediaRouteTitle.GlossaryDashboards,
        icon: 'charts-chart-pie-alt',
        link: PicpediaRoutePath.GlossaryDashboards,
    },
    { title: PicpediaRouteTitle.GlossaryMetrics, icon: 'charts-chart-line', link: PicpediaRoutePath.GlossaryMetrics },
    { title: PicpediaRouteTitle.GlossaryModels, icon: 'charts-signal', link: PicpediaRoutePath.GlossaryModels },
    { title: 'Tabelas', icon: 'tech-database-alt', link: '' },
];
