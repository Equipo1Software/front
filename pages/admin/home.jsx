import {Container,Button, Heading, Text, Box, Stack, Flex, VStack,Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack,Card, CardHeader, CardBody, CardFooter, SimpleGrid} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import { getGastos } from "../../data/gastos"
import Cookies from 'js-cookie'
import axios from "axios"

export async function getServerSideProps(context) {
    try {
        const response = await getGastos()
        return {
            props: {
                data: response.data,
            }
        }
    } catch (err) {
        console.log(err)
        return {
			props: {}
		}
    }
}




const gastos = ({data})=>{
    const router = useRouter()
    const [gastos] = useState(data)

    const cerrar = async () => {
        await axios.get(`${process.env.servidor}/logout`)
        Cookies.remove("token")
        router.push("/")
    }

    const totalPorPagar = () => {
        let cont=0;
        gastos.forEach(gasto => {
            if(gasto.estado==='por pagar') cont++
        });
        return cont
    }
    const totalPagado = ()=>{
        let cont=0;
        gastos.forEach(gasto => {
            if(gasto.estado==='pagado') cont++
        });
        return cont
    }
    const totalVencido = ()=>{
        let cont=0;
        gastos.forEach(gasto => {
            if(gasto.estado==='vencido') cont++
        });
        return cont
    }


    

    return (
        <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'}>
                <VStack width={'60'} bg={'#111B54'} >
                    <Divider orientation='horizontal' my={'2'}/>
                        <Avatar size={'xl'}>
                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                        </Avatar>
                        <Heading size={'md'} color ={'#ffffff'}>Administrador</Heading>
                    
                    <Divider orientation='horizontal' my={'6'}/>
                    <Divider orientation='horizontal' my={'6'}/>
                    <nav>
                        <ul type='disc'>
                            <li><Link color = {'#ffffff'}>Home</Link></li>
                            <li ><Link color = {'#ffffff'} >Vecinos</Link></li>
                            <li ><Link color = {'#ffffff'} >Gastos</Link></li>
                            <li><Link color = {'#ffffff'} >Configurar</Link></li>
                            <li><Link color = {'#ffffff'} >Perfil Admin</Link></li>
                        </ul>
                    </nav>
                </VStack>
                <VStack bg={"gray.200"} width={'full'} height={'container.lg'}>
                    <Button onClick={cerrar} bg={'#111B54'} color ={'#ffffff'} >Cerrar sesión</Button>
                    <Heading fontSize='2xl'>Hola Admin como te va</Heading>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Heading fontSize='xl' textAlign={'center'} py={'10'} color={'#3C4048'} >Resumen Deudas</Heading> 
                    <Flex>
                        <Card boxSize={'xs'} bg={'#EAEAEA'} mx={'5'} height={'max-content'}>
                            <CardHeader>
                            <Heading size='md' color={'green.500'}>Pagado</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{totalPagado()} vecinos en este estado.</Text>
                            </CardBody>
                            <CardFooter>
                                <Button bg={'green.500'} >Ver..</Button>
                            </CardFooter>
                        </Card>
                        <Card boxSize={'xs'} bg={'#EAEAEA'} mx={'5'} height={'max-content'} >
                            <CardHeader>
                                <Heading size='md' color={'yellow.500'} >Por Pagar</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{totalPorPagar()} gastos en este estado.</Text>
                            </CardBody>
                            <CardFooter>
                                <Button bg={'yellow.500'} >Ver..</Button>
                            </CardFooter>
                        </Card>
                        <Card boxSize={'xs'} bg={'#EAEAEA'} mx={'5'} height={'max-content'} >
                            <CardHeader>
                                <Heading size='md'color={'red.500'} > Cuenta vencida</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{totalVencido()} vecinos en este estado.</Text>
                            </CardBody>
                            <CardFooter>
                                <Button bg={'red.500'}>Ver..</Button>
                            </CardFooter>
                        </Card>
                    </Flex>
                </VStack>     
        </Container>
        
    )
}

export default gastos