import React from 'react';
import { Box } from '@chakra-ui/react';

const Banner: React.FC = () => {
    return (
        <Box
            w="100%"
            h={['47vw', 300, '46vw']}
            display="flex"
            fontSize="20px"
            justifyContent="center"
            alignItems="center"
            bgImage={`url(/assets/webviews/images/banner.png)`}
            bgSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
        ></Box>
    );
};

export default Banner;
