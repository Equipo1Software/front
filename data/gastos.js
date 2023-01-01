import axios from 'axios';

const getGastosVecino = async (id, email) => {
    const response = await axios.get(`${process.env.servidor}/gastos/${id}`, { headers: { cookie: email } });
    return response
}

const getGastos = async () => {
    const response = await axios.get(`${process.env.servidor}/gastos`)
    return response
}

const newGasto = async (id,user) => {
    const response = await axios.post(`${process.env.servidor}/gasto/${id}`,user)
    return response
}




module.exports = {
    getGastosVecino,
    getGastos,
    newGasto
}