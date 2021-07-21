import { Story as StorybookStory } from '@storybook/addon-docs/blocks';

import Preview from './Preview';

const Story = ({ withToolbar = true, ...props }) => {
    return (
        <Preview withToolbar={withToolbar}>
            <StorybookStory {...props} />
        </Preview>
    );
};

export default Story;
