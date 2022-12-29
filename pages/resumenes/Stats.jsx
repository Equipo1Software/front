import { Container, Button, Heading, Text, Box, Stack, Flex, VStack, Avatar, AvatarBadge, AvatarGroup, Divider, Link, HStack, Card, CardHeader, CardBody, CardFooter, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from "next/router"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';





const Stats = () => {

    const data = {
        labels: ['Gas', 'Luz', 'Agua', 'Espacios comunes', 'Seguridad'],
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

        <div className='Stats'>
            <Navbar />
            <div className='flex'>
                <div className="content">
                    <Container margin={'0'} p={'0'} maxW={'full'} display={'flex'}>
                        <Sidebar />
                        <VStack bg={"gray.200"} width={'full'} height={'container.lg'}>
                            <Button bg={'#111B54'} color={'#ffffff'}>Cerrar session</Button>
                            <Heading fontSize='2xl'>Hola Admin como te va</Heading>
                            <Divider orientation='horizontal' my={'10px'} color={'#3C4048'} />
                            <Divider orientation='horizontal' my={'10px'} color={'#3C4048'} />
                            <Heading fontSize='xl' textAlign={'center'} py={'10'} color={'#3C4048'} >Resumen consumo</Heading>
                            <Flex>

                            </Flex>
                            <Card textAlign='center' display={'flex'}  >
                                <Heading as='b' mb={4}>
                                    Estadísticas usuario
                                </Heading>
                                <Text fontSize='x1'>
                                    En esta sección usted encontrará el resumen de su cuenta con estadisticas y
                                    gráficos en base a su consumo
                                </Text>
                                <h2> <b>Consumo histórico de gastos comunes</b> </h2>
                                <Bar data={data} options={opciones} />
                            </Card>


                        </VStack>

                    </Container>


                    {/* GRAFICO DE CONSUMO -> FALTA RELLENAR CON LOS DATOS */}

                </div>
            </div>

        </div>


    );
}

export default Stats;