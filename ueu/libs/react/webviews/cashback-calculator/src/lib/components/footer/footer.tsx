import React from 'react';
import { Box, Button, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
    return (
        <Box
            w="100%"
            h="70px"
            bg="green.500"
            position="fixed"
            bottom="0"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Link
                href="https://picpay.com/site/download?shortlink=f8a1a424&pid=onelink_iza-masthead&c=lp_iza-masthead"
                isExternal
                _active={{ textDecoration: 'none' }}
                _hover={{ textDecoration: 'none' }}
            >
                <Button
                    bg="blue.500"
                    _active={{ backgroundColor: 'blue.700' }}
                    _hover={{ backgroundColor: 'blue.700' }}
                    color="white"
                    fontSize="xl"
                    minW="280px"
                    borderRadius="3xl"
                    p="3"
                >
                    Pagar boleto
                </Button>
            </Link>
        </Box>
    );
};

export default Footer;
