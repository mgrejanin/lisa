const list = [
    { nickname: 'H', content: 'herodash' },
    { nickname: 'Gd', content: 'growthdash' },
    { nickname: 'Ht', content: 'houston' },
    { nickname: 'Fd', content: 'financedash' },
    { nickname: 'A', content: 'Apollodash' },
    { nickname: 'P', content: 'PicPedia' },
];

const Logos = () => {
    return (
        <apollo-box mt="4">
            <apollo-flex direction="column">
                {list.map((logo, i) => (
                    <apollo-simple-grid columns="3">
                        <apollo-box
                            margin-right="2"
                            margin-bottom="2"
                            padding="2"
                            box-shadow="medium"
                            border-radius="light"
                        >
                            <apollo-logo nickname={logo.nickname}>{logo.content}</apollo-logo>
                        </apollo-box>
                        <apollo-box
                            margin-right="2"
                            margin-bottom="2"
                            padding="2"
                            box-shadow="medium"
                            border-radius="light"
                        >
                            <apollo-logo>{logo.content}</apollo-logo>
                        </apollo-box>
                        <apollo-box
                            margin-right="2"
                            margin-bottom="2"
                            padding="2"
                            box-shadow="medium"
                            border-radius="light"
                        >
                            <apollo-logo nickname={logo.nickname}></apollo-logo>
                        </apollo-box>
                    </apollo-simple-grid>
                ))}
            </apollo-flex>
        </apollo-box>
    );
};

/**
 * @component
 */
export default Logos;
