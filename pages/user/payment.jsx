import { Container, Button, Heading, Text, Box, Stack, Flex, VStack, Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const payment = () => {
    return (
        <div className="payment">
            
            <div className="flex">
                <div className="content">

                    <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'}>
                        <Sidebar />
                        <VStack bg={"gray.200"} width={'full'} height={'container.lg'}>
                            <Navbar />
                        </VStack>
                    </Container>



                </div>
            </div>
        </div>
    );
}

export default payment;