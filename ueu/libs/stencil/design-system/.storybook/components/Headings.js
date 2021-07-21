import { Apollo } from '../../../../packages/sass-functions/src/lib/helpers/design-system';
import { TokenType } from '../../../../packages/sass-functions/src/lib/interfaces/token.model';

const Headings = () => {
    const getFontSize = size => {
        let token = Apollo.getToken(size, TokenType.FONT_SIZE);

        return `${token}`;
    };

    return (
        <apollo-box p="3" border-radius="medium" box-shadow="medium" border-color="grayscale.100" border="light">
            <apollo-stack direction="column">
                <apollo-box mb="2">
                    <apollo-stack alignItems="center" spacing="2">
                        <apollo-heading size="sm">Apollo Design system</apollo-heading>
                        <apollo-text>sm</apollo-text>
                        <apollo-text font-size="xs" color="grayscale.400">
                            {getFontSize('xl')}
                        </apollo-text>
                    </apollo-stack>
                </apollo-box>
                <apollo-box mb="2">
                    <apollo-stack alignItems="center" spacing="2">
                        <apollo-heading>Apollo Design system</apollo-heading>
                        <apollo-text>md</apollo-text>
                        <apollo-text font-size="xs" color="grayscale.400">
                            {getFontSize('4xl')}
                        </apollo-text>
                    </apollo-stack>
                </apollo-box>
                <apollo-box mb="2">
                    <apollo-stack alignItems="center" spacing="2">
                        <apollo-heading size="lg">Apollo Design system</apollo-heading>
                        <apollo-text>lg</apollo-text>
                        <apollo-text font-size="xs" color="grayscale.400">
                            {getFontSize('6xl')}
                        </apollo-text>
                    </apollo-stack>
                </apollo-box>
            </apollo-stack>
        </apollo-box>
    );
};

/**
 * @component
 */
export default Headings;
