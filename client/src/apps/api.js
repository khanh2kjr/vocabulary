import { ApiConstant } from '@/constants'
import axios from 'axios'
import LocalStorage from './localStorage'

class Http {
  constructor(axios, getCredential) {
    this.axios = axios
    this.getCredential = getCredential
  }
  request(config) {
    config = this.getCredential(config)
    return this.axios.request(config)
  }
  get(url, config) {
    config = this.getCredential(config)
    return this.axios.get(url, config)
  }
  post(url, data, config) {
    config = this.getCredential(config)
    return this.axios.post(url, data, config)
  }
  put(url, data, config) {
    config = this.getCredential(config)
    return this.axios.put(url, data, config)
  }
  patch(url, data, config) {
    config = this.getCredential(config)
    return this.axios.patch(url, data, config)
  }
  delete(url, config) {
    config = this.getCredential(config)
    return this.axios.delete(url, config)
  }
}

const defaultConfig = headers => ({
  baseURL: ApiConstant.BASE_URL,
  headers: { ...headers },
  timeout: ApiConstant.TIMEOUT,
})

const getCredentialWithAccessToken = config => {
  let accessToken = LocalStorage.getToken() || ''
  if (!accessToken) return config
  return {
    ...config,
    headers: {
      ...(config?.headers || {}),
      Authorization: 'Bearer ' + accessToken,
    },
  }
}

const configInterceptors = axiosClient => {
  axiosClient.interceptors.response.use(
    res => res.data,
    res => Promise.reject(res.response.data)
  )
  return axiosClient
}

const axiosClient = configInterceptors(axios.create(defaultConfig(ApiConstant.HEADER_DEFAULT)))

const ApiClientWithToken = new Http(axiosClient, getCredentialWithAccessToken)

const loginConfigInterceptors = axiosClient => {
  axiosClient.interceptors.response.use(
    res => res.data,
    res => Promise.reject(res.response.data)
  )
  return axiosClient
}

export const LoginClient = loginConfigInterceptors(axios.create(defaultConfig(ApiConstant.HEADER_DEFAULT)))

export default ApiClientWithToken
