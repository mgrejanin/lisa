import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './sidebar.docs.mdx';

export default {
    title: 'Navigation/Sidebar',
    component: 'apollo-sidebar',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        collapsed: {
            description: 'Quando definido como verdadeiro, o `collapse` irá alternar para fechado',
            control: {
                type: 'boolean',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-sidebar {...args}>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="brand-apple-alt" />
                Item 1
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="charts-chart-line" />
                Item 2
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="communication-comment-alt-dots" />
                Item 3
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="file-folder" />
                Item 4
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="devices-desktop" />
                Item 5
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="location-car" />
                Item 6
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="file-clipboard-notes" />
                Item 7
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="interface-user" />
                Item 8
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="money_business-calculator" />
                Item 9
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="multimedia-scenery" />
                Item 10
            </apollo-nav-item>
        </apollo-sidebar>
    );
};

export const Collapsed = (args: any) => {
    return (
        <apollo-sidebar {...args}>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="brand-apple-alt" />
                Item 1
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="charts-chart-line" />
                Item 2
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="communication-comment-alt-dots" />
                Item 3
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="file-folder" />
                Item 4
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="devices-desktop" />
                Item 5
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="location-car" />
                Item 6
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="file-clipboard-notes" />
                Item 7
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="interface-user" />
                Item 8
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="money_business-calculator" />
                Item 9
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="multimedia-scenery" />
                Item 10
            </apollo-nav-item>
        </apollo-sidebar>
    );
};

Collapsed.args = {
    collapsed: true,
};

export const Submenu = (args: any) => {
    return (
        <apollo-sidebar {...args}>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="brand-apple-alt" />
                Item 1
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="charts-chart-line" />
                Item 2
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="communication-comment-alt-dots" />
                Item 3
            </apollo-nav-item>
            <apollo-collapse slot="menu">
                <apollo-nav-item slot="header">
                    <apollo-icon slot="item-start" svg-icon="file-folder" />
                    Item 4
                    <apollo-icon slot="item-end" svg-icon="arrows-angle-down-b" />
                </apollo-nav-item>
                <apollo-nav-item slot="body">SubItem 1</apollo-nav-item>
                <apollo-nav-item slot="body">SubItem 2</apollo-nav-item>
                <apollo-nav-item slot="body">SubItem 3</apollo-nav-item>
            </apollo-collapse>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="interface-user" />
                Item 5
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="location-car" />
                Item 6
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="file-clipboard-notes" />
                Item 7
            </apollo-nav-item>
            <apollo-collapse slot="menu">
                <apollo-nav-item slot="header">
                    <apollo-icon slot="item-start" svg-icon="devices-desktop" />
                    Item 8
                    <apollo-icon slot="item-end" svg-icon="arrows-angle-down-b" />
                </apollo-nav-item>
                <apollo-nav-item slot="body">SubItem 1</apollo-nav-item>
                <apollo-nav-item slot="body">SubItem 2</apollo-nav-item>
                <apollo-nav-item slot="body">SubItem 3</apollo-nav-item>
            </apollo-collapse>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="money_business-calculator" />
                Item 9
            </apollo-nav-item>
            <apollo-nav-item slot="menu">
                <apollo-icon slot="item-start" svg-icon="multimedia-scenery" />
                Item 10
            </apollo-nav-item>
        </apollo-sidebar>
    );
};
