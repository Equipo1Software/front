import {Select,Box,TextField,extendTheme,Mode,Container, Heading, Text, Flex, VStack,Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack,Card, CardHeader, CardBody, CardFooter, Td, useStyles} from '@chakra-ui/react'
import React, { useState, useEffect, Component, Fragment } from 'react'
import { useRouter } from "next/router"
import axios from "axios"
import DataTable, {createTheme} from 'react-data-table-component'
import "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartColumn, faCheck, faFileInvoiceDollar, faHomeUser, faPencil, faPencilAlt, faPenToSquare, faPlus, faPlusSquare, faTrash, faUser, faXmark, faXmarkCircle, faXmarkSquare } from '@fortawesome/free-solid-svg-icons'
import { ChakraProvider, Modal, ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure} from '@chakra-ui/react'
import { icon } from '@fortawesome/fontawesome-svg-core'




function user (){
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    const [users, setUsers]= useState( []);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [userSeleccionado, setUserSeleccionado]=useState({
        nombre:'',
        email:'',
        rol:'',
        })
    
    const showData = async () =>{
        const response = await fetch(`${process.env.servidor}/users`)
        const data = await response.json()
        console.log(data)
        setUsers(data)
        
    }
    
    useEffect( ()=>{
        showData()
    },[])
    
    
    const handleChange=  (e)=>{
                setUserSeleccionado(prevState=>({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        console.log(userSeleccionado);
        
    }


    const seleccionarUser=(usuario, caso)=>{
            setUserSeleccionado(usuario);
            console.log(usuario);
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
        await axios.delete(`${process.env.servidor}/user/delete/`+ userSeleccionado._id )
        .then(response=>{
                setUsers(users.filter(usuario=>usuario._id!==userSeleccionado._id));
                abrirCerrarModalEliminar();
                
                console.log(userSeleccionado);
        }).catch(error=>{
            
            console.log(error);
            })
    }
    const peticionPut=async()=>{
        await axios.put(`${process.env.servidor}/user/update/`+ userSeleccionado._id,userSeleccionado )
                .then(response=>{
                    var dataNueva= users;
                    dataNueva.map(usuario=>{
                    if(usuario._id===userSeleccionado._id){
                        usuario.nombre=userSeleccionado.nombre;
                        usuario.email=userSeleccionado.email;
                        usuario.rol=userSeleccionado.rol;

                    }
                    });
                    setUsers(dataNueva);
                    abrirCerrarModalEditar();
                    showData();
                    console.log(userSeleccionado);
                }).catch(error=>{
                    console.log(error);
                })
                }
        
        const bodyEditar=(
            
            <div>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>
                    <ModalCloseButton/>
                    Editar Usuario
                </ModalHeader>
                <ModalBody>
                    <Flex>
                        <FormControl>
                            <FormLabel >Nombre Vecino</FormLabel>
                            <Input  type={'string'} onChange={handleChange} name='nombre' _id='id' value={userSeleccionado&&userSeleccionado.nombre}/>
                            <FormLabel>Email</FormLabel>
                            <Input type={'string'} onChange={handleChange} name='email' _id='id' value={userSeleccionado&&userSeleccionado.email}/>
                            <FormLabel>Rol</FormLabel>
                            <Select placeholder={userSeleccionado.rol} name={'estado'} onChange={handleChange} bg={'#EAEAEA'}>
                                <option>vecino</option> 
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
        console.log(userSeleccionado),
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
                                            <FormLabel>Â¿Seguro que deseas eliminar este usuario? </FormLabel>
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
       
        {name: 'Vecino', selector: row => row.nombre[0].toUpperCase() + row.nombre.substring(1), sortable: true},
        {name: 'Email', selector: row => row.email},
        {name: 'Rol',selector: row => row.estado, sortable: true},
        {name: 'Accion',
        cell: row => {
                return (
                    <>
                    <Fragment>
                        <Button  onClick={()=>seleccionarUser(row,"Editar")} size={'xs'} width={'50px'} bg={'cyan.500'} color={'white'}
                            className="btn btn-outline btn-xs" 
                            >
                            <FontAwesomeIcon icon={faPenToSquare} title= 'Editar usuario' />
                        </Button> 
                        
                        <Text fontSize='xs' > {tab}  </Text>
                        <Button  onClick={()=>seleccionarUser(row,"Eliminar")} size={'xs'} width={'50px'} bg={'red.500'} color={'white'}
                            className="btn btn-outline btn-xs" 
                            >
                            <FontAwesomeIcon icon={faTrash} title= 'Eliminar usuario' />
                        </Button> 
                        
                        
                        
                    </Fragment>
                    </>);
            }
            
        }

    ]
    
    
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
                    
                    <Heading fontSize='2xl'>Hola Admin como te va</Heading>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Divider orientation='horizontal' my={'10px'} color={'#3C4048'}/>
                    <Flex>
                        
                        <Card boxSize={'xL'} bg={'#EAEAEA'} mx={'5'} height={'max-content'}  >
                            <CardHeader>
                                <Heading size='md'  textAlign={'center'} color={'yellow.500'} >Lista de usuarios</Heading>
                            </CardHeader>
                            
                            <CardBody>
                            
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
                            </CardBody>
                        </Card>
                    </Flex>
                </VStack>     
        </Container>
        
    )
}

export default user