import axios from "@/api/axios.js";

const getPositions = () => {
  return axios.get('/positions').then(response => response.data?.positions)
}

export default {
  getPositions
}