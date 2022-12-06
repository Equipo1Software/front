import { useState } from 'react'
import { Heading,Flex, Input,Button} from '@chakra-ui/react'


export default function Home() {
  return (
    <Flex height={"100vh"} align={"center"} justify={"center"}>
      <Flex direction={"column"} backgroundColor={"#BAD1C2"} p={12}>
        <Heading color={"#153462"} size="2xl">Log In</Heading>
        <Heading size={"sm"} my={4} color={"#153462"}>Grupo 5 - Gastos Comunes</Heading>
        <Input my={3} placeholder="Email" type={"text"}/>
        <Input my={2} placeholder="*******" type={"password"}/>
        <Button my={4} backgroundColor={"#153462"} color={"#F6F6C9"} >Ingresar</Button>
      </Flex>
    </Flex>
  )
}

