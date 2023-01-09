import {Container,Button, Heading, Text, Flex, VStack,Avatar, AvatarBadge, Divider, Link, HStack, Table,
    Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, TableCaption} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import {getGastosVecino, getGastos} from "../../data/gastos"
import {getUser} from "../../data/user"
import Cookies from 'js-cookie'
import axios from "axios"

export async function getServerSideProps(context) {
    try {
        const response = await getGastosVecino(context.query.gastos, context.req.headers.cookie)
        const response2 = await getUser(context.query.gastos, context.req.headers.cookie)
        console.log("fdsadsf1")
        console.log(response2.data)
        console.log("fdsadsf2")
        return {
            props: {
                data: response.data,
                data2: response2.data
            }
        }
    } catch (err) {
        console.log(err)
        return {
			props: {}
		}
    }
}







const gastos = ({data,data2})=>{
    const router = useRouter()
    const [gastos] = useState(data)
    const [user] = useState(data2)
    console.log(user)
    const cerrar = async () => {
        await axios.get(`${process.env.servidor}/logout`)
        Cookies.remove("token")
        router.push("/")
    }
    
    const showGastos = ()=>{
        let sumagua= 0
        return gastos.map(gasto => {
          // fecha emision
          let nuevafechaEmision = new Date(gasto.fechaEmision)
          let dayE = nuevafechaEmision.getDate()
          let mesE = nuevafechaEmision.getMonth()
          let yearE = nuevafechaEmision.getFullYear()
          let fechaEmision = ''+dayE+'/'+mesE+'/'+yearE
          // fecha limite
          let nuevafechaLimite = new Date(gasto.fechaLimite)
          let day = nuevafechaLimite.getDate()
          let mes = nuevafechaLimite.getMonth()
          let year = nuevafechaLimite.getFullYear()
          let fechaLimite = ''+day+'/'+mes+'/'+year
            return (
              <Tr key={gasto._id} >
                  <Td>{gasto.estado}</Td>
                  <Td>{fechaEmision}</Td>
                  <Td>{fechaLimite}</Td>
                  <Td>{gasto.agua}</Td>
                  <Td>{gasto.luz}</Td>
                  <Td>{gasto.gas}</Td>
                  <Td>{gasto.mantenimiento}</Td>
                  <Td>{gasto.sueldo}</Td>
                  
              </Tr>
          ) 
      })
      }
      
    return (
        
            <Container display={'flex'} flexDirection={'column'} my={'60px'}>
            <Heading width={'620px'} fontSize='xl'>Bienvenid@  su lista de gastos comunes es:</Heading>
            <VStack bg={"gray.300"} width={'full'} height={'container.lg'}>
            
            <Heading fontSize='2xl'>Deudas Pagadas</Heading>
            <Flex direction={"column"}>
            <TableContainer>
            <Heading fontSize='2xl'>Deudas Pagadas</Heading>
            <Table my={10} variant='simple' colorScheme='teal' backgroundColor={'#BAD1C2'}>
                <Thead>
                    <Tr>
                        <Td>Estado de Deuda</Td>
                        <Td>Agua</Td>
                        <Td>Luz</Td>
                        <Td>Gas</Td>
                        <Td>Mantenimiento</Td>
                        <Td>Sueldo del Personal</Td>
                        <Td>Fecha Emision</Td>
                        <Td>Fecha Limite</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {showGastos()}
                </Tbody>
            </Table>
            </TableContainer>
        </Flex>
    </VStack> 
            <Button my={10} backgroundColor={"#153462"} color={"#F6F6C9"} onClick={cerrar}>Cerrar session</Button>
        </Container>
    
        
    )
}

export default gastos