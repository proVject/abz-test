import axios from "axios";

const getToken = () => {
  return axios.get('/token')?.then(response => response.data.token)
}

const addUser = async (user) => {
  const token = await getToken()
  return axios.post('/users', user, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Token: token
    }
  }).then(response => response.data)
}

const getUsers = ({ pageParam }) => {
  return axios.get(`/users?page=${pageParam.page}&count=${pageParam.count}`).then(response => response.data)
}

export default {
  getUsers,
  addUser
}