
import axios from '../axios'

const handleLoginApi = async (username, password)=>{
    return await axios.post('/login', {username, password})
}

const getAllUsersApi = async (id)=>{
    return await axios.get(`/api/get-user?id=${id}`)
}

const handleAddNewUserApi = async (userData)=>{
    return await axios.post('/api/create-new-user', {...userData})
}

const handleDeleteUserApi = async (userId)=>{
    return await axios.delete(`/api/delete-user?id=${userId}`)
}

export {handleLoginApi, getAllUsersApi, handleAddNewUserApi, handleDeleteUserApi}