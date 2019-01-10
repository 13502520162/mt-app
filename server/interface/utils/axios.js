import axios from 'axios'
const instanse = axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:1000,
  headers:{

  }
})
export default instanse
