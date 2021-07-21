import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './logo.docs.mdx';

export default {
    title: 'Components/Logo',
    component: 'apollo-logo',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        nickname: {
            description: 'O nome curto do logo.',
            control: {
                type: 'text',
            },
        },
        content: {
            description: 'O nome do logo.',
            control: {
                type: 'text',
            },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-logo nickname={args.nickname}>{args.content}</apollo-logo>;
};

Base.args = {
    nickname: 'H',
    content: 'herodash',
};
