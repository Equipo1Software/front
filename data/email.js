import axios from 'axios';

const email = async(datosCorreo)=>{
    
    const response = await axios.post(`${process.env.servidor}/mail`, datosCorreo);
    return response
}

module.exports = {
    email
}