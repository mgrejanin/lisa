const Teaser = ({ title, children }) => {
    return (
        <apollo-box border-radius="medium" box-shadow="medium" border-color="grayscale.100" border="light" p="3">
            <apollo-stack direction="column">
                <apollo-heading>{title}</apollo-heading>
                <apollo-text>{children}</apollo-text>
            </apollo-stack>
        </apollo-box>
    );
};

/**
 * @component
 */
export default Teaser;
