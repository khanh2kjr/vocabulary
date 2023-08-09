import { LoginClient } from '@/apps/api'
import ApiClientWithToken from '@/apps/api'

export default {
  registerUser(requestBody) {
    return LoginClient.post('/auth/register', requestBody)
  },
  loginUser(requestBody) {
    return LoginClient.post('/auth/login', requestBody)
  },
  getSelfInfo() {
    return ApiClientWithToken.get('/auth')
  },
}
