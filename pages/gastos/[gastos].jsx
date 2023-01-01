import {Container, Text, Button, Heading,Table, Td,Thead,Tbody ,Tr, Flex} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import {getGastosVecino} from "../../data/gastos"
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

    const showGastos = () => {
        return gastos.map(gasto => {
            return (
                <Tr key={gasto._id}>
                    <Td>{gasto.estado}</Td>
                    <Td>{gasto.agua}</Td>
                    <Td>{gasto.luz}</Td>
                    <Td>{gasto.gas}</Td>
                    <Td>{gasto.mantenimiento}</Td>
                    <Td>{gasto.sueldo}</Td>
                    <Td>{gasto.fecha}</Td>
                </Tr>
            )
        })
    }
    
    return (
        
            <Container display={'flex'} flexDirection={'column'} my={'60px'}>
            <Heading width={'620px'} fontSize='xl'>Bienvenid@ {user.nombre} su lista de gastos comunes es:</Heading>
            <Table my={10} variant='simple' colorScheme='teal' backgroundColor={'#BAD1C2'}>
                <Thead>
                    <Tr>
                        <Td>Estado de Deuda</Td>
                        <Td>Agua</Td>
                        <Td>Luz</Td>
                        <Td>Gas</Td>
                        <Td>Mantenimiento</Td>
                        <Td>Sueldo del Personal</Td>
                        <Td>Fecha</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {showGastos()}
                </Tbody>
            </Table>
            
            <Button my={10} backgroundColor={"#153462"} color={"#F6F6C9"} onClick={cerrar}>Cerrar session</Button>
        </Container>
    
        
    )
}

export default gastos