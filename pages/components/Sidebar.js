
import { Container, Button, Heading, Text, Box, Stack, Flex, VStack, Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {faChartColumn, faFileInvoiceDollar, faHomeUser, faUser} from '@fortawesome/free-solid-svg-icons'


// COMIENZO ESTRUCTURA DEL SIDEBAR

const Sidebar = () => {
    return (
            <VStack width={'60'} bg={'#111B54'} >
            <Divider orientation='horizontal' my={'2'} />
            <Avatar size={'xl'}>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <Heading size={'md'} color={'#ffffff'}>"Nombre del vecino"</Heading>

            <Divider orientation='horizontal' my={'6'} />
            <Divider orientation='horizontal' my={'6'} />
            <nav>
                <ul type='disc' style={{fontFamily:"sans-serif", color:'#ffffff'}}  >
                    <li><Link color={'#ffffff'}><FontAwesomeIcon icon={faHomeUser}  /> Home</Link></li>
                    <li ><Link color={'#ffffff'} ><FontAwesomeIcon icon={faChartColumn} /> Registro histórico</Link></li>
                    <li ><Link color={'#ffffff'} ><FontAwesomeIcon icon={faFileInvoiceDollar} /> Pagar</Link></li>
                    <li > <Link color={'#ffffff'}> <FontAwesomeIcon icon={faUser} /> Perfil </Link></li>

                </ul>
            </nav>
        </VStack>
        

        

    )
}

export default Sidebar