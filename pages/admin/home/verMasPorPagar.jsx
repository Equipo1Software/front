import React from 'react'
import { useState } from 'react'
import Swal from "sweetalert2"
import { useRouter } from "next/router"
import {Container,Button, Heading, Text, Flex, VStack,Avatar, AvatarBadge, Divider, Link, HStack, Table,
Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, TableCaption} from '@chakra-ui/react'
import { getGastos } from "../../../data/gastos"

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

const porPagar= ({data})=>{
    const router = useRouter()
    const [gastos] = useState(data)
    const showGastos = ()=>{
        return gastos.map(gasto => {
            let fechaE = gastos.fechaEmision.slice(0, -9)
            console.log(fechaEs)
            if(gasto.estado==="por pagar"){
            return (
                <Tr key={gasto._id} >
                    <Td>{gasto.vecino.nombre}</Td>
                    <Td>{fechaE}</Td>
                    <Td>{gasto.agua}</Td>
                    <Td>{gasto.luz}</Td>
                    <Td>{gasto.gas}</Td>
                    <Td>{gasto.mantenimiento}</Td>
                    <Td>{gasto.sueldo}</Td>
                </Tr>
            )
            }
        })
    }

    const volver = ()=>{
        try {
            router.push("./home")
        } catch (error) {
            console.log(error)
            return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Algo salio mal!"
			})
        }
    }

    return (
        <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'}>
        <VStack width={'60'} bg={'#3C4048'} >
            <Divider orientation='horizontal' my={'2'}/>
                <Avatar size={'xl'}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
                <Heading size={'md'} color ={'#EAEAEA'}>Administrador</Heading>
            
            <Divider orientation='horizontal' my={'6'}/>
            <Divider orientation='horizontal' my={'6'}/>
            <nav>
                <ul type='disc'>
                    <li><Link color = {'#EAEAEA'} href='./home'>Home</Link></li>
                    <li ><Link color = {'#EAEAEA'} >Vecinos</Link></li>
                    <li ><Link color = {'#EAEAEA'} >Gastos</Link></li>
                    <li><Link color = {'#EAEAEA'} >Configurar</Link></li>
                    <li><Link color = {'#EAEAEA'} >Perfil Admin</Link></li>
                </ul>
            </nav>
        </VStack>
        <VStack bg={"gray.300"} width={'full'} height={'container.lg'}>
            <Button onClick={volver} >volver</Button>
            <Heading fontSize='2xl'>Deudas Por Pagar</Heading>
            <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
            <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
        <Flex direction={"column"}>
        <TableContainer>
        <Table variant='simple'>
            <TableCaption>Deudas del mes de diciembre</TableCaption>
            <Thead>
            <Tr bg={'teal'} >
                <Th color={'#EAEAEA'} >Vecino</Th>
                <Th color={'#EAEAEA'} >Fecha</Th>
                <Th color={'#EAEAEA'} isNumeric>Agua</Th>
                <Th color={'#EAEAEA'} isNumeric>Luz</Th>
                <Th color={'#EAEAEA'} isNumeric>Gas</Th>
                <Th color={'#EAEAEA'} isNumeric>Mantenimiento</Th>
                <Th color={'#EAEAEA'} isNumeric>Sueldo del Personal</Th>            
            </Tr>
            </Thead>
            <Tbody color={'#3C4048'} bg={'#EAEAEA'}>
                {showGastos()}
            </Tbody>
        </Table>
        </TableContainer>
        </Flex>
        </VStack>     
    </Container>
      )

}

export default porPagar