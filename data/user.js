import axios from 'axios';

const login = async (email) => {
    const response = await axios.post(`${process.env.servidor}/login`, {
        email
    });
    return response
}

const logout = async () => {
    const response = await axios.get(`${process.env.servidor}/logout`);
    return response
}

const checkToken = async (token) => {
    const response = await axios.get(`${process.env.servidor}/checkToken`, { headers: { cookie: token } });
    return response
}
const getUsers = async () => {
    const response = await axios.get(`${process.env.servidor}/users`)
    return response
}

const getUser = async (id, email) =>{
    const response = await axios.get(`${process.env.servidor}/user/${id}`,{ headers: { cookie: email } })
    return response
}
const getAdmin = async() =>{
    const response = await axios.get(`${process.env.servidor}/admin`)
    return response
}


module.exports = {
    login,
    logout,
    checkToken,
    getUsers,
    getUser,
    getAdmin
}