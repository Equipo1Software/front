import {Container, Text, Button, Heading} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import { getGastos } from "../../data/gastos"
import Cookies from 'js-cookie'
import axios from "axios"

const gastos = ({data})=>{
    const [gastos] = useState(data)
    const router = useRouter()
    const cerrar = async () => {
        await axios.get(`${process.env.servidor}/logout`)
        Cookies.remove("token")
        router.push("/")
    }
    return (
        <Container>
            <Button onClick={cerrar}>Cerrar session</Button>
            <Heading fontSize='xl'>Lista de Gastos Comunes</Heading>
        </Container>
        
    )
}

export default gastos