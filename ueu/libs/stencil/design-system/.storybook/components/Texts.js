import { Token } from '../../../../packages/sass-functions/src/lib/tokens';

const Texts = () => {
    const fontSize = Object.entries(Token.fontSize);
    const lineHeight = Object.values(Token.lineHeight);

    return (
        <apollo-box p="3" border-radius="medium" box-shadow="medium" border-color="grayscale.100" border="light">
            <apollo-stack direction="column">
                {fontSize.map((item, index) => (
                    <apollo-box key={index.toString()} mb="2">
                        <apollo-stack alignItems="center" spacing="2">
                            <apollo-text font-size={item[0]}>Apollo Design System</apollo-text>
                            <apollo-text>{item[0]}</apollo-text>
                            <apollo-text font-size="xs" color="grayscale.400">
                                {item[1]}, {lineHeight[index]}
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
export default Texts;
