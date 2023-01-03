import {Container,Button, Heading, Text,Select, Flex, VStack,Avatar, AvatarBadge, Divider, Link, HStack,Card, CardHeader, CardBody, CardFooter, FormControl, FormLabel, Input} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import {getAdmin, getUsers} from "../../../data/user"
import {newGasto,getGastos} from "../../../data/gastos"
import {email} from "../../../data/email"
import Swal from "sweetalert2"

export async function getServerSideProps(context) {
    
    try {
        const response = await getUsers()
        const response2 = await getAdmin()
        
        return {
            props: {
                
                data2: response2.data,
                data: response.data
            }
        }
    } catch (err) {
        console.log(err)
        return {
			props: {}
		}
    }
}



const agregarGasto = ({data,data2})=>{
    const router = useRouter()
    const [users] = useState(data)
    const id_admin = data2[0]._id
    
    const [values,setvalues] = useState({
        agua:'',
        luz:'',
        gas:'',
        mantenimiento:'',
        sueldo:'',
        fechaEmision:'',
        fechaLimite:'',
        estado:'',
        vecino:''
    })

    const datosCorreo={
        correos:[''],
        asunto:'',
        texto:''
    }

    const getIdUser = (name)=>{
        users.forEach(user => {
            if(user.nombre===name){
                values.vecino=user._id
            }
        });
    }
    const cambiarFormatoFecha = (fecha)=>{
        let nuevaFechaE = new Date(fecha)
        let day = nuevaFechaE.getDate()+1
        if(day<10) {day = '0'+day} 
        let mes = nuevaFechaE.getMonth()+1
        if(mes<10) {mes = '0'+mes} 
        let year = nuevaFechaE.getFullYear()
        return day+'/'+mes+'/'+year
    }
    const getEmailUser = (id)=>{  
        users.forEach(user => {
            if(user._id===id){
                datosCorreo.correos=[user.email]
                datosCorreo.asunto='Emision de Boleta'
                datosCorreo.texto=`Estimad@ ${user.nombre} se le informa la emision de su boleta con fecha limite de pago : ${cambiarFormatoFecha(values.fechaLimite)}`
                console.log(datosCorreo)
            }
        });
    }
    
    const validarFecha = (fechaE, fechaL)=>{

        let nuevaFechaE = new Date(fechaE) //fecha Emision
        let dayE = nuevaFechaE.getDate()
        let mesE = nuevaFechaE.getMonth()+1
        let yearE = nuevaFechaE.getFullYear()

        let nuevaFechaL = new Date(fechaL) //fecha Limite
        let dayL = nuevaFechaL.getDate()
        let mesL = nuevaFechaL.getMonth()+1
        let yearL = nuevaFechaL.getFullYear()

        
        if(mesE != mesL){
            return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Las fechas deben estar dentro del mismo mes"
			})
        }
        if(dayL <= dayE){
            return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "La fecha limite debe ser superior a la fecha de emision"
			})
        }
        
    }

    const onSubmit = async(e)=>{
        e.preventDefault()
        getIdUser(values.vecino)
        getEmailUser(values.vecino)
        //validarFecha(values.fechaEmision,values.fechaLimite)
        
        const response = await newGasto(id_admin,values)
        console.log(response)
        if (response.status === 201) {   
            const response2 = await email(datosCorreo)
            console.log(response2)
            return Swal.fire({
				icon: "success",
				title: "success",
				text: "Se agrego el gasto exitosamente"
			})
        }
        else{
            return Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Algo salio mal!"
			})
        }
      
    }
    const onChange = (e)=>{
        setvalues({
            ...values,
            [e.target.name]:e.target.value
        })      
    }
    const showUser = ()=>{
        return users.map(user => {
            return (
                <option key={user._id} name={'vecino'} onChange={onChange}>{user.nombre}</option>
            )
        })
    }
    const volver = ()=>{
        router.push("./gastos")
    }

  return (
    <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'} >
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
                            <li><Link color = {'#EAEAEA'} href='../home/home'>Home</Link></li>
                            <li ><Link color = {'#EAEAEA'} >Vecinos</Link></li>
                            <li ><Link color = {'#EAEAEA'} href='./gastos'>Gastos</Link></li>
                            <li><Link color = {'#EAEAEA'} >Configurar</Link></li>
                            <li><Link color = {'#EAEAEA'} >Perfil Admin</Link></li>
                        </ul>
                    </nav>
                </VStack>
                <VStack bg={"gray.300"} width={'full'} height={'container.lg'}>
                    <Button onClick={volver}>Volver</Button>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Heading fontSize='xl' textAlign={'center'} py={'1.5'} color={'#3C4048'} >Agregar Gasto Comun</Heading> 
                    <VStack bg={'teal.300'} width={'400px'} py={'15px'}>
                        <FormControl py={'15px'} px={'20px'}>
                            <FormLabel >Agua</FormLabel>
                            <Input type={'number'} bg={'#EAEAEA'} name={'agua'} onChange={onChange}></Input>
                            <FormLabel >Luz</FormLabel>
                            <Input type={'number'} bg={'#EAEAEA'} name={'luz'} onChange={onChange}></Input>
                            <FormLabel>Gas</FormLabel>
                            <Input type={'number'} bg={'#EAEAEA'} name={'gas'} onChange={onChange}></Input>
                            <FormLabel>Mantencion</FormLabel>
                            <Input type={'number'} bg={'#EAEAEA'} name={'mantenimiento'} onChange={onChange}></Input>
                            <FormLabel >Sueldo Personal</FormLabel>
                            <Input type={'number'} bg={'#EAEAEA'} name={'sueldo'} onChange={onChange}></Input>
                            <FormLabel>Fecha Emision</FormLabel>
                            <Input type={'date'} bg={'#EAEAEA'} name={'fechaEmision'} onChange={onChange}></Input>
                            <FormLabel>Fecha Limite</FormLabel>
                            <Input type={'date'} bg={'#EAEAEA'} name={'fechaLimite'} onChange={onChange}></Input>
                            <FormLabel>Estado</FormLabel>
                            <Select placeholder='Seleccione el estado' name={'estado'} onChange={onChange} bg={'#EAEAEA'}>
                                <option>por pagar</option>
                                <option>pagado</option>
                                <option>vencido</option>
                            </Select>
                            <FormLabel>Vecino</FormLabel>
                            <Select placeholder='Eliga al vecino' name={'vecino'} onChange={onChange} bg={'#EAEAEA'}>
                            {showUser()}
                            </Select>
                        </FormControl>
                        <Button type={'submit'} onClick={onSubmit}>Agregar Gasto</Button>
                    </VStack>
                    
                </VStack>     
        </Container>
  )
}
export default agregarGasto