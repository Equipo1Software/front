import { Box, Text, Heading} from '@chakra-ui/react'
import  { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const Stats = () =>{

    const data = {
        labels: ['Gas','Luz','Agua','Espacios comunes','Seguridad'],
        datasets:[{
            label:'Consumo $',
            backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)'
                ],
            borderColor:[
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(75, 192, 192)',
                'rgb(255, 205, 86)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth:3,
            data: [25000,32400,18500,41900,37000]
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
            <Box textAlign='center' display='auto' >
                <Heading as='b' mb={4}>
                    Estidísticas usuario
                </Heading>
                <Text fontSize='x1'>
                    En esta sección usted encontrará el resumen de su cuenta con estadisticas y 
                    gráficos en base a su consumo
                </Text>
                <h2>Consumo histórico de gastos comunes</h2>
                <Bar data={data} options={opciones} />
            </Box>
        </div>
    );
}

export default Stats;