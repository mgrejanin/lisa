import { Apollo } from '../../../../packages/sass-functions/src/lib/helpers/design-system';
import { Token } from '../../../../packages/sass-functions/src/lib/tokens';
import { TokenType } from '../../../../packages/sass-functions/src/lib/interfaces/token.model';

const colors = Object.entries(Token.colors).map(color => {
    if (color[1].dark) {
        delete color[1].dark['on-background'];
    }
    return color;
});

const blackAndWhite = ['white', 'black'];

const notAllowedColors = ['random', 'background', 'white', 'black'];

const colorNumbers = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const colorAliases = ['lightest', 'light', 'base', 'dark', 'darkest'];
const backgroundAliases = ['base', 'primary', 'secondary', 'tertiary', 'quaternary'];

const Colors = () => {
    const getColor = color => {
        const regex = /var\(--apollo.+, ?(.+)\)/;

        let token = Apollo.getToken(color, TokenType.COLOR);
        if (token && token.base && regex.test(token.base)) {
            token = token.base.match(regex)[1];
        }

        if (token && token.base && !regex.test(token.base)) {
            return `${token.base}`;
        }

        if (regex.test(token)) {
            token = token.match(regex)[1];
        }

        return `${token}`;
    };

    return (
        <apollo-box>
            <apollo-flex direction="column">
                {colors.map((item, index) => (
                    <apollo-box key={index.toString()}>
                        <apollo-box mb="2">
                            <apollo-heading size="sm">
                                {item[0]}
                            </apollo-heading>
                        </apollo-box>

                        {!notAllowedColors.includes(item[0]) && (
                            <apollo-box mb="6">
                                <apollo-simple-grid columns="7" spacing="2">
                                    {Object.keys(item[1]).map((color, i) => {
                                        return colorNumbers.includes(color) && (
                                            <apollo-box
                                                key={i.toString()}
                                                bg={
                                                    `${item[0]}.${color}.base`
                                                }
                                                border-radius="strong"
                                                box-shadow="medium"
                                                border-color="grayscale.50"
                                                border="light"
                                            >
                                                <apollo-stack direction="column">
                                                    <apollo-box height="100px"></apollo-box>
                                                    <apollo-box
                                                        bg="white"
                                                        p="2"
                                                        border-color="grayscale.50"
                                                        border-top="light"
                                                        border-top-radius="light"
                                                        border-bottom-radius="14px"
                                                    >
                                                        <apollo-stack direction="column" spacing="1">
                                                            <apollo-text font-size="xs" font-weight="bold">
                                                                {color}
                                                            </apollo-text>
                                                            <apollo-text is-truncked color="grayscale.300">
                                                                {getColor(`${item[0]}.${color}`)}
                                                            </apollo-text>{' '}
                                                        </apollo-stack>
                                                    </apollo-box>
                                                </apollo-stack>
                                            </apollo-box>
                                        )
                                    })}
                                </apollo-simple-grid>
                            </apollo-box>
                        )}

                        {!notAllowedColors.includes(item[0]) && (
                            <apollo-box mb="6">
                                <apollo-simple-grid columns="7" spacing="2">
                                    {colorAliases.map( alias => {
                                        const color = Object.keys(item[1]).find( tokenAlias => {
                                            return tokenAlias === alias;
                                        });

                                        return (
                                            <apollo-box
                                                key={alias.toString()}
                                                bg={
                                                    color.includes('base')
                                                    ? `${item[0]}.${color}`
                                                    : `${item[0]}.${color}.base`
                                                }
                                                border-radius="strong"
                                                box-shadow="medium"
                                                border-color="grayscale.50"
                                                border="light"
                                            >
                                                <apollo-stack direction="column">
                                                    <apollo-box height="100px"></apollo-box>
                                                    <apollo-box
                                                        bg="white"
                                                        p="2"
                                                        border-color="grayscale.50"
                                                        border-top="light"
                                                        border-top-radius="light"
                                                        border-bottom-radius="14px"
                                                    >
                                                        <apollo-stack direction="column" spacing="1">
                                                            <apollo-text font-size="xs" font-weight="bold">
                                                                {color}
                                                            </apollo-text>
                                                            <apollo-text is-truncked color="grayscale.300">
                                                                {getColor(`${item[0]}.${color}`)}
                                                            </apollo-text>{' '}
                                                        </apollo-stack>
                                                    </apollo-box>
                                                </apollo-stack>
                                            </apollo-box>
                                        );
                                    })}
                                </apollo-simple-grid>
                            </apollo-box>
                        )}

                        {'background'.includes(item[0]) && (
                            <apollo-box mb="6">
                                <apollo-simple-grid columns="7" spacing="2">
                                    { backgroundAliases.map( alias => {
                                        const color = Object.keys(item[1]).find( tokenAlias => {
                                            return tokenAlias === alias;
                                        });

                                        return (
                                            <apollo-box
                                                key={alias.toString()}
                                                bg={
                                                    color.includes('base') ||
                                                    item[0].includes('background')
                                                    ? `${item[0]}.${color}`
                                                    : `${item[0]}.${color}.base`
                                                }
                                                border-radius="strong"
                                                box-shadow="medium"
                                                border-color="grayscale.50"
                                                border="light"
                                            >
                                                <apollo-stack direction="column">
                                                    <apollo-box height="100px"></apollo-box>
                                                    <apollo-box
                                                        bg="white"
                                                        p="2"
                                                        border-color="grayscale.50"
                                                        border-top="light"
                                                        border-top-radius="light"
                                                        border-bottom-radius="14px"
                                                    >
                                                        <apollo-stack direction="column" spacing="1">
                                                            <apollo-text font-size="xs" font-weight="bold">
                                                                {color}
                                                            </apollo-text>
                                                            <apollo-text is-truncked color="grayscale.300">
                                                                {getColor(`${item[0]}.${color}`)}
                                                            </apollo-text>{' '}
                                                        </apollo-stack>
                                                    </apollo-box>
                                                </apollo-stack>
                                            </apollo-box>
                                        );
                                    })}
                                </apollo-simple-grid>
                            </apollo-box>
                        )}

                        {'random'.includes(item[0]) && (
                            <apollo-box mb="6">
                                <apollo-simple-grid columns="7" spacing="2">
                                    {Object.keys(item[1]).map((color, i) => {
                                        return /[0-9]/g.test(color) && (
                                            <apollo-box
                                                key={i.toString()}
                                                bg={
                                                    color.includes('base')
                                                        ? `${item[0]}.${color}`
                                                        : `${item[0]}.${color}.base`
                                                }
                                                border-radius="strong"
                                                box-shadow="medium"
                                                border-color="grayscale.50"
                                                border="light"
                                            >
                                                <apollo-stack direction="column">
                                                    <apollo-box height="100px"></apollo-box>
                                                    <apollo-box
                                                        bg="white"
                                                        p="2"
                                                        border-color="grayscale.50"
                                                        border-top="light"
                                                        border-top-radius="light"
                                                        border-bottom-radius="14px"
                                                    >
                                                        <apollo-stack direction="column" spacing="1">
                                                            <apollo-text font-size="xs" font-weight="bold">
                                                                {color}
                                                            </apollo-text>
                                                            <apollo-text is-truncked color="grayscale.300">
                                                                {getColor(`${item[0]}.${color}`)}
                                                            </apollo-text>
                                                        </apollo-stack>
                                                    </apollo-box>
                                                </apollo-stack>
                                            </apollo-box>
                                        )
                                    })}
                                </apollo-simple-grid>
                            </apollo-box>
                        )}

                        {blackAndWhite.includes(item[0]) && (
                            <apollo-box mb="6">
                                <apollo-simple-grid columns="7" spacing="2">
                                    {Object.keys(item[1]).map((color, i) => (
                                        <apollo-box
                                            key={i.toString()}
                                            bg={
                                                color.includes('base')
                                                    ? `${item[0]}.${color}`
                                                    : `${item[0]}.${color}.base`
                                            }
                                            border-radius="strong"
                                            box-shadow="medium"
                                            border-color="grayscale.50"
                                            border="light"
                                        >
                                            <apollo-stack direction="column">
                                                <apollo-box height="100px"></apollo-box>
                                                <apollo-box
                                                    bg="white"
                                                    p="2"
                                                    border-color="grayscale.50"
                                                    border-top="light"
                                                    border-top-radius="light"
                                                    border-bottom-radius="14px"
                                                >
                                                    <apollo-stack direction="column" spacing="1">
                                                        <apollo-text font-size="xs" font-weight="bold">
                                                            {color}
                                                        </apollo-text>
                                                        <apollo-text is-truncked color="grayscale.300">
                                                            {getColor(`${item[0]}.${color}`)}
                                                        </apollo-text>
                                                    </apollo-stack>
                                                </apollo-box>
                                            </apollo-stack>
                                        </apollo-box>
                                    ))}
                                </apollo-simple-grid>
                            </apollo-box>
                        )}
                    </apollo-box>
                ))}
            </apollo-flex>
        </apollo-box>
    );
};

/**
 * @component
 */
export default Colors;
