import axios from 'axios'

const Request = axios.create({
  baseURL: 'https://testing-api.ru-rating.ru/cars',
})

export default Request
