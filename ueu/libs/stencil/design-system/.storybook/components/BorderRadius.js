import { Token } from '../../../../packages/sass-functions/src/lib/tokens';

const BorderRadius = () => {
    const borderRadius = Object.entries(Token.borderRadius);

    return (
        <apollo-box p="3" border-radius="medium" box-shadow="medium" border-color="grayscale.100" border="light">
            <apollo-stack direction="column">
                {borderRadius.map((item, index) => (
                    <apollo-box key={index.toString()} mb="2">
                        <apollo-stack alignItems="center" spacing="2">
                            <apollo-box bg="primary.500" width="100px" height="48px" border-radius={item[0]}></apollo-box>
                            <apollo-text>{item[0]}</apollo-text>
                            <apollo-text font-size="xs" color="grayscale.400">
                                {item[1]}
                            </apollo-text>
                        </apollo-stack>
                    </apollo-box>
                ))}
            </apollo-stack>
        </apollo-box>
    );
};

/**
 * @component
 */
export default BorderRadius;
