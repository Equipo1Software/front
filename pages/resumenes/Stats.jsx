import { Box, Text, Heading} from '@chakra-ui/react'
import  { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



const Stats = () =>{

    const data = {
        labels: ['Gas','Luz','Agua','Espacios comunes','Seguridad'],
        datasets:[{
            label:'Consumo',
            backgroundColor:'rgba(0,255,0,1)',
            borderColor:'black',
            borderWidth:1,
            hoverBackgroundColor:'#0070f3',
            hoverBorderColor:'black',
            data: [25000,32400,18500,41900,37000]
        }]
      };
      const opciones = {
        maintainAspectRadio: false,
        responsive: true
      }





    return (
        <div className='Stats'>
            <Box textAlign='center' width='100%' height='500px' >
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