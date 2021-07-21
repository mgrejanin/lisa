import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './header.docs.mdx';

export default {
    title: 'Components/Header',
    component: 'apollo-header',
    parameters: {
        docs: { page: docs },
        notes: readme,
        previewTabs: {
            canvas: { hidden: false },
        },
    },
    argTypes: {
        'back-button': {
            description: 'Botão de voltar',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        collapsed: {
            description: 'Adiciona estilo ao header',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        media: {
            description: 'media',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div>
            <apollo-header {...args}>
                <div slot="back-button">
                    <apollo-icon-button icon="arrow_back"></apollo-icon-button>
                </div>
                <div slot="top-content">
                    <span data-scroll-hidden>Breadcrumb</span>
                </div>
                <div slot="action">
                    <div>
                        <apollo-icon-button icon="share"></apollo-icon-button>
                        <apollo-icon-button icon="notifications"></apollo-icon-button>
                    </div>
                    <apollo-avatar size="small" border="none"></apollo-avatar>
                </div>
                <div slot="title">
                    <span class="apollo-page__title" data-scroll-anchor>
                        Header title
                    </span>
                </div>
            </apollo-header>
            <div style={{ margin: '8px' }}>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae vestibulum purus, sit amet
                        tincidunt justo. Donec sodales tellus et efficitur dignissim. Ut urna libero, auctor ac felis a,
                        rhoncus ullamcorper est. Cras blandit faucibus est. Integer dapibus vitae dolor et molestie.
                        Nunc tristique, odio in scelerisque blandit, neque velit bibendum augue, sit amet suscipit
                        lectus neque non magna. Suspendisse iaculis tincidunt feugiat. Nulla a libero quis ex finibus
                        consectetur in in ipsum. Nulla convallis mollis mauris sed ullamcorper. Nulla facilisi. Aliquam
                        non dolor auctor, lobortis eros vitae, bibendum orci. Sed nisl lacus, rutrum et consequat in,
                        faucibus eget felis. Nunc porta ex quis ultrices varius. Maecenas vitae sapien ac nibh suscipit
                        faucibus fermentum ac turpis.
                    </p>
                    <p>
                        Suspendisse ac felis sapien. Donec fringilla suscipit elementum. Ut varius, mi eu elementum
                        aliquet, magna odio hendrerit ex, nec scelerisque odio enim vitae neque. Phasellus eu odio
                        pretium, ultricies leo a, pharetra nisi. Etiam suscipit commodo nisi. Sed quis purus sapien.
                        Cras nec posuere diam. Suspendisse consectetur purus ut sapien luctus, vitae fermentum augue
                        auctor. Quisque eget dignissim metus, ut venenatis tellus. Mauris vulputate finibus vehicula.
                        Duis eu orci sit amet mauris venenatis scelerisque non finibus orci.
                    </p>
                    <p>
                        Donec vestibulum leo turpis, vel accumsan dui convallis at. Nunc sit amet lectus nulla.
                        Vestibulum malesuada tellus eu lorem pharetra posuere. Nulla velit erat, cursus nec tincidunt
                        non, facilisis id purus. Nullam dapibus, ante in iaculis mattis, ex massa vestibulum elit, ut
                        dignissim augue tellus id nibh. Donec eget leo vitae velit ornare dignissim. Cras lacinia
                        eleifend metus id lacinia. Nam sagittis eros vitae quam ornare vehicula. Integer eget ornare
                        nisl. Donec luctus gravida placerat. Nam dolor libero, eleifend at interdum lacinia, pretium non
                        enim. Suspendisse viverra lobortis molestie.
                    </p>
                    <p>
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla
                        feugiat odio scelerisque imperdiet iaculis. Mauris bibendum consequat lectus, quis convallis
                        purus ultrices sit amet. Quisque mattis tempor purus, vel iaculis massa volutpat a. Nam eget
                        interdum orci, a sagittis sapien. Nulla facilisi. Fusce sem massa, placerat ac tincidunt mattis,
                        suscipit nec urna. Aenean felis mauris, tempor id dignissim eget, tincidunt viverra enim. Donec
                        ullamcorper pharetra aliquam. Vestibulum sed justo elit. Proin vestibulum nec turpis a molestie.
                    </p>
                    <p>
                        Vestibulum rutrum ac metus nec pellentesque. Etiam ornare fermentum augue, a vestibulum risus
                        ultricies ac. Suspendisse molestie sollicitudin ligula nec sagittis. Donec rutrum sollicitudin
                        quam, vel tincidunt nisi porta tristique. In condimentum metus at ante eleifend accumsan. Proin
                        nec tempor sem. Donec interdum odio vitae risus consectetur, ac convallis metus tempor. Aliquam
                        metus mauris, lobortis id risus a, auctor feugiat orci. Proin eros erat, vehicula at nisl in,
                        condimentum tempor justo. Vivamus tristique sollicitudin purus, ac mollis ante congue quis. Duis
                        vitae hendrerit elit, vel iaculis leo. Aenean vestibulum sodales pulvinar. Class aptent taciti
                        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi.
                        Phasellus sagittis, nunc ac mattis fermentum, magna orci lacinia sapien, vitae rhoncus enim
                        purus in est.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae vestibulum purus, sit amet
                        tincidunt justo. Donec sodales tellus et efficitur dignissim. Ut urna libero, auctor ac felis a,
                        rhoncus ullamcorper est. Cras blandit faucibus est. Integer dapibus vitae dolor et molestie.
                        Nunc tristique, odio in scelerisque blandit, neque velit bibendum augue, sit amet suscipit
                        lectus neque non magna. Suspendisse iaculis tincidunt feugiat. Nulla a libero quis ex finibus
                        consectetur in in ipsum. Nulla convallis mollis mauris sed ullamcorper. Nulla facilisi. Aliquam
                        non dolor auctor, lobortis eros vitae, bibendum orci. Sed nisl lacus, rutrum et consequat in,
                        faucibus eget felis. Nunc porta ex quis ultrices varius. Maecenas vitae sapien ac nibh suscipit
                        faucibus fermentum ac turpis.
                    </p>
                </div>
            </div>
        </div>
    );
};

Base.args = {
    'dialog-title': 'Apollo Dialog',
    'dialog-subtitle': 'Descrição da Dialog',
    'cancel-button-label': 'Cancelar',
    'confirm-button-label': 'Confirmar',
};
