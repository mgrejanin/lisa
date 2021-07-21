import { ArgsTable as Props, PRIMARY_STORY } from '@storybook/addon-docs/blocks';

Props.defaultProps = { ...Props.defaultProps, story: PRIMARY_STORY };

export { Props };

export { default as Status } from './Statuses';
export { default as Story } from './Story';
export { default as Preview } from './Preview';
export { default as Icons } from './Icons';
export { default as Colors } from './Colors';
export { default as Spacings } from './Spacings';
export { default as BorderRadius } from './BorderRadius';
export { default as BorderWidth } from './BorderWidth';
export { default as Headings } from './Headings';
export { default as Texts } from './Texts';
export { default as Teaser } from './Teaser';
export { default as Grid } from './Grid';
export { default as BoxShadow } from './BoxShadow';
export { default as Opacity } from './Opacity';
export { default as LineHeight } from './LineHeight';
export { default as FontWeight } from './FontWeight';
export { default as Logos } from './Logos';
