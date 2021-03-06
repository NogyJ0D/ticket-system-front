import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://nogyj0d-tickets.onrender.com'
})

export const get = url => {
  return instance.get(url, { withCredentials: true })
    .then(res => { return res.data })
    .catch(err => { return err.response.data })
}

export const post = (url, data) => {
  return instance.post(url, data, { withCredentials: true })
    .then(res => { return res.data })
    .catch(err => { return err.response.data })
}

export const put = (url, data) => {
  return instance.put(url, data, { withCredentials: true })
    .then(res => { return res.data })
    .catch(err => { return err.response.data })
}
