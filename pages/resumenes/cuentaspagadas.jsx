import React from 'react'
import { useState } from 'react'
import Swal from "sweetalert2"
import {
    Container, Button, Heading, Text, Flex, VStack, Avatar, AvatarBadge, Divider, Link, HStack, Table,
    Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, TableCaption
} from '@chakra-ui/react'
import { getGastos } from "../../data/gastos"
import { useRouter } from "next/router"
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

export async function getServerSideProps(context) {
    try {
        const response = await getGastos()
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



const cuentasPagadas = ({ data }) => {
    const router = useRouter()
    const [gastos] = useState(data)
    console.log(gastos)

    const showGastos = () => {
        return gastos.map(gasto => {
            // fecha emision
            let nuevafechaEmision = new Date(gasto.fechaEmision)
            let dayE = nuevafechaEmision.getDate()
            let mesE = nuevafechaEmision.getMonth()
            let yearE = nuevafechaEmision.getFullYear()
            let fechaEmision = '' + dayE + '/' + mesE + '/' + yearE
            // fecha limite
            let nuevafechaLimite = new Date(gasto.fechaLimite)
            let day = nuevafechaLimite.getDate()
            let mes = nuevafechaLimite.getMonth()
            let year = nuevafechaLimite.getFullYear()
            let fechaLimite = '' + day + '/' + mes + '/' + year

            if (gasto.estado === "por pagar" && "vencido") {
                return (
                    <Tr key={gasto._id} >
                        <Td>{fechaEmision}</Td>
                        <Td>{fechaLimite}</Td>
                        <Td>{gasto.agua}</Td>
                        <Td>{gasto.luz}</Td>
                        <Td>{gasto.gas}</Td>
                        <Td>{gasto.mantenimiento}</Td>
                        <Td>{gasto.sueldo}</Td>
                        <Td>
                            <Button colorScheme='teal' title='Pagar'  >
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Button>
                        </Td>

                    </Tr>
                )
            }
        })
    }

    const volver = () => {
        try {
            router.push("./home")
        } catch (error) {
            console.log(error)
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal!"
            })
        }
    }

    const grafico = {
        labels: ['Gas', 'Luz', 'Agua', 'Mantenimiento', 'Personal'],
        datasets: [{
            label: 'Consumo $',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 3,
            data: [25000, 32400, 18500, 41900, 37000]
        }]
    };
    const opciones = {
        maintainAspectRadio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'}>
            <VStack width={'60'} bg={'#3C4048'} >
                <Divider orientation='horizontal' my={'2'} />
                <Avatar size={'xl'}>
                    <AvatarBadge boxSize='1.25em' bg='green.500' />
                </Avatar>
                <Heading size={'md'} color={'#EAEAEA'}>Usuario</Heading>

                <Divider orientation='horizontal' my={'6'} />
                <Divider orientation='horizontal' my={'6'} />
                <nav>
                    <ul type='disc'>
                        <li><Link color={'#EAEAEA'} href='./home'>Home</Link></li>
                        <li ><Link color={'#EAEAEA'} >Vecinos</Link></li>
                        <li ><Link color={'#EAEAEA'} >Gastos</Link></li>
                        <li><Link color={'#EAEAEA'} >Configurar</Link></li>
                        <li><Link color={'#EAEAEA'} >Perfil </Link></li>
                    </ul>
                </nav>
            </VStack>
            <VStack bg={"gray.300"} width={'full'} height={'container.lg'}>
                <Button onClick={volver}>volver</Button>
                <Heading fontSize='2xl'>Deudas por pagar y vencidas </Heading>
                <Divider orientation='horizontal' my={'10px'} color={'#3C4048'} />
                <Divider orientation='horizontal' my={'10px'} color={'#3C4048'} />
                <Flex direction={"column"}>
                    <TableContainer>
                        <Table variant='simple' size={'md'}>
                            <Thead>
                                <Tr bg={'teal'} >
                                    <Th color={'#EAEAEA'}>Fecha Emision</Th>
                                    <Th color={'#EAEAEA'}>Fecha Limite</Th>
                                    <Th color={'#EAEAEA'}>Agua</Th>
                                    <Th color={'#EAEAEA'}>Luz</Th>
                                    <Th color={'#EAEAEA'} isNumeric>Gas</Th>
                                    <Th color={'#EAEAEA'} >Mantenimiento</Th>
                                    <Th color={'#EAEAEA'} >Sueldo del Personal</Th>
                                    <Th color={'#EAEAEA'} >Acción</Th>
                                </Tr>
                            </Thead>
                            <Tbody color={'#3C4048'} bg={'#EAEAEA'} >
                                {showGastos()}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    <Bar data={grafico} options={opciones} />
                </Flex>

                

            </VStack>
        </Container>
    )
}

export default cuentasPagadas
