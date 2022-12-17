import { Heading,Flex, Input,Button,Tbody, Tr, Table,Thead, Td} from '@chakra-ui/react'
import {FormControl,FormLabel} from '@chakra-ui/react'
import Swal from "sweetalert2"
import { useState, useEffect} from 'react'
import { login, checkToken } from "../data/user"
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'

export const getServerSideProps = async(context) =>{
  try {
		const response = await checkToken(context.req.headers.cookie)
		if (response.status === 200) {
			return {
				redirect: {
					destination: "./user/home",
					permanent: false
				}
			}
		}
	} catch (error) {
		console.log(error)
		return {
			props: {}
		}
	}
}

const Home = ({data})=>{
  
  const [user,setUser] = useState({
    correo:""
  })
  const router = useRouter()
  const handleChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]:[e.target.value]
    })
  }
  
  const onSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await login(user.correo)
      if (response.status === 200) {
				Cookie.set("token", response.data.token, { expires: 1 })
				router.push("./user/home")
			}
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
    <Flex height={"100vh"} align={"center"} justify={"center"} direction={"column"}>
      <Flex direction={"column"} backgroundColor={"#BAD1C2"} p={12} width={"400px"} height={"460px"}>
        <Heading color={"#153462"} size="2xl" my={1}>Log In</Heading>
        <Heading size={"sm"} my={4} color={"#153462"}>Grupo 5 - Gastos Comunes</Heading> 
        <FormControl>
        <FormLabel>Email </FormLabel>
        <Input my={4} placeholder="correo" type={"email"} width={"308px"} onChange={handleChange} name={"correo"}/>
        </FormControl>
        <Button my={5} backgroundColor={"#153462"} color={"#F6F6C9"} type={"submit"} onClick={onSubmit}>Ingresar</Button>
      </Flex>
    </Flex>
  )

}

export default Home