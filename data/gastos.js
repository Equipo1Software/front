import axios from 'axios';

const getGastos = async (id, email) => {
    const response = await axios.get(`${process.env.servidor}/gastos/${id}`, { headers: { cookie: email } });
    return response
}

const getGasto = async (id, email) =>{
    const response = await axios.get(`${process.env.servidor}/user/${id}`,{ headers: { cookie: email } })
    return response
}



module.exports = {
    getGastos,
    getGasto
}