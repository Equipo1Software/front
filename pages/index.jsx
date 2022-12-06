import { Heading,Flex, Input,Button} from '@chakra-ui/react'

export default function Home() {
  return (
    <Flex height={"100vh"} align={"center"} justify={"center"}>
      <Flex direction={"column"} backgroundColor={"#BAD1C2"} p={12} width={"400px"} height={"460px"}>
        <Heading color={"#153462"} size="2xl" my={1}>Log In</Heading>
        <Heading size={"sm"} my={4} color={"#153462"}>Grupo 5 - Gastos Comunes</Heading>
        <Input my={4} placeholder="Email" type={"text"} width={"308x"}/>
        <Input my={2} placeholder="*******" type={"password"} width={"308px"}/>
        <Button my={5} backgroundColor={"#153462"} color={"#F6F6C9"} >Ingresar</Button>
      </Flex>
    </Flex>
  )
}

