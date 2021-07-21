import { Canvas } from '@storybook/addon-docs/blocks';

// eslint-disable-next-line react/prop-types
const Preview = ({ children, ...props }) => <Canvas {...props}>{children}</Canvas>;

export default Preview;
