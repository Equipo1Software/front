import {Box,TextField,extendTheme,Mode,Container, Heading, Text, Flex, VStack,Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack,Card, CardHeader, CardBody, CardFooter, Td, useStyles} from '@chakra-ui/react'
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



function gastos (){
    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const { isOpen: isDeleteOpen , onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const { isOpen: isAddOpen , onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    const [users, setUsers]= useState( []);
    const router = useRouter()
    const showData = async () =>{
        const response = await fetch(`${process.env.servidor}/gastos`)
        const data = await response.json()
        console.log(data)
        setUsers(data)
        
    }
    
    useEffect( ()=>{
        showData()
    },[])
    {/*RECUERDA VER LOS VIDEOS DE MODAL CON CHAKRA MARTIN */}
    {/*NOIMPLEMENTADO */}
    
    const peticionDelete=async()=>{
        await axios.delete(`${process.env.servidor}/gasto`+vecino.id)
        .then(response=>{
            setData(data.filter(artista=>artista.id!==artistaSeleccionado.id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
        }
        const agregarGasto=async()=>{
          try {
            router.push("./newGasto")
          } catch (error) {
            console.log(error)
            return Swal.fire({
				      icon: "error",
				      title: "Oops...",
				      text: "Algo salio mal!"
			})
        }
            }
        const peticionPut=async()=>{
            await axios.put(baseUrl+"/"+artistaSeleccionado.id, artistaSeleccionado)
            .then(response=>{
                var dataNueva= data;
                dataNueva.map(artista=>{
                if(artista.id===artistaSeleccionado.id){
                    artista.artista=artistaSeleccionado.artista;
                    artista.genero=artistaSeleccionado.genero;
                    artista.ventas=artistaSeleccionado.ventas;
                    artista.pais=artistaSeleccionado.pais;
                }
                });
                setData(dataNueva);
                abrirCerrarModalEditar();
            }).catch(error=>{
                console.log(error);
            })
            }
    const tab = '\u00A0';
    const columns= [
        
        {name: 'Vecino', selector: row => row.vecino.nombre[0].toUpperCase() + row.vecino.nombre.substring(1), sortable: true},
        {name: 'Agua', selector: row => row.agua,},
        {name: 'Luz',selector: row => row.luz,},
        {name: 'Gas',selector: row => row.gas,},
        {name: 'Mantenimiento',selector: row => row.mantenimiento,grow: 1.2},
        {name: 'Personal',selector: row => row.sueldo,},
        {name: 'Emision',selector: row => row.fechaEmision.slice(0,10),sortable: true},
        {name: 'Vencimiento',selector: row => row.fechaLimite.slice(0,10),sortable: true,grow: 1.2},
        {name: 'Estado',selector: row => row.estado[0].toUpperCase() + row.estado.substring(1),sortable: true},
        {name: 'Total',selector: row => row.gas + row.mantenimiento + row.sueldo + row.agua + row.luz,sortable: true},
        {name: 'Accion',
        cell: row => {
                return (
                    <>
                    <Fragment>
                        <Button onClick={onEditOpen} size={'xs'} width={'50px'} bg={'cyan.500'} color={'black'}
                            className="btn btn-outline btn-xs" 
                            >
                            <FontAwesomeIcon icon={faPenToSquare} title= 'Editar gasto' />
                        </Button> 
                        <Modal size={'md'}  scrollBehavior={scrollBehavior} isOpen={isEditOpen} onClose={onEditClose}>
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
                                            <Input type={'number'}/>
                                            <FormLabel>Luz</FormLabel>
                                            <Input type={'number'}/>
                                            <FormLabel>Gas</FormLabel>
                                            <Input type={'number'}/>
                                            <FormLabel>Mantencion</FormLabel>
                                            <Input type={'number'} />
                                            <FormLabel>Personal</FormLabel>
                                            <Input type={'number'}/>
                                            <FormLabel>Fecha Emision</FormLabel>
                                            <Input type={'date'}/>
                                            <FormLabel>Fecha Limite</FormLabel>
                                            <Input type={'date'}/>
                                            <FormLabel>Estado</FormLabel>
                                            <Input type={'number'}/>
                                            <FormHelperText>
                                            </FormHelperText>
                                        </FormControl>
                                    </Flex>
                                    </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" width={'50px'} bg={'green.500'} ><FontAwesomeIcon icon={faCheck}/></Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Text fontSize='xs' > {tab}  </Text>
                        <Button size={'xs'} width={'50px'} bg={'red.600'} color={'black'}
                            className="btn btn-outline btn-xs" 
                            onClick={onDeleteOpen}>
                            <FontAwesomeIcon icon={faTrash} title= 'Eliminar gasto' />
                        </Button>
                        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>
                                    <ModalCloseButton/>
                                    Borrar
                                </ModalHeader>
                                <ModalBody>
                                    <Flex>
                                        <FormControl size={'xs'}>
                                            <FormLabel>Â¿Seguro que deseas eliminar este gasto?</FormLabel>
                                            <Button onClick={(event,row)=>{showData(row.gasto._id)}} type="delete" width={'50px'} bg={'green.500'} title={'Si'}><FontAwesomeIcon icon={faCheck}/></Button>
                                            <Button onClick={onDeleteClose} type="submit" width={'50px'} bg={'red.500'} title={'No'}><FontAwesomeIcon icon={faXmark}/></Button>
                                            <FormHelperText>
                                            </FormHelperText>
                                        </FormControl>
                                    </Flex>
                                </ModalBody>
                                <ModalFooter>
                                    
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        
                        
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
    {/* CREAR FUNCION PARA AGREGAR GASTO */}
    const agregar = async () => {
        await axios.get(`${process.env.servidor}/logout`)
        Cookies.remove("token")
        router.push("/")
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
    
        const MyComponent = () => (
        <DataTable
            title="Arnold Movies"
            columns={columns}
            theme="solarized"
        />
    );
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
                            <li ><Link color = {'#EAEAEA'} >Vecinos</Link></li>
                            <li ><Link color = {'#EAEAEA'} href='./gastos'>Gastos</Link></li>
                            <li><Link color = {'#EAEAEA'} >Configurar</Link></li>
                            <li><Link color = {'#EAEAEA'} >Perfil Admin</Link></li>
                        </ul>
                    </nav>
                </VStack>
                <VStack bg={"gray.200"} width={'full'} height={'container.lg'}>
                    
                    <Heading fontSize='2xl'>Hola Admin como te va</Heading>
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
