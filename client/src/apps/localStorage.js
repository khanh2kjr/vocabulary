import { AppConstant } from '@/constants'

export default {
  setToken(accessToken) {
    if (accessToken) {
      localStorage.setItem(AppConstant.ACCESS_TOKEN, JSON.stringify(accessToken))
    }
  },
  getToken() {
    return JSON.parse(localStorage.getItem(AppConstant.ACCESS_TOKEN))
  },
  clearToken() {
    localStorage.removeItem(AppConstant.ACCESS_TOKEN)
  },
}
