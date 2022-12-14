import {Select,Box,TextField,extendTheme,Mode,Container, Heading, Text, Flex, VStack,Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack,Card, CardHeader, CardBody, CardFooter, Td, useStyles} from '@chakra-ui/react'
import React, { useState, useEffect, Component, Fragment } from 'react'
import { useRouter } from "next/router"
import Cookies from 'js-cookie'
import axios from "axios"
import DataTable, {createTheme} from 'react-data-table-component'
import "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn, faCheck, faFileInvoiceDollar, faHomeUser, faPencil, faPencilAlt, faPenToSquare, faPlus, faPlusSquare, faTrash, faUser, faXmark, faXmarkCircle, faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import { ChakraProvider, Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure} from '@chakra-ui/react'
import { icon } from '@fortawesome/fontawesome-svg-core'
import {getAdmin, getUsers} from "../../../data/user"


export async function getServerSideProps(context) {
    
    try {
        const response2 = await getAdmin()
        
        return {
            props: {
                
                data2: response2.data,
            }
        }
    } catch (err) {
        console.log(err)
        return {
			props: {}
		}
    }
}

function gastos ({data2}){
    const id_admin = data2[0]._id
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    const [users, setUsers]= useState( []);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const router = useRouter()
    const [GastoSeleccionado, setGastoSeleccionado]=useState({
        _id:'',
        agua:'',
        luz:'',
        gas:'',
        mantenimiento:'',
        sueldo:'',
        fechaEmision:new Date,
        fechaLimite:new Date,
        estado:'',
        
        })
    
    const showData = async () =>{
        const response = await fetch(`${process.env.servidor}/gastos`)
        const data = await response.json()
        console.log(data)
        setUsers(data)
        
    }
    
    useEffect( ()=>{
        showData()
    },[])
    
    
    const handleChange=  (e)=>{
                setGastoSeleccionado(prevState=>({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        console.log(GastoSeleccionado);
        
    }
        const agregarGasto=async()=>{
        try {
            router.push("./newGasto")
        } catch (error) {
            console.log(error)
            
        }
            }

    const seleccionarGasto=(gasto, caso)=>{
            setGastoSeleccionado(gasto);
            console.log(gasto);
                if(caso==="Eliminar"){
                    abrirCerrarModalEliminar();
                }if(caso==="Editar"){
                    
                    abrirCerrarModalEditar();
                }
            }
    
        const abrirCerrarModalEliminar=()=>{
            setModalEliminar(!modalEliminar);
            }
        const abrirCerrarModalEditar=()=>{
            setModalEditar(!modalEditar);
            }
    const peticionDelete=async()=>{
        await axios.delete(`${process.env.servidor}/gasto/delete/`+ GastoSeleccionado._id +"/"+ id_admin )
        .then(response=>{
                setUsers(users.filter(gasto=>gasto._id!==GastoSeleccionado._id));
                abrirCerrarModalEliminar();
                
                console.log(GastoSeleccionado);
        }).catch(error=>{
            
            console.log(error);
            })
    }
    const peticionPut=async()=>{
        await axios.put(`${process.env.servidor}/gasto/update/`+ GastoSeleccionado._id + "/"+ id_admin,GastoSeleccionado)
                .then(response=>{
                    var dataNueva= users;
                    dataNueva.map(gasto=>{
                    if(gasto._id===GastoSeleccionado._id){
                        gasto.agua=GastoSeleccionado.agua;
                        gasto.luz=GastoSeleccionado.luz;
                        gasto.gas=GastoSeleccionado.gas;
                        gasto.mantenimiento=GastoSeleccionado.mantenimiento;
                        gasto.sueldo=GastoSeleccionado.sueldo;
                        gasto.fechaLimite=GastoSeleccionado.fechaLimite;
                        gasto.estado=GastoSeleccionado.estado;
                        
                    }
                    });
                    setUsers(dataNueva);
                    abrirCerrarModalEditar();
                    showData();
                    console.log(GastoSeleccionado);
                    console.log(id_admin);
                }).catch(error=>{
                    console.log(error);
                })
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
        const bodyEditar=(
            
            <div>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <ModalCloseButton/>
                    Editar gasto
                </ModalHeader>
                <ModalBody>
                    <Flex>
                        <FormControl>
                            <FormLabel >Agua</FormLabel>
                            <Input  type={'number'} onChange={handleChange} name='agua' _id='id' value={GastoSeleccionado&&GastoSeleccionado.agua}/>
                            <FormLabel>Luz</FormLabel>
                            <Input type={'number'} onChange={handleChange} name='luz' _id='id' value={GastoSeleccionado&&GastoSeleccionado.luz}/>
                            <FormLabel>Gas</FormLabel>
                            <Input type={'number'} onChange={handleChange}  name='gas' _id='id' value={GastoSeleccionado&&GastoSeleccionado.gas}/>
                            <FormLabel>Mantencion</FormLabel>
                            <Input type={'number'} onChange={handleChange} name='mantenimiento'  _id='id' value={GastoSeleccionado&&GastoSeleccionado.mantenimiento}/>
                            <FormLabel>Personal</FormLabel>
                            <Input type={'number'} onChange={handleChange} name='sueldo' _id='id'  value={GastoSeleccionado&&GastoSeleccionado.sueldo}/>
                            <FormLabel>Fecha Emision <Text>{`${cambiarFormatoFecha(GastoSeleccionado.fechaEmision)}`}</Text></FormLabel>
                            
                            <FormLabel>Fecha Limite <Text>Actual: {`${cambiarFormatoFecha(GastoSeleccionado.fechaLimite)}`}</Text></FormLabel>
                            <Input type={'date'} onChange={handleChange} name='fechaLimite'  _id='id' value={GastoSeleccionado&&GastoSeleccionado.fechaLimite}/>
                            <FormLabel>Estado</FormLabel>
                            <Select placeholder={GastoSeleccionado.estado} name={'estado'} onChange={handleChange} bg={'#EAEAEA'}>
                                <option>por pagar</option>
                                <option>pagado</option>
                                <option>vencido</option>
                            </Select>
                            <FormHelperText>
                            </FormHelperText>
                        </FormControl>
                    </Flex>
                    </ModalBody>
                <ModalFooter>
                    <Button  onClick={()=>peticionPut()} width={'50px'} bg={'green.500'} ><FontAwesomeIcon icon={faCheck}/></Button>
                </ModalFooter>
            </ModalContent>
            </div>
        )
    const tab = '\u00A0';
    const bodyEliminar=(
        console.log(GastoSeleccionado),
        <div>
            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>
                                    <ModalCloseButton/>
                                    Borrar
                                </ModalHeader>
                                <ModalBody>
                                    <Flex>
                                        <FormControl size={'xs'}>
                                            <FormLabel>??Seguro que deseas eliminar este gasto? </FormLabel>
                                            <Button onClick={()=>peticionDelete()} type="delete" width={'50px'} bg={'green.500'} title={'Si'}><FontAwesomeIcon icon={faCheck}/></Button>
                                            <Button onClick={()=>abrirCerrarModalEliminar()} type="submit" width={'50px'} bg={'red.500'} title={'No'}><FontAwesomeIcon icon={faXmark}/></Button>
                                            <FormHelperText>
                                            </FormHelperText>
                                        </FormControl>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    
                                </ModalFooter>
                            </ModalContent>
    </div>)
    const columns= [
       
        {name: 'Vecino', selector: row => row.vecino.nombre[0].toUpperCase() + row.vecino.nombre.substring(1), sortable: true},
        {name: 'Agua', selector: row => row.agua,},
        {name: 'Luz',selector: row => row.luz,},
        {name: 'Gas',selector: row => row.gas,},
        {name: 'Mantenimiento',selector: row => row.mantenimiento,grow: 1.2},
        {name: 'Personal',selector: row => row.sueldo,},
        {name: 'Emision', selector: row => `${cambiarFormatoFecha(row.fechaEmision)}`,sortable: true},
        {name: 'Vencimiento',selector: row => `${cambiarFormatoFecha(row.fechaLimite)}`,sortable: true,grow: 1.2},
        {name: 'Estado',selector: row => row.estado[0].toUpperCase() + row.estado.substring(1),sortable: true},
        {name: 'Total',selector: row => row.gas + row.mantenimiento + row.sueldo + row.agua + row.luz,sortable: true},
        {name: 'Accion',
        cell: row => {
                return (
                    <>
                    <Fragment>
                        <Button  onClick={()=>seleccionarGasto(row,"Editar")} size={'xs'} width={'50px'} bg={'cyan.500'} color={'white'}
                            className="btn btn-outline btn-xs" 
                            >
                            <FontAwesomeIcon icon={faPenToSquare} title= 'Editar gasto' />
                        </Button> 
                        
                        <Text fontSize='xs' > {tab}  </Text>
                        <Button  onClick={()=>seleccionarGasto(row,"Eliminar")} size={'xs'} width={'50px'} bg={'red.500'} color={'white'}
                            className="btn btn-outline btn-xs" 
                            >
                            <FontAwesomeIcon icon={faTrash} title= 'Eliminar gasto' />
                        </Button> 
                        
                        
                        
                    </Fragment>
                    </>);
            }
            
        }

    ]
    const totalPagado = () => {
        let cont=0;
        users.forEach(gasto => {
            if(gasto.estado==='pagado') cont=cont+gasto.luz+gasto.gas+gasto.agua+gasto.mantenimiento+gasto.sueldo
        });
        return cont
    }
    const totalPorPagar = () => {
        let cont=0;
        users.forEach(gasto => {
            if(gasto.estado==='por pagar') cont=cont+gasto.luz+gasto.gas+gasto.agua+gasto.mantenimiento+gasto.sueldo
        });
        return cont
    }
    const totalVencido = () => {
        let cont=0;
        users.forEach(gasto => {
            if(gasto.estado==='vencido') cont=cont+gasto.luz+gasto.gas+gasto.agua+gasto.mantenimiento+gasto.sueldo
        });
        return cont
    }
    
    createTheme('custom', {
        text: {
            primary: '#EAEAEA',
            secondary: '#2aa198',
        },
        background: {
            default: '#002b36',
        },
        context: {
            background: 'yellow',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
        }, 'dark');
    
       
const paginacionOpciones={
    rowsPerPageText: 'Filas por pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
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
                            <li><Link color = {'#EAEAEA'} href='../home/home'>Home</Link></li>
                            <li ><Link color = {'#EAEAEA'}  href='../vecinos/vecinos'>Vecinos</Link></li>
                            <li ><Link color = {'#EAEAEA'} href='../gastos/gastos'>Gastos</Link></li>
                            <li><Link color = {'#EAEAEA'} >Configurar</Link></li>
                            <li><Link color = {'#EAEAEA'} >Perfil Admin</Link></li>
                        </ul>
                    </nav>
                </VStack>
                <VStack bg={"gray.200"} width={'full'} height={'container.lg'}>
                <Button onClick={()=>{router.push("../home/home")}}>Volver a Home</Button>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Flex>
                        
                        <Card boxSize={'xL'} bg={'#EAEAEA'} mx={'5'} height={'max-content'}  >
                            <CardHeader>
                                <Heading size='md'  textAlign={'center'} color={'yellow.500'} >Registro de gastos</Heading>
                            </CardHeader>
                            
                            <CardBody>
                            <Button   size={'lg'} bg={'green.500'} color={'black'}
                                className="btn btn-outline btn-xs" 
                                onClick={agregarGasto} >
                                <FontAwesomeIcon icon={faPlus} title= 'Agregar'/>
                                <Text>Agregar</Text>
                            </Button> 
                                <DataTable  
                                    columns={columns}  
                                    data={users} 
                                    theme='custom'  
                                    pagination 
                                    paginationComponentOptions={paginacionOpciones} 
                                    fixedHeader fixedHeaderScrollHeight='600px'
                                />
                                <Modal
                                isOpen={modalEliminar}
                                onClose={abrirCerrarModalEliminar}>
                                {bodyEliminar}
                                </Modal>
                                <Modal
                                isOpen={modalEditar}
                                onClose={abrirCerrarModalEditar}>
                                {bodyEditar}
                                </Modal>
                                    <Heading bg={'cyan.500'} size='md'  textAlign={'center'} color={'black.500'} >Total: ${totalPagado()+totalPorPagar()+totalVencido()}</Heading>
                                    
                                    <Heading textAlign={'right'} color = {'#268bd2'} fontSize='2x1'>Pagados: ${totalPagado()}</Heading>
                                    <Heading textAlign={'right'} color = {'#268bd2'} fontSize='2x1'>Por Pagar: ${totalPorPagar()} </Heading>
                                    <Heading textAlign={'right'} color = {'#268bd2'} fontSize='2x1'>Vencidos: ${totalVencido()} </Heading>
                            </CardBody>
                        </Card>
                    </Flex>
                </VStack>     
        </Container>
        
    )
}

export default gastos