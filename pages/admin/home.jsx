import {Container,Button, Heading, Box, Stack, Flex, VStack,Avatar, AvatarBadge, AvatarGroup, Divider, Link} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import { getUsers } from "../../data/user"
import Cookies from 'js-cookie'
import axios from "axios"

export async function getServerSideProps(context) {
    try {
        const response = await getUsers()
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
    const [user] = useState(data)
    const cerrar = async () => {
        await axios.get(`${process.env.servidor}/logout`)
        Cookies.remove("token")
        router.push("/")
    }

    console.log(user)
    return (
        <Container margin={'0'} p={'0'} maxHeight={'container.lg'} maxW={'full'} display={'flex'}>
                <VStack width={'60'} bg={'#3C4048'} >
                    <Divider orientation='horizontal' my={'2'}/>
                        <Avatar size={'xl'}>
                            <AvatarBadge boxSize='1.25em' bg='green.500' />
                        </Avatar>
                        <Heading size={'md'} color ={'#EAEAEA'}>Administrador</Heading>
                    
                    <Divider orientation='horizontal' my={'6'}/>
                    <Divider orientation='horizontal' my={'6'}/>
                    <nav>
                        <ul type='disc' margin='50px'>
                            <li><Link color ={'#EAEAEA'} >Home</Link></li>
                            <li ><Link color ={'#EAEAEA'} >Vecinos</Link></li>
                            <li><Link color ={'#EAEAEA'} >Configurar</Link></li>
                            <li><Link color ={'#EAEAEA'} >Perfil Admin</Link></li>
                        </ul>
                    </nav>
                </VStack>
                <VStack bg={"gray.100"} width={'full'} height={'container.lg'}>
                    <Button onClick={cerrar}>Cerrar session</Button>
                    <Heading fontSize='xl'>Hola Admin como te va</Heading>
                </VStack>
                
                
            
        </Container>
        
    )
}

export default gastos