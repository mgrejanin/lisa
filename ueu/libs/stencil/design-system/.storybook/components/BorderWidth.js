import { Token } from '../../../../packages/sass-functions/src/lib/tokens';

const BorderWidth = () => {
    const borderWidth = Object.entries(Token.borderWidth);

    return (
        <apollo-box p="3" border-radius="medium" box-shadow="medium" border-color="grayscale.100" border="light">
            <apollo-stack direction="column">
                {borderWidth.map((item, index) => (
                    <apollo-box key={index.toString()} mb="2">
                        <apollo-stack alignItems="center" spacing="2">
                            <apollo-box
                                bg="primary.500"
                                width="48px"
                                height="48px"
                                border={item[0]}
                                border-color="primary.900"
                            ></apollo-box>
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
export default BorderWidth;
