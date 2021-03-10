import axios from 'axios'

const http="http://localhost:8080/"
const CityMeteo = (data) =>{
  return axios.post(http+"meteo/city",data)
}
export  {

    CityMeteo,

};