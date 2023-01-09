import { Container, Button, Heading, Text, Box, Stack, Flex, VStack, Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack, Card, CardHeader, CardBody, CardFooter, SimpleGrid, FormControl, Select } from '@chakra-ui/react'
import { FormLabel } from 'react-bootstrap';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';

const payment = () => {

    const pagoAlert=() =>{
        return Swal.fire({
            title:'Pago enviado',
            text:'Su pago ha sido ingresado con éxito',
            icon:'success',
            button: 'Aceptar'
        })
    }

    return (
                    <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'}>
                        <Sidebar />
                        <VStack bg={"gray.300"} width={'full'} height={'container.lg'}>
                            <Navbar />
                            <Divider orientation='horizontal' my={'10px'} color={'#3C4048'} />
                            <Divider orientation='horizontal' my={'10px'} color={'#3C4048'} />
                        <Flex direction={"column"}>
                            <FormControl>
                                <FormLabel>Forma de pago</FormLabel>
                                <Select placeholder='Seleccione el tipo de pago' >
                                    <option>Transferencia</option>
                                    <option>Efectivo (Presencial)</option>
                                    <option>WebPay</option>
                                </Select>
                            </FormControl>
                            <Stack spacing={4} direction='row' align='center'>
                                <Button colorScheme='teal' title='Pagar' onClick={() => pagoAlert()} >
                                    Ingresar pago
                                </Button>
                            </Stack>
                        </Flex>
                        </VStack>
                    </Container>
        
    );
}

export default payment;