import React from 'react'
import { useState } from 'react'
import Swal from "sweetalert2"
import {Container,Button, Heading, Text, Flex, VStack,Avatar, AvatarBadge, Divider, Link, HStack, Table,
Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, TableCaption} from '@chakra-ui/react'
import { getGastos } from "../../../data/gastos"
import { useRouter } from "next/router"

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


const cuentasPagadas = ({data}) =>{
  const router = useRouter()
  const [gastos] = useState(data)
  console.log(gastos)
  
  const showGastos = ()=>{
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

      if(gasto.estado==="pagado"){
        return (
          <Tr key={gasto._id} >
              <Td>{gasto.vecino.nombre}</Td>
              <Td>{fechaEmision}</Td>
              <Td>{fechaLimite}</Td>
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
        <Button onClick={volver}>volver</Button>
        <Heading fontSize='2xl'>Deudas Pagadas</Heading>
        <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
        <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
        <Flex direction={"column"}>
        <TableContainer>
  <Table variant='simple' size={'md'}>
    <Thead>
      <Tr bg={'teal'} >
        <Th color={'#EAEAEA'} >Vecino</Th>
        <Th color={'#EAEAEA'}>Fecha Emision</Th>
        <Th color={'#EAEAEA'}>Fecha Limite</Th>
        <Th color={'#EAEAEA'}>Agua</Th>
        <Th color={'#EAEAEA'}>Luz</Th>
        <Th color={'#EAEAEA'} isNumeric>Gas</Th>
        <Th color={'#EAEAEA'} >Mantenimiento</Th>
        <Th color={'#EAEAEA'} >Sueldo del Personal</Th>
        
      </Tr>
    </Thead>
    <Tbody color={'#3C4048'} bg={'#EAEAEA'} >
      {showGastos()}
    </Tbody>
  </Table>
</TableContainer>
        </Flex>
    </VStack>     
</Container>
  )
}

export default cuentasPagadas
