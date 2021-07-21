import { Token } from '../../../../packages/sass-functions/src/lib/tokens';

const BoxShadow = () => {
    const boxShadow = Object.entries(Token.boxShadow);

    return (
        <apollo-box p="3" border-radius="medium" box-shadow="medium" border-color="grayscale.100" border="light">
            <apollo-stack direction="column">
                {boxShadow.map((item, index) => (
                    <apollo-box key={index.toString()} mb="2">
                        <apollo-stack alignItems="center" spacing="2">
                            <apollo-box
                                width="48px"
                                height="48px"
                                box-shadow={item[0]}
                                border="light"
                                border-radius="light"
                                border-color="grayscale.50"
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
export default BoxShadow;
