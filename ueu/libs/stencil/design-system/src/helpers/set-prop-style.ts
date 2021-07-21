import { css, cx } from '@emotion/css';

import { Apollo } from './../../../../packages/sass-functions/src/lib/helpers/design-system';
import { TokenType } from './../../../../packages/sass-functions/src/lib/interfaces/token.model';

const breakpoints = {};
Object.entries(Apollo.get('breakpoints')).forEach(([i, v]) => {
    breakpoints[i] = `@media screen and (min-width: ${v})`;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylesMediaQueries = (prop: any, property: string | Array<string>, type: TokenType) => {
    try {
        const styles = {};
        if (typeof prop === 'object') {
            const media = Object.keys(prop).filter({}.hasOwnProperty.bind(breakpoints));

            if (typeof property === 'object') {
                media.forEach((mq: string, i: number | string) => {
                    property.forEach(p => {
                        styles[breakpoints[mq]] = {
                            [p]: Apollo.getToken(prop[media[i]], type),
                        };
                    });
                });
            } else {
                media.forEach((mq: string, i: number | string) => {
                    styles[breakpoints[mq]] = {
                        [property]: Apollo.getToken(prop[media[i]], type),
                    };
                });
            }
        } else {
            if (typeof property === 'object') {
                property.forEach(p => {
                    styles[p] = Apollo.getToken(prop, type);
                });
            } else {
                styles[property] = Apollo.getToken(prop, type);
            }
        }

        return styles;
    } catch (e) {
        console.warn(`Não foi possível criar media queries da propriedade [${property}] do componente apollo-box`);
        console.error(e);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setPropStyle = (props: any) => {
    const responsiveStyle = css`
        ${stylesMediaQueries(props.p, 'padding', TokenType.SPACE)};
        ${stylesMediaQueries(props.pt, 'paddingTop', TokenType.SPACE)};
        ${stylesMediaQueries(props.pr, 'paddingRight', TokenType.SPACE)};
        ${stylesMediaQueries(props.pb, 'paddingBottom', TokenType.SPACE)};
        ${stylesMediaQueries(props.pl, 'paddingLeft', TokenType.SPACE)};
        ${stylesMediaQueries(props.padding, 'padding', TokenType.SPACE)};
        ${stylesMediaQueries(props.paddingTop, 'paddingTop', TokenType.SPACE)};
        ${stylesMediaQueries(props.paddingRight, 'paddingRight', TokenType.SPACE)};
        ${stylesMediaQueries(props.paddingBottom, 'paddingBottom', TokenType.SPACE)};
        ${stylesMediaQueries(props.paddingLeft, 'paddingLeft', TokenType.SPACE)};
        ${stylesMediaQueries(props.m, 'margin', TokenType.SPACE)};
        ${stylesMediaQueries(props.mt, 'marginTop', TokenType.SPACE)};
        ${stylesMediaQueries(props.mr, 'marginRight', TokenType.SPACE)};
        ${stylesMediaQueries(props.mb, 'marginBottom', TokenType.SPACE)};
        ${stylesMediaQueries(props.ml, 'marginLeft', TokenType.SPACE)};
        ${stylesMediaQueries(props.margin, 'margin', TokenType.SPACE)};
        ${stylesMediaQueries(props.marginTop, 'marginTop', TokenType.SPACE)};
        ${stylesMediaQueries(props.marginRight, 'marginRight', TokenType.SPACE)};
        ${stylesMediaQueries(props.marginBottom, 'marginBottom', TokenType.SPACE)};
        ${stylesMediaQueries(props.marginLeft, 'marginLeft', TokenType.SPACE)};

        ${stylesMediaQueries(props.bg, 'backgroundColor', TokenType.COLOR)};
        ${stylesMediaQueries(props.backgroundColor, 'backgroundColor', TokenType.COLOR)};
        ${stylesMediaQueries(props.color, 'color', TokenType.COLOR)};
        ${stylesMediaQueries(props.borderColor, 'borderColor', TokenType.COLOR)};
        ${stylesMediaQueries(props.borderTopColor, 'borderTopColor', TokenType.COLOR)};
        ${stylesMediaQueries(props.borderRightColor, 'borderRightColor', TokenType.COLOR)};
        ${stylesMediaQueries(props.borderBottomColor, 'borderBottomColor', TokenType.COLOR)};
        ${stylesMediaQueries(props.borderLeftColor, 'borderLeftColor', TokenType.COLOR)};

        ${stylesMediaQueries(props.fontSize, 'fontSize', TokenType.FONT_SIZE)};
        ${stylesMediaQueries(props.lineHeight, 'lineHeight', TokenType.LINE_HEIGHT)};
        ${stylesMediaQueries(props.fontWeight, 'fontWeight', TokenType.FONT_WEIGHT)};
        ${stylesMediaQueries(props.textAlign, 'textAlign', null)};

        ${stylesMediaQueries(props.border, 'borderWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderWidth, 'borderWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderTop, 'borderTopWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderTopWidth, 'borderTopWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderRight, 'borderRightWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderRightWidth, 'borderRightWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderBottom, 'borderBottomWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderBottomWidth, 'borderBottomWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderLeft, 'borderLeftWidth', TokenType.BORDER_WIDTH)};
        ${stylesMediaQueries(props.borderLeftWidth, 'borderLeftWidth', TokenType.BORDER_WIDTH)};

        ${stylesMediaQueries(props.borderRadius, 'borderRadius', TokenType.BORDER_RADIUS)};
        ${stylesMediaQueries(props.borderTopLeftRadius, 'borderTopLeftRadius', TokenType.BORDER_RADIUS)};
        ${stylesMediaQueries(props.borderTopRightRadius, 'borderTopRightRadius', TokenType.BORDER_RADIUS)};
        ${stylesMediaQueries(props.borderBottomRightRadius, 'borderBottomRightRadius', TokenType.BORDER_RADIUS)};
        ${stylesMediaQueries(props.borderBottomLeftRadius, 'borderBottomLeftRadius', TokenType.BORDER_RADIUS)};
        ${stylesMediaQueries(
            props.borderTopRadius,
            ['borderTopLeftRadius', 'borderTopRightRadius'],
            TokenType.BORDER_RADIUS,
        )};
        ${stylesMediaQueries(
            props.borderRightRadius,
            ['borderTopRightRadius', 'borderBottomRightRadius'],
            TokenType.BORDER_RADIUS,
        )};
        ${stylesMediaQueries(
            props.borderBottomRadius,
            ['borderBottomRightRadius', 'borderBottomLeftRadius'],
            TokenType.BORDER_RADIUS,
        )};
        ${stylesMediaQueries(
            props.borderLeftRadius,
            ['borderTopLeftRadius', 'borderBottomLeftRadius'],
            TokenType.BORDER_RADIUS,
        )};

        ${stylesMediaQueries(props.boxShadow, 'boxShadow', TokenType.BOX_SHADOW)};
        ${stylesMediaQueries(props.opacity, 'opacity', TokenType.OPACITY)};

        ${stylesMediaQueries(props.width, 'width', null)};
        ${stylesMediaQueries(props.maxW, 'maxWidth', TokenType.SIZE)};
        ${stylesMediaQueries(props.minW, 'minWidth', TokenType.SIZE)};

        ${stylesMediaQueries(props.height, 'height', null)};
        ${stylesMediaQueries(props.maxH, 'maxHeight', TokenType.SIZE)};
        ${stylesMediaQueries(props.minH, 'minHeight', TokenType.SIZE)};

        ${stylesMediaQueries(props.wrap, 'flexWrap', null)};
        ${stylesMediaQueries(props.grow, 'flexGrow', null)};
        ${stylesMediaQueries(props.shrink, 'flexShrink', null)};

        ${stylesMediaQueries(props.gap, 'gridGap', TokenType.SPACE)};
        ${stylesMediaQueries(props.grow, 'flexGrow', null)};

        ${stylesMediaQueries(props.display, 'display', null)};
    `;

    const baseStyle = css([
        {
            gridRowStart: props.rowStart,
            gridRowEnd: props.rowEnd,
            gridColumnStart: props.colStart,
            gridColumnEnd: props.colEnd,
        },
        props.fontSize && {
            lineHeight: `${Apollo.get('type.lineHeight')[props.fontSize]}`,
        },
        (props.border || props.borderWidth) && {
            borderStyle: 'solid',
        },
        (props.borderTop || props.borderTopWidth) && {
            borderTopStyle: 'solid',
        },
        (props.borderRight || props.borderRightWidth) && {
            borderRightStyle: 'solid',
        },
        (props.borderBottom || props.borderBottomWidth) && {
            borderBottomStyle: 'solid',
        },
        (props.borderLeft || props.borderLeftWidth) && {
            borderLeftStyle: 'solid',
        },
        props.borderLeft ||
            (props.borderLeftWidth && {
                borderLeftStyle: 'solid',
            }),
        props.borderX && {
            borderLeftWidth: `${Apollo.get('borderWidth')[props.borderX]}`,
            borderRightWidth: `${Apollo.get('borderWidth')[props.borderX]}`,
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
        },
        props.borderY && {
            borderTopWidth: `${Apollo.get('borderWidth')[props.borderY]}`,
            borderBottomWidth: `${Apollo.get('borderWidth')[props.borderY]}`,
            borderTopStyle: 'solid',
            borderBottomStyle: 'solid',
        },
        props.centerContent && {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        props.spacing &&
            !props.columns &&
            !props.minChildWidth && {
                margin: `calc(${Apollo.getToken(props.spacing, TokenType.SPACE)} / 2 * -1)`,
                '& > :not(style)': {
                    margin: `calc(${Apollo.getToken(props.spacing, TokenType.SPACE)} / 2)`,
                },
            },
        props.align && {
            alignItems: props.align,
        },
        props.alignItems && {
            alignItems: props.alignItems,
        },
        props.justify && {
            justifyContent: props.justify,
        },
        props.direction && {
            flexFlow: `${props.direction} wrap`,
        },
        props.spacer && {
            justifyContent: 'space-between',
        },
        props.reverse && {
            flexDirection: `${props.reverse}-reverse`,
        },
        props.columns && {
            gridTemplateColumns: `repeat(${props.columns}, minmax(0, 1fr))`,
            gridGap: `${Apollo.getToken(props.spacing, TokenType.SPACE)}`,
        },
        props.minChildWidth && {
            gridTemplateColumns: `repeat(auto-fit, minmax(${props.minChildWidth}, 1fr))`,
            gridGap: `${Apollo.getToken(props.spacing, TokenType.SPACE)}`,
        },
        props.isTruncated && {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        props.noOfLines && {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: props.noOfLines,
        },
        props.templateColumns && {
            gridTemplateColumns: props.templateColumns,
        },
        props.templateRows && {
            gridTemplateRows: props.templateRows,
        },
        props.rowSpan && {
            gridRowStart: `span ${props.rowSpan}`,
            gridRowEnd: `span ${props.rowSpan}`,
        },
        props.colSpan && {
            gridColumnStart: `span ${props.colSpan}`,
            gridColumnEnd: `span ${props.colSpan}`,
        },
        props.overlay && {
            '&:hover': {
                textDecoration: 'none',
            },
        },
        props.wrap && {
            flexWrap: 'wrap',
        },
        props.hoverColor && {
            '&:hover': {
                color: Apollo.getToken(props.hoverColor, TokenType.COLOR),
            },
        },
    ]);

    return cx(baseStyle, responsiveStyle);
};
