const Grid = ({ children }) => {
    return (
        <apollo-box mt="4" mb="4">
            <apollo-simple-grid columns="2" spacing="3">
                {children}
            </apollo-simple-grid>
        </apollo-box>
    );
};

/**
 * @component
 */
export default Grid;
