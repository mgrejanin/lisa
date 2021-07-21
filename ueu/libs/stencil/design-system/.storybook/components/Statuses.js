const variants = {
    stable: { variant: 'brand', label: 'Estável' },
    deprecated: { variant: 'critical.900', label: 'Descontinuado' },
    inReview: { variant: 'warning', label: 'Em revisão' },
    experimental: { variant: 'warning', label: 'Experimental' },
    inDevelopment: { variant: 'warning', label: 'Em desenvolvimento' },
};

const Status = ({ variant: status = 'stable' }) => {
    const { label } = variants[status];

    return (
        <apollo-flex>
            <apollo-box bg={variants[status].variant} p="half" pl="2" pr="2" border-radius="pill" font-weight="bold">
                <apollo-text font-size="xs" color="white">
                    {label}
                </apollo-text>
            </apollo-box>
        </apollo-flex>
    );
};

/**
 * @component
 */
export default Status;
